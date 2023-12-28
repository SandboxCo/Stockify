package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func main() {
	response, err := http.Get("http://site.api.espn.com/apis/site/v2/sports/basketball/nba/news")

	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(responseData))

	if err != nil {
		fmt.Print(err.Error())
		os.Exit(1)
	}
}
