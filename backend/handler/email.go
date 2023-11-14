package handler

import (
	"fmt"
	"net/http"
)

type Email struct{}

func (o *Email) SendMsg(w http.ResponseWriter, r *http.Request) {
	fmt.Println("sent email")
}

func (o *Email) GetMsg(w http.ResponseWriter, r *http.Request) {
	fmt.Println("getting emails")
}
