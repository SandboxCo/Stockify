package redis

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/redis/go-redis/v9"
)

type Database struct {
	Conn *redis.Client
	Ctx  context.Context
}

func New(newCtx context.Context) *Database {
	db := &Database{
		Conn: redis.NewClient(&redis.Options{
			Addr:     "redis-15195.c323.us-east-1-2.ec2.cloud.redislabs.com:15195",
			Password: "aY8A0QKPg3N0BXvEX1gp3WpID54XACLM",
		}),
		Ctx: newCtx,
	}

	return db
}

func filterKeys(keys []string, prefix string) []string {
	var filteredKeys []string
	for _, key := range keys {
		if strings.HasPrefix(key, prefix) {
			filteredKeys = append(filteredKeys, key)
		}
	}
	return filteredKeys
}

func (db *Database) GetStocks(w http.ResponseWriter, r *http.Request) {
	keys, err := db.Conn.Keys(db.Ctx, "*").Result()
	if err != nil {
		log.Fatal(err)
	}
	// Filter keys based on a prefix
	prefix := "stock:"
	filteredKeys := filterKeys(keys, prefix)

	var stocks []string

	for _, str := range filteredKeys {
		retVal := db.Getdb(str)
		stocks = append(stocks, retVal)
	}

	responseString := fmt.Sprintf("[%s]", strings.Join(stocks, ", "))
	w.Write([]byte(responseString))
	w.WriteHeader(200)
}

func (db *Database) GetArticles(w http.ResponseWriter, r *http.Request) {
	keys, err := db.Conn.Keys(db.Ctx, "*").Result()
	if err != nil {
		log.Fatal(err)
	}
	// Filter keys based on a prefix
	prefix := "article:"
	filteredKeys := filterKeys(keys, prefix)

	var articles []string

	for _, str := range filteredKeys {
		retVal := db.Getdb(str)
		articles = append(articles, retVal)
	}

	responseString := fmt.Sprintf("[%s]", strings.Join(articles, ", "))
	w.Write([]byte(responseString))
	w.WriteHeader(200)
}

func (db *Database) Postdb(key string, value []byte) {
	db.Conn.Set(db.Ctx, key, value, 0).Err()
}

func (db *Database) Getdb(key string) string {
	val, _ := db.Conn.Get(db.Ctx, key).Result()

	return val
}

// func (o *Database) GetById(w http.ResponseWriter, r *http.Request) {
// 	fmt.Println("Get an order by ID")
// }

// func (o *Database) UpdateByID(w http.ResponseWriter, r *http.Request) {
// 	fmt.Println("Update an order by ID")
// }

// func (o *Database) DeleteByID(w http.ResponseWriter, r *http.Request) {
// 	fmt.Println("Delete an order by ID")
// }
