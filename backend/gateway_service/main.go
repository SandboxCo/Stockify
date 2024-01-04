package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/SandboxCo/Humanity360/backend/gateway_service/application"
	"github.com/confluentinc/confluent-kafka-go/kafka"
)

// Stock represents a stock entity
type Stock struct {
	Ticker   string `json:"ticker"`
	Name     string `json:"name"`
	Type     string `json:"type"`
	Currency string `json:"currency_name"`
	Date     string `json:"last_updated_utc"`
}

func main() {
	ctx := context.Background()

	app := application.New()

	//err := app.Start(context.TODO())
	// if err != nil {
	// 	fmt.Println("failed to start app", err)
	// }

	c, err := kafka.NewConsumer(&kafka.ConfigMap{
		"bootstrap.servers": "pkc-921jm.us-east-2.aws.confluent.cloud:9092",
		"security.protocol": "SASL_SSL",
		"sasl.mechanisms":   "PLAIN",
		"sasl.username":     "NQFSATXTMWOITLUB",
		"sasl.password":     "ptpsLG7ghr0KQD0nUrMg+ImPLnQCuXuJqKmL2/X4okiNubtngomL7Wz5hhIgExww",
		"group.id":          "your_consumer_group",
	})

	if err != nil {
		panic(err)
	}

	fmt.Println("got here")
	topics := []string{"stock_tokens", "news_articles"}
	c.SubscribeTopics(topics, nil)

	sigchan := make(chan os.Signal, 1)
	signal.Notify(sigchan, syscall.SIGINT, syscall.SIGTERM)

	run := true
	for run {
		select {
		case sig := <-sigchan:
			fmt.Printf("Caught signal %v: terminating\n", sig)
			run = false
		default:
			ev := c.Poll(100)
			if ev == nil {
				continue
			}

			switch e := ev.(type) {
			case *kafka.Message:
				fmt.Printf("Received message: %s\n", e.Value)
				var stock Stock
				err := json.Unmarshal(e.Value, &stock)
				app.Postdb(ctx, stock.Ticker, e.Value)
				if err != nil {
					panic(err)
				}

			case kafka.Error:
				fmt.Printf("Error: %v\n", e)
			}
		}
	}

	c.Close()
}
