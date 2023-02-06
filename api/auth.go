package api

import (
    "net/http"
	"encoding/json"
	"log"
	"spreadsheet/models"
	"spreadsheet/config"
	"spreadsheet/utils"
	"spreadsheet/middleware"
	"fmt"
	"time"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"crypto/md5"
)

func SignUpUser (res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")

	var form models.User
	err := json.NewDecoder(req.Body).Decode(&form)
	if err != nil {
		log.Fatal(err)
	}

	db := config.ConnectDB()
	sqlDB, err := db.DB()
	defer sqlDB.Close()
	if err != nil {
		utils.CheckError(err)
		err = json.NewEncoder(res).Encode(DB_CONN_ERROR.String())
		utils.CheckError(err)
		return
	}

	err = db.Table("users").Where("email = ?", form.Email).First(&models.User{}).Error
	if err == nil {
		utils.CheckError(err)
		err = json.NewEncoder(res).Encode("ERROR:Email already registered!")
		utils.CheckError(err)
		return
	}

	hash_bytes, err := bcrypt.GenerateFromPassword([]byte(form.Password), 14)
	if err != nil {
		utils.CheckError(err)
		err = json.NewEncoder(res).Encode("ERROR:Could not hash password!")
		utils.CheckError(err)
		return
	}

	user := models.User{
		Avatar: 	fmt.Sprintf("https://www.gravatar.com/avatar/%x?s=%d&d=mp", md5.Sum([]byte(form.Email)), 256),
		Name:  		form.Name,
		Role: 		form.Role,
		Email:      form.Email,
		Password:   string(hash_bytes),
		DateJoined: time.Now(),
	}

	err = db.Table("users").Select(
		"avatar",
		"name",
		"role",
		"email",
		"password",
		"date_joined").Create(&user).Error

	err = db.Table("users").Last(&user).Error

	if err != nil {
		utils.CheckError(err)
		err = json.NewEncoder(res).Encode(DB_CONN_ERROR.String())
		utils.CheckError(err)
		return
	}
	/*
	user_profile := models.UserProfile{UserID: user.ID}
	err = db.Table("user_profiles").Select("user_id").Create(&user_profile).Error
	if err != nil {
		utils.CheckError(err)
		err = json.NewEncoder(res).Encode(DB_CONN_ERROR.String())
		utils.CheckError(err)
		return
	}
	*/
	token, err := middleware.GenerateJWT(user.ID.String())
	if err != nil {
		json.NewEncoder(res).Encode("ERROR:Token could not be created!")
		return
	}

	if err := json.NewEncoder(res).Encode(token); err != nil {
		panic(err)
	}
}

// SignInUser ...
func SignInUser(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")

	var form models.User
	if err := json.NewDecoder(req.Body).Decode(&form); err != nil {
		json.NewEncoder(res).Encode(FORM_PARSING_ERROR.String())
		return
	}

	db := config.ConnectDB()
	sqlDB, err := db.DB()
	defer sqlDB.Close()
	if err != nil {
		utils.CheckError(err)
		err = json.NewEncoder(res).Encode(DB_CONN_ERROR.String())
		utils.CheckError(err)
		return
	}
	

	var user models.User
	if form.Email != "" {
		err := db.Table("users").Where("email = ?", form.Email).First(&user).Error
		if err != nil {
			json.NewEncoder(res).Encode("ERROR:Email address not registered!")
			return
		}
	}

	if form.Password != "" {
		err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(form.Password))
		if err != nil {
			json.NewEncoder(res).Encode("ERROR:Incorrect password!")
			return
		}
	}
	/*
	err = db.Table("users").Where("id = ?", user.ID).Updates(models.User{IsLoggedIn: true}).Error
	if err != nil {
		utils.CheckError(err)
		err = json.NewEncoder(res).Encode(DB_CONN_ERROR.String())
		utils.CheckError(err)
		return
	}
	*/

	token, err := middleware.GenerateJWT(user.ID.String())
	if err != nil {
		json.NewEncoder(res).Encode("ERROR:Token could not be created!")
		return
	}

	err = json.NewEncoder(res).Encode(token)
	utils.CheckError(err)
}

// Logout ...
func Logout(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")
	token := req.Header.Get("x-auth-token")
	user_id, err := middleware.ParseClaims(token)
	if err != nil {
		json.NewEncoder(res).Encode("ERROR:User not logged in!")
		return
	}
	user_uid, _ := uuid.Parse(user_id)
	fmt.Println(user_uid)
	/*
	db := config.ConnectDB()
	sqlDB, _ := db.DB()
	defer sqlDB.Close()
	err = db.Table("users").Where("id = ?", user_uid).Update("is_logged_in", false).Error
	if err != nil {
		CheckError(err)
		err = json.NewEncoder(res).Encode(DB_CONN_ERROR.String())
		CheckError(err)
		return
	}
	*/
	if err := json.NewEncoder(res).Encode(true); err != nil {
		panic(err)
	}
}
