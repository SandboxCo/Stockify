package handler

import (
	"fmt"
	"net/http"
)

type Database struct{}

func (o *Database) Create(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Create an order")
}

func (o *Database) List(w http.ResponseWriter, r *http.Request) {
	fmt.Println("List all orders")
}

func (o *Database) GetById(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Get an order by ID")
}

func (o *Database) UpdateByID(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Update an order by ID")
}

func (o *Database) DeleteByID(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Delete an order by ID")
}
