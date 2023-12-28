package main

import (
	"context"
	"fmt"

	"github.com/SandboxCo/Humanity360/backend/data _service/application"
	"github.com/SandboxCo/Humanity360/backend/data_service/api"
)

func main() {
	ctx := context.Background()

	database := application.New()
	api_gateway := api.New(database, ctx)

	database.client.Ping(ctx)

	err := api_gateway.Start(context.TODO())
	if err != nil {
		fmt.Println("failed to start app", err)
	}

	// client.Set(ctx, "key2", "456", 0).Err()

	// val, err := client.Get(ctx, "key2").Result()
	// if err != nil {
	// 	fmt.Println("failed to start app", err)
	// }

	// fmt.Println("key1", val)
}
