package datapipeline

import (
	"fmt"
	"strconv"
	"time"

	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func StartProducing() {
	p, err := kafka.NewProducer(&kafka.ConfigMap{"bootstrap.servers": "localhost:9092"})
	if err != nil {
		panic(err)
	}

	defer p.Close()

	topic := "myTopic"
	for counter := 0; ; counter++ {
		value := "Message #" + strconv.Itoa(counter)
		p.Produce(&kafka.Message{
			TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
			Value:          []byte(value),
		}, nil)

		fmt.Println("Sent:", value)
		p.Flush(15 * 1000)
		time.Sleep(1 * time.Second)
	}
}
