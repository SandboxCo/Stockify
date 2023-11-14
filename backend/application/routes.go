package application

import (
	"net/http"

	"github.com/SandboxCo/Humanity360/backend/handler"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func loadRoutes() *chi.Mux {
	router := chi.NewRouter()
	router.Use(middleware.Logger)

	router.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	router.Route("/database", loadDatabaseRoutes)

	return router
}

func loadDatabaseRoutes(router chi.Router) {
	databaseHandler := &handler.Database{}

	router.Post("/", databaseHandler.Create)
	router.Get("/", databaseHandler.List)
	router.Get("/{id}", databaseHandler.GetById)
	router.Put("/{id}", databaseHandler.UpdateByID)
	router.Delete("/{id}", databaseHandler.DeleteByID)
}
