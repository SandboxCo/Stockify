package handler

import (
	"fmt"
	"net/http"
)

type DataCollection struct{}

func (o *DataCollection) List(w http.ResponseWriter, r *http.Request) {
	fmt.Println("List all data")
}
