package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID 			uuid.UUID 	`json:"id" gorm:"column:id;type:uuid;primaryKey;default:uuid_generate_v4()"`
	Avatar 		string    	`json:"avatar" gorm:"column:avatar;type:string"`
	Name 		string 		`json:"name" gorm:"column:name;type:varchar(255)"`
	Role 		string		`json:"role" gorm:"column:role;type:varchar(255)"`
	Email 		string 		`json:"email" gorm:"column:email;type:varchar(255)"`
	Password 	string		`json:"password" gorm:"column:password;type:varchar(255)"`
	DateJoined 	time.Time 	`json:"date_joined" gorm:"column:date_joined;type:time"`
}