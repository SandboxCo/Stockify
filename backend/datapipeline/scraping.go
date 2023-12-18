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
	c.OnHTML("div.quote", func(e *colly.HTMLElement) {
		// Extract the text of the quote
		quote := e.ChildText("span.text")
		// Extract the author of the quote
		author := e.ChildText("small.author")

		// Print the quote and author
		fmt.Printf("Quote: %s\nAuthor: %s\n\n", quote, author)
	})

	// Set up the callback for when a visited HTML element links to another page
	c.OnHTML("li.next", func(e *colly.HTMLElement) {
		// Extract the URL of the next page
		nextPage := e.ChildAttr("a", "href")
		// Visit the next page
		c.Visit(e.Request.AbsoluteURL(nextPage))
	})

	// Set up error handling
	c.OnError(func(r *colly.Response, err error) {
		log.Println("Request URL:", r.Request.URL, "failed with response:", r, "\nError:", err)
	})

	// Start scraping by visiting the initial page
	err := c.Visit("http://quotes.toscrape.com/page/1/")
	if err != nil {
		log.Fatal(err)
	}

}
