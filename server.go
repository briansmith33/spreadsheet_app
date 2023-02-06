package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
	"spreadsheet/api"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func addHeaders(h http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		h.ServeHTTP(w, r)
	}
}

func main() {
	
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	Router := mux.NewRouter()

	Router.HandleFunc("/api/auth/signup", api.SignUpUser).Methods("POST")
	Router.HandleFunc("/api/auth/signin", api.SignInUser).Methods("POST")
	Router.HandleFunc("/api/auth/logout", api.Logout).Methods("PUT")

	Router.HandleFunc("/api/user", api.LoadUser).Methods("GET")
	Router.HandleFunc("/api/user/save-table", api.SaveTable).Methods("POST")

	Server := &http.Server{
		Handler: addHeaders(Router),
		Addr:    os.Getenv("API_SERVER"),
		WriteTimeout:      30 * time.Second,
		ReadTimeout:       30 * time.Second,
		IdleTimeout:       30 * time.Second,
		ReadHeaderTimeout: 2 * time.Second,
	}

	fmt.Println("running at http://"+os.Getenv("API_SERVER"))
	log.Fatal(Server.ListenAndServeTLS(os.Getenv("CERT"), os.Getenv("KEY")))

}
