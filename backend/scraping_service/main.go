package main

import (
	"fmt"
	"log"

	"github.com/gocolly/colly/v2"
)

type Article struct {
	header    string
	sub_title string
	url       string
	date      string
	source    string
	img_url   string
}

func main() {
	// Create a new collector
	c := colly.NewCollector()

	// Define the URL you want to scrape
	url := "https://ca.finance.yahoo.com/topic/news/"

	var parsedArticles []Article

	c.OnHTML(".js-stream-content", func(element *colly.HTMLElement) {
		article := Article{
			header:    "",
			sub_title: "",
			url:       "",
			date:      "",
			source:    "Yahoo Finance",
		}

		element.ForEach("a", func(_ int, child *colly.HTMLElement) {
			article.header = child.Text
			article.url = child.Attr("href")
		})

		element.ForEach("p", func(_ int, child *colly.HTMLElement) {
			article.sub_title = child.Text
		})

		element.ForEach("img", func(_ int, child *colly.HTMLElement) {
			article.img_url = child.Attr("src")
		})

		parsedArticles = append(parsedArticles, article)
	})

	// Visit the URL and start scraping
	err := c.Visit(url)
	if err != nil {
		fmt.Println("error occured")
		log.Fatal(err)
	}

	url = "https://www.cnbc.com/personal-finance/"

	c.OnHTML(".comp .mntl-taxonomysc-article-list-group .mntl-block", func(element *colly.HTMLElement) {
		fmt.Println(element.DOM)

		article := Article{
			header:    "",
			sub_title: "",
			url:       "",
			date:      "",
			source:    "livemint.com",
			img_url:   "",
		}

		element.ForEach(".Card-standardBreakerCard .Card-threeUpStackRectangleSquareMedia .Card-rectangleToLeftSquareMedia .Card-card", func(_ int, child *colly.HTMLElement) {
			child.ForEach("a", func(_ int, child *colly.HTMLElement) {
				child.ForEach("img", func(_ int, subChild *colly.HTMLElement) {
					article.img_url = subChild.Attr("href")
				})
				article.url = child.Attr("href")
				article.header = child.Text
				fmt.Println(child.Text, child.Attr("href"))

				child.ForEach("card__title-text", func(_ int, subChild *colly.HTMLElement) {
					article.img_url = subChild.Attr("href")
				})
			})
			fmt.Println(child)
		})

		// count := 1
		// element.ForEach("a", func(_ int, child *colly.HTMLElement) {
		// 	if count == 1 {
		// 		article.header = child.Text
		// 		article.url = child.Attr("href")
		// 		count = count + 1
		// 		fmt.Println(child.Text, child.Attr("href"))
		// 	}
		// })

		// element.ForEach("p", func(_ int, child *colly.HTMLElement) {
		// 	article.sub_title = child.Text
		// })

		// element.ForEach("img", func(_ int, child *colly.HTMLElement) {
		// 	article.img_url = child.Attr("src")
		// })

		parsedArticles = append(parsedArticles, article)
	})

	// Visit the URL and start scraping
	err = c.Visit(url)
	if err != nil {
		fmt.Println("error occured")
		log.Fatal(err)
	}

	// Access the parsed data after scraping
	// for _, element := range parsedArticles {
	// 	fmt.Printf("%+v\n", element)
	// }
}
