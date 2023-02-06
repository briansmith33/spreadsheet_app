package api


import (
	"encoding/json"

	"spreadsheet/models"
	"net/http"
	"spreadsheet/config"
	"spreadsheet/middleware"
	"spreadsheet/utils"

	"github.com/google/uuid"
	"io/ioutil"
	_ "github.com/lib/pq"
	"time"
	"fmt"
)

// LoadUser ...
func LoadUser(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")

	token := req.Header.Get("x-auth-token")
	user_id, err := middleware.ParseClaims(token)
	if err != nil {
		utils.CheckError(err)
		err = json.NewEncoder(res).Encode(AUTH_ERROR.String())
		utils.CheckError(err)
		return
	}
	user_uid, err := uuid.Parse(user_id)
	if err != nil {
		utils.CheckError(err)
		err = json.NewEncoder(res).Encode(AUTH_ERROR.String())
		utils.CheckError(err)
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
	err = db.Table("users").Select(
		"id",
		"avatar",
		"name",
		"role",
		"email",
		"date_joined",
	).Where("id = ?", user_uid).Scan(&user).Error
	if err != nil {
		utils.CheckError(err)
		err = json.NewEncoder(res).Encode(DB_CONN_ERROR.String())
		utils.CheckError(err)
		return
	}

	err = json.NewEncoder(res).Encode(user)
	utils.CheckError(err)

}

// SaveTable ...
func SaveTable(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")

	var tableToSave models.Table
	err := json.NewDecoder(req.Body).Decode(&tableToSave)
	utils.CheckError(err)

	token := req.Header.Get("x-auth-token")
	user_id, err := middleware.ParseClaims(token)
	if err != nil {
		utils.CheckError(err)
		err = json.NewEncoder(res).Encode(AUTH_ERROR.String())
		utils.CheckError(err)
		return
	}
	user_uid, err := uuid.Parse(user_id)
	if err != nil {
		utils.CheckError(err)
		err = json.NewEncoder(res).Encode(AUTH_ERROR.String())
		utils.CheckError(err)
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

	table := models.Table {
		UserID:  		user_uid,
		FileName: 		tableToSave.FileName,
		Size:   		len(tableToSave.CSV),
		DateCreated: 	time.Now(),
	}
	err = db.Table("saved_tables").Select(
		"user_id",
		"file_name",
		"size",
		"date_created").Create(&table).Error
	
	fmt.Println(tableToSave.CSV + "\n")

	fmt.Println(table.UserID, table.FileName, table.Size, table.DateCreated)

	err = ioutil.WriteFile("./data/" + table.ID.String() + ".bin", utils.AESEncrypt([]byte(tableToSave.CSV)), 0666)
	utils.CheckError(err)
	err = json.NewEncoder(res).Encode(table)
	utils.CheckError(err)
}