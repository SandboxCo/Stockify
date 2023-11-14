package handler

import (
	"fmt"
	"net/http"
)

type Auth struct{}

func (o *Auth) CreateUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Create a user")
}

func (o *Auth) Login(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Logging in user")
}
