package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
	"spreadsheet/api"
	"github.com/gorilla/mux"
)

func addHeaders(h http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		h.ServeHTTP(w, r)
	}
}

func main() {
	Router := mux.NewRouter()

	Router.HandleFunc("/api/auth/signup", api.SignUpUser).Methods("POST")

	Server := &http.Server{
		Handler: addHeaders(Router),
		Addr:    "localhost:5000",
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout:      30 * time.Second,
		ReadTimeout:       30 * time.Second,
		IdleTimeout:       30 * time.Second,
		ReadHeaderTimeout: 2 * time.Second,
	}

	fmt.Println("running at http://127.0.0.1:5000")
	log.Fatal(Server.ListenAndServeTLS("C:\\certs\\localhost.crt", "C:\\certs\\localhost.key"))
}
