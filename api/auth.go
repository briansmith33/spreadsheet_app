package api

import (
    "net/http"
	"encoding/json"
	"log"
)

type SignUpForm struct {
	Name string `json:"name"`
	Role string	`json:"role"`
	Email string `json:"email"`
	Password string	`json:"password"`
}

func SignUpUser (res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")

	var form SignUpForm
	err := json.NewDecoder(req.Body).Decode(&form)
	if err != nil {
		log.Fatal(err)
	}
}