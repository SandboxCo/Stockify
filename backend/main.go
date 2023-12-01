package main

import (
	"context"
	"fmt"

	"github.com/SandboxCo/Humanity360/backend/application"
	"github.com/SandboxCo/Humanity360/backend/datapipeline"
)

func main() {
	app := application.New()
	datapipeline.StartProducing()
	datapipeline.StartConsuming()

	err := app.Start(context.TODO())
	if err != nil {
		fmt.Println("failed to start app", err)
	}
}
