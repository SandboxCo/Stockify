package handler

import (
	"fmt"
	"net/http"
	""
)

func Create(w http.ResponseWriter, r *http.Request, o *Database) {
	fmt.Println("Create an order")
}

func List(w http.ResponseWriter, r *http.Request, o *Database) {
	fmt.Println("List all orders")
}

func GetById(w http.ResponseWriter, r *http.Request, o *Database) {
	fmt.Println("Get an order by ID")
}

func UpdateByID(w http.ResponseWriter, r *http.Request, o *Database) {
	fmt.Println("Update an order by ID")
}

func (o *Database) DeleteByID(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Delete an order by ID")
}
