package main

import (
	"context"
	"fmt"
	"strings"

	"github.com/SandboxCo/Humanity360/backend/gateway_service/application"
	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func processMessage(msg *kafka.Message) {
	message := string(msg.Value)
	wordCount := strings.Count(message, "Message")
	fmt.Printf("Received message: %s - Word count: %d\n", message, wordCount)
}

func main() {
	//	ctx := context.Background()

	app := application.New()

	err := app.Start(context.TODO())
	if err != nil {
		fmt.Println("failed to start app", err)
	}

	c, err := kafka.NewConsumer(&kafka.ConfigMap{
		"bootstrap.servers": "pkc-921jm.us-east-2.aws.confluent.cloud:9092",
		"security.protocol": "SASL_SSL",
		"sasl.mechanisms":   "PLAIN",
		"sasl.username":     "NQFSATXTMWOITLUB",
		"sasl.password":     "ptpsLG7ghr0KQD0nUrMg+ImPLnQCuXuJqKmL2/X4okiNubtngomL7Wz5hhIgExww",
	})

	if err != nil {
		panic(err)
	}

	fmt.Println("got here")
	c.SubscribeTopics([]string{"topic_0"}, nil)

	// sigchan := make(chan os.Signal, 1)
	// signal.Notify(sigchan, syscall.SIGINT, syscall.SIGTERM)

	// for {
	// 	select {
	// 	case sig := <-sigchan:
	// 		fmt.Printf("Caught signal %v: terminating\n", sig)
	// 		c.Close()
	// 		return
	// 	default:
	// 		msg, err := c.ReadMessage(-1)
	// 		if err == nil {
	// 			processMessage(msg)
	// 		} else {
	// 			fmt.Printf("Consumer error: %v (%v)\n", err, msg)
	// 		}
	// 	}
	// }

	// /	app.Postdb(ctx)
}
