package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strconv"

	"github.com/confluentinc/confluent-kafka-go/v2/kafka"
)

// Stock represents a stock entity
type Stock struct {
	Ticker   string `json:"ticker"`
	Name     string `json:"name"`
	Type     string `json:"type"`
	Currency string `json:"currency_name"`
	Date     string `json:"last_updated_utc"`
}

// StockResponse represents the JSON response structure
type StockResponse struct {
	Results []Stock `json:"results"`
}

func main() {
	// Make an HTTP GET request to the Polygon API
	stockResponse, err := http.Get("https://api.polygon.io/v3/reference/tickers?active=true&apiKey=QPFs6luFf15cS9kaDOcGp9GwhzGh0482")
	if err != nil {
		log.Fatal(err)
	}
	defer stockResponse.Body.Close()

	// Read the response body
	body, err := io.ReadAll(stockResponse.Body)
	if err != nil {
		log.Fatal(err)
	}

	// Unmarshal JSON into struct
	var stockData StockResponse
	err = json.Unmarshal(body, &stockData)
	if err != nil {
		log.Fatal(err)
	}

	var parsedStocks []Stock
	for _, stock := range stockData.Results {
		stockAdd := Stock{
			Ticker:   stock.Ticker,
			Name:     stock.Name,
			Type:     stock.Type,
			Currency: stock.Currency,
			Date:     stock.Date,
		}
		parsedStocks = append(parsedStocks, stockAdd)
	}

	p, err := kafka.NewProducer(&kafka.ConfigMap{
		"bootstrap.servers": "pkc-921jm.us-east-2.aws.confluent.cloud:9092",
		"security.protocol": "SASL_SSL",
		"sasl.mechanisms":   "PLAIN",
		"sasl.username":     "N5Z7Y6TAOZSDS4HZ",
		"sasl.password":     "4u1M5DvvpnsBxryH9OI5zKa7kTrkDvKojIjvtjl/1WaB+6OYwgX/XehLzW9v1ZeV",
		// Add other configuration properties as needed
	})

	if err != nil {
		panic(err)
	}

	defer p.Close()

	//Topic to produce messages to
	topic := "stock_tokens"

	//Access the parsed data after scraping
	for i, element := range parsedStocks {

		fmt.Printf("%+v\n", element)

		messageValue, err := json.Marshal(element)

		// Convert int to string
		key := strconv.Itoa(i)

		// Produce a message to the topic
		message := &kafka.Message{
			TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
			Key:            []byte(key),
			Value:          messageValue,
		}

		// Produce the message and j handle errors
		err = p.Produce(message, nil)
		if err != nil {
			fmt.Printf("Failed to produce message: %s\n", err)
			return
		}

		// Wait for the message to be delivered to the broker
		deliveryReport := <-p.Events()
		switch e := deliveryReport.(type) {
		case *kafka.Message:
			if e.TopicPartition.Error != nil {
				fmt.Printf("Delivery failed: %v\n", e.TopicPartition.Error)
			} else {
				fmt.Printf("Delivered message to topic %s [%d] at offset %v\n",
					*e.TopicPartition.Topic, e.TopicPartition.Partition, e.TopicPartition.Offset)
			}
		}
	}

}
