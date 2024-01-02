package application

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/redis/go-redis/v9"
)

type App struct {
	router http.Handler
	rdb    *redis.Client
}

func New() *App {
	app := &App{
		router: loadRoutes(),
		rdb: redis.NewClient(&redis.Options{
			Addr:     "arn:aws:elasticache:us-east-2:517914566534:serverlesscache:stock-data-cache",
			Password: "", // no password set
			DB:       0,  // use default DB
		}),
	}

	return app
}

func (a *App) Start(ctx context.Context) error {
	server := &http.Server{
		Addr:    ":3000",
		Handler: a.router,
	}

	err := a.rdb.Ping(ctx).Err()
	if err != nil {
		return fmt.Errorf("failed to connect to redis: %w", err)
	}

	if err != nil {
		return fmt.Errorf("failed to start server %w", err)
	}

	defer func() {
		if err := a.rdb.Close(); err != nil {
			fmt.Println("failed to close redis", err)
		}
	}()

	ch := make(chan error, 1)

	go func() {
		err = server.ListenAndServe()
		if err != nil {
			ch <- fmt.Errorf("failed to start server: %w", err)
		}
		close(ch)
	}()

	select {
	case err = <-ch:
		return err
	case <-ctx.Done():
		timeout, cancel := context.WithTimeout(context.Background(), time.Second*10)
		defer cancel()

		return server.Shutdown(timeout)
	}

	return nil

}

func (a *App) Postdatabase(ctx context.Context) {
	a.rdb.Set(ctx, "key2", "456", 0).Err()

	val, err := a.rdb.Get(ctx, "key2").Result()
	if err != nil {
		fmt.Println("failed to start app", err)
	}

	fmt.Println("key1", val)
}
