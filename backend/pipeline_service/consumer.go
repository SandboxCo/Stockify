package main

import (
	"fmt"
	"os"
	"os/signal"
	"strings"
	"syscall"

	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func processMessage(msg *kafka.Message) {
	message := string(msg.Value)
	wordCount := strings.Count(message, "Message")
	fmt.Printf("Received message: %s - Word count: %d\n", message, wordCount)
}

func mainNewAgain() {
	c, err := kafka.NewConsumer(&kafka.ConfigMap{
		"bootstrap.servers": "localhost:9092",
		"group.id":          "myGroup",
		"auto.offset.reset": "earliest",
	})

	if err != nil {
		panic(err)
	}

	c.SubscribeTopics([]string{"myTopic"}, nil)

	sigchan := make(chan os.Signal, 1)
	signal.Notify(sigchan, syscall.SIGINT, syscall.SIGTERM)

	for {
		select {
		case sig := <-sigchan:
			fmt.Printf("Caught signal %v: terminating\n", sig)
			c.Close()
			return
		default:
			msg, err := c.ReadMessage(-1)
			if err == nil {
				processMessage(msg)
			} else {
				fmt.Printf("Consumer error: %v (%v)\n", err, msg)
			}
		}
	}
}
