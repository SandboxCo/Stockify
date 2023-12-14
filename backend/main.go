package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/SandboxCo/Humanity360/backend/application"
)

func main() {
	app := application.New()
	//datapipeline.StartProducing()
	//datapipeline.StartConsuming()

	err := app.Start(context.TODO())
	if err != nil {
		fmt.Println("failed to start app", err)
	}

	response, err := http.Get("http://site.api.espn.com/apis/site/v2/sports/basketball/nba/news")

	if err != nil {
		fmt.Print(err.Error())
		os.Exit(1)
	}

	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(responseData))
}
