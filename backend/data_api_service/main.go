package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

func main() {
	//retrieve stock tickers
	stockResponse, err := http.Get("https://api.polygon.io/v3/reference/tickers?active=true&apiKey=QPFs6luFf15cS9kaDOcGp9GwhzGh0482")
	stockData, err := io.ReadAll(stockResponse.Body)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(stockData))
	if err != nil {
		fmt.Print(err.Error())
		os.Exit(1)
	}

	// indicatorResponse, err := http.Get("https://api.polygon.io/v3/reference/tickers?active=true&apiKey=QPFs6luFf15cS9kaDOcGp9GwhzGh0482")
	// indicatorData, err := io.ReadAll(indicatorResponse.Body)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// fmt.Println(string(indicatorData))
	// if err != nil {
	// 	fmt.Print(err.Error())
	// 	os.Exit(1)
	// }
}
