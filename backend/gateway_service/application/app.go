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
			Addr:     "redis-15195.c323.us-east-1-2.ec2.cloud.redislabs.com:15195",
			Password: "aY8A0QKPg3N0BXvEX1gp3WpID54XACLM",
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

func (a *App) Postdb(ctx context.Context, key string, value []byte) {
	a.rdb.Set(ctx, key, value, 0).Err()
}

func (a *App) Getdb(ctx context.Context, key string) string {
	val, _ := a.rdb.Get(ctx, key).Result()

	return val
}
