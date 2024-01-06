package application

import (
	"context"
	"fmt"
	"net/http"
)

type Server struct {
	router http.Handler
}

func New(ctx context.Context) *Server {
	server := &Server{
		router: loadRoutes(ctx),
	}

	return server
}

func (a *Server) Start(ctx context.Context) error {
	server := &http.Server{
		Addr:    ":8081",
		Handler: a.router,
	}

	// defer func() {
	// 	if err := a.rdb.Close(); err != nil {
	// 		fmt.Println("failed to close redis", err)
	// 	}
	// }()

	// ch := make(chan error, 1)

	// go func() {
	err := server.ListenAndServe()
	if err != nil {
		fmt.Printf("failed to start server: %w")
	}
	// 	close(ch)
	// }()

	// select {
	// case err = <-ch:
	// 	return err
	// case <-ctx.Done():
	// 	timeout, cancel := context.WithTimeout(context.Background(), time.Second*10)
	// 	defer cancel()

	// 	return server.Shutdown(timeout)
	// }

	return nil

}
