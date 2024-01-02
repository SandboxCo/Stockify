package main

import (
	"context"

	"github.com/SandboxCo/Humanity360/backend/gateway_service/application"
)

func main() {
	ctx := context.Background()

	app := application.New()

	// err := app.Start(context.TODO())
	// if err != nil {
	// 	fmt.Println("failed to start app", err)
	// }

	app.Postdatabase(ctx)
}
