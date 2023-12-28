package api

import (
	"github.com/SandboxCo/Humanity360/backend/database_service/handler"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func loadRoutes() *chi.Mux {
	router := chi.NewRouter()
	router.Use(middleware.Logger)

	databaseHandler := &handler.Database{}

	router.Post("/", databaseHandler.Create)
	router.Get("/", databaseHandler.List)
	router.Get("/{id}", databaseHandler.GetById)
	router.Put("/{id}", databaseHandler.UpdateByID)
	router.Delete("/{id}", databaseHandler.DeleteByID)

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
