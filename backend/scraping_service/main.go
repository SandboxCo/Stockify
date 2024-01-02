package main

import (
	"encoding/json"
	"fmt"
	"log"
	"strconv"

	"github.com/confluentinc/confluent-kafka-go/v2/kafka"
	"github.com/gocolly/colly/v2"
)

type Article struct {
	Header   string `json:"header"`
	Subtitle string `json:"sub_title"`
	Url      string `json:"url"`
	Date     string `json:"date"`
	Source   string `json:"source"`
	Imgurl   string `json:"img_url"`
}

// MessageObject represents the structure of the JSON message
type MessageObject struct {
	ID   int    `json:"id"`
	Data string `json:"data"`
}

func main() {
	// Create a new collector
	c := colly.NewCollector()

	// Define the URL you want to scrape
	url := "https://ca.finance.yahoo.com/topic/news/"

	var parsedArticles []Article

	c.OnHTML(".js-stream-content", func(element *colly.HTMLElement) {
		article := Article{
			Header:   "",
			Subtitle: "",
			Url:      "",
			Date:     "",
			Source:   "Yahoo Finance",
			Imgurl:   "",
		}

		element.ForEach("a", func(_ int, child *colly.HTMLElement) {
			article.Header = child.Text
			article.Url = child.Attr("href")
		})

		element.ForEach("p", func(_ int, child *colly.HTMLElement) {
			article.Subtitle = child.Text
		})

		element.ForEach("img", func(_ int, child *colly.HTMLElement) {
			article.Imgurl = child.Attr("src")
		})

		parsedArticles = append(parsedArticles, article)
	})

	//Visit the URL and start scraping
	err := c.Visit(url)
	if err != nil {
		fmt.Println("error occured")
		log.Fatal(err)
	}

	// url = "https://www.cnbc.com/personal-finance/"

	// c.OnHTML(".comp .mntl-taxonomysc-article-list-group .mntl-block", func(element *colly.HTMLElement) {
	// 	fmt.Println(element.DOM)

	// 	article := Article{
	// 		header:    "",
	// 		sub_title: "",
	// 		url:       "",
	// 		date:      "",
	// 		source:    "livemint.com",
	// 		img_url:   "",
	// 	}

	// 	element.ForEach(".card__title-text", func(_ int, child *colly.HTMLElement) {
	// 		child.ForEach("a", func(_ int, child *colly.HTMLElement) {
	// 			child.ForEach("img", func(_ int, subChild *colly.HTMLElement) {
	// 				article.img_url = subChild.Attr("href")
	// 			})
	// 			article.url = child.Attr("href")
	// 			article.header = child.Text
	// 			fmt.Println(child.Text, child.Attr("href"))

	// 			child.ForEach("card__title-text", func(_ int, subChild *colly.HTMLElement) {
	// 				article.img_url = subChild.Attr("href")
	// 			})
	// 		})
	// 		fmt.Println(child)
	// 	})

	// count := 1
	// element.ForEach("a", func(_ int, child *colly.HTMLElement) {
	// 	if count == 1 {
	// 		article.header = child.Text
	// 		article.url = child.Attr("href")
	// 		count = count + 1
	// 		fmt.Println(child.Text, child.Attr("href"))
	// 	}
	// })

	// element.ForEach("p", func(_ int, child *colly.HTMLElement) {
	// 	article.sub_title = child.Text
	// })

	// element.ForEach("img", func(_ int, child *colly.HTMLElement) {
	// 	article.img_url = child.Attr("src")
	// })

	//parsedArticles = append(parsedArticles, article)
	//	})

	// Visit the URL and start scraping
	// err = c.Visit(url)
	// if err != nil {
	// 	fmt.Println("error occured")
	// 	log.Fatal(err)
	// }

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
	topic := "topic_0"

	//Access the parsed data after scraping
	for i, element := range parsedArticles {

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
