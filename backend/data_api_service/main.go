package main

import (
	"encoding/json"
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/confluentinc/confluent-kafka-go/v2/kafka"
	"github.com/gocolly/colly/v2"
)

// Stock represents a stock entity
type Stock struct {
	Ticker        string    `json:"ticker"`
	Name          string    `json:"name"`
	Portfolio     string    `json:"portfolio"`
	Price         string    `json:"price"`
	Change        string    `json:change`
	Percentchange string    `json:"percentchange"`
	Date          time.Time `json:"last_updated_utc"`
}

// StockResponse represents the JSON response structure
type StockResponse struct {
	Results []Stock `json:"results"`
}

func main() {
	// Create a new collector
	c := colly.NewCollector()

	// Define the URL you want to scrape
	url := "https://www.slickcharts.com/sp500"

	var parsedStocks []Stock

	c.OnHTML(".col-lg-7", func(element *colly.HTMLElement) {
		stock := Stock{
			Ticker:        "",
			Name:          "",
			Portfolio:     "",
			Price:         "",
			Change:        "",
			Percentchange: "",
			Date:          time.Now(),
		}

		element.ForEach("tr", func(_ int, child *colly.HTMLElement) {
			count := 0
			child.ForEach("td", func(_ int, child *colly.HTMLElement) {
				if count == 1 {
					stock.Name = child.ChildText("a:first-child")
				} else if count == 2 {
					stock.Ticker = child.ChildText("a:first-child")
				} else if count == 3 {
					stock.Portfolio = child.Text
				} else if count == 4 {
					stock.Price = child.Text
				} else if count == 5 {
					stock.Change = child.Text
				} else if count == 6 {
					stock.Percentchange = child.Text
				}
				count = count + 1
			})
			parsedStocks = append(parsedStocks, stock)
			//fmt.Printf("Stock Object: %v\n", stock)
		})
	})

	//Visit the URL and start scraping
	err := c.Visit(url)
	if err != nil {
		fmt.Println("error occured")
		log.Fatal(err)
	}

	// stockResponse, err := http.Get("https://api.polygon.io/v3/reference/tickers?active=true&apiKey=QPFs6luFf15cS9kaDOcGp9GwhzGh0482")
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// defer stockResponse.Body.Close()

	// // Read the response body
	// body, err := io.ReadAll(stockResponse.Body)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// // Unmarshal JSON into struct
	// var stockData StockResponse
	// err = json.Unmarshal(body, &stockData)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// var parsedStocks []Stock
	// for _, stock := range stockData.Results {
	// 	stockAdd := Stock{
	// 		Ticker:   stock.Ticker,
	// 		Name:     stock.Name,
	// 		Type:     stock.Type,
	// 		Currency: stock.Currency,
	// 		Date:     stock.Date,
	// 	}
	// 	parsedStocks = append(parsedStocks, stockAdd)
	// }

	p, err := kafka.NewProducer(&kafka.ConfigMap{
		"bootstrap.servers": "pkc-921jm.us-east-2.aws.confluent.cloud:9092",
		"security.protocol": "SASL_SSL",
		"sasl.mechanisms":   "PLAIN",
		"sasl.username":     "NQFSATXTMWOITLUB",
		"sasl.password":     "ptpsLG7ghr0KQD0nUrMg+ImPLnQCuXuJqKmL2/X4okiNubtngomL7Wz5hhIgExww",
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
