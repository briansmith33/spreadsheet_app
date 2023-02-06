package config

import (
	"fmt"
	"os"
	"strconv"
	"spreadsheet/utils"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)



// ConnectDB ...
func ConnectDB() *gorm.DB {
	dbhost := os.Getenv("POSTGRES_HOST")
	dbport, _ := strconv.ParseInt(os.Getenv("POSTGRES_PORT"), 0, 64)
	dbuser := os.Getenv("POSTGRES_USER")
	dbpassword := os.Getenv("POSTGRES_PASS")
	dbname := os.Getenv("POSTGRES_DB")
	dsn := fmt.Sprintf("host=%s port=%d user=%s dbname=%s sslmode=disable password=%s TimeZone=America/Los_Angeles", dbhost, dbport, dbuser, dbname, dbpassword)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	utils.CheckError(err)
	return db
}