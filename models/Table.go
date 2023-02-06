package models

import (
	"time"

	"github.com/google/uuid"
)

type Table struct {
	ID 			uuid.UUID 	`json:"id" gorm:"column:id;type:uuid;default:uuid_generate_v4()"`
	UserID 		uuid.UUID 	`json:"user_id" gorm:"column:user_id;type:uuid"`
	FileName 	string 		`json:"file_name" gorm:"column:file_name;type:varchar(255)"`
	CSV 		string		`json:"csv"`
	Size 		int			`json:"size" gorm:"column:size;type;integer"`
	DateCreated time.Time 	`json:"date_created" gorm:"column:date_created;type:time"`
}