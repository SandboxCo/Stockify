package application

import (
	"context"
	"fmt"
	"net/http"
)

type ApiGateway struct {
	router http.Handler
}

func New() *ApiGateway {
	app := &ApiGateway{
		router: loadRoutes(),
	}

	return app
}

func (a *ApiGateway) Start(ctx context.Context) error {
	server := &http.Server{
		Addr:    ":3000",
		Handler: a.router,
	}

	err := server.ListenAndServe()
	if err != nil {
		return fmt.Errorf("failed to start server %w", err)
	}

	return nil

}
