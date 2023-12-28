package main

import (
	"fmt"
	"log"

	"github.com/gocolly/colly/v2"
)

func main() {
	// Create a new collector
	c := colly.NewCollector()

	// Set up the callback for when a visited HTML element is found
	c.OnHTML(".cscore_link", func(e *colly.HTMLElement) {
		// Extract the text of the quote
		link := e.Attr("href")

		// Print the quote and author
		fmt.Printf("Link: %s\n", link)
	})

	// Set up error handling
	// c.OnError(func(r *colly.Response, err error) {
	// 	log.Println("Request URL:", r.Request.URL, "failed with response:", r, "\nError:", err)
	// })

	// Start scraping by visiting the initial page
	c.Visit("https://www.espn.com/nba/")

	// Set up the callback for when a visited HTML element is found
	c.OnHTML(".LastPlays__Basketball__Table__Row", func(e *colly.HTMLElement) {
		// Extract the text of the quote
		play := e.ChildText(".LastPlays__Basketball__Play__Truncate")
		// Extract the author of the quote
		time := e.ChildText(".LastPlays__Basketball__Time ")

		// Print the quote and author
		fmt.Printf("Play: %s\nTime: %s\n\n", play, time)
	})

	// Set up error handling
	c.OnError(func(r *colly.Response, err error) {
		log.Println("Request URL:", r.Request.URL, "failed with response:", r, "\nError:", err)
	})

	// Start scraping by visiting the initial page
	c.Visit("https://www.espn.com/nba/game?gameId=401584978")

}
