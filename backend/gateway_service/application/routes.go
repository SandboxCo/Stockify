package application

import (
	"context"

	"github.com/SandboxCo/Humanity360/backend/gateway_service/redis"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func loadRoutes(ctx context.Context) *chi.Mux {
	router := chi.NewRouter()
	router.Use(middleware.Logger)

	databaseHandler := redis.New(ctx)

	router.Get("/articles", databaseHandler.GetArticles)
	router.Get("/stocks", databaseHandler.GetStocks)
	// router.Put("/{id}", databaseHandler.UpdateByID)
	// router.Delete("/{id}", databaseHandler.DeleteByID)

	return router
}

// func loadDataCollectionRoutes(router chi.Router) {
// 	dataCollectionHandler := &handler.DataCollection{}

// 	router.Get("/", dataCollectionHandler.List)
// }

// func loadAuthRoutes(router chi.Router) {
// 	authHandler := &handler.Auth{}

// 	router.Post("/", authHandler.CreateUser)
// 	router.Get("/", authHandler.Login)
// }

// func loadEmailRoutes(router chi.Router) {
// 	emailHandler := &handler.Email{}

// 	router.Post("/", emailHandler.SendMsg)
// 	router.Get("/", emailHandler.GetMsg)
// }
