package api

import "os"

type Error int64

const (
	AUTH_ERROR Error = iota
	NOT_ADMIN_ERROR
	FORM_PARSING_ERROR
	DB_CONN_ERROR
	USER_NOT_FOUND_ERROR
	GROUP_NOT_FOUND_ERROR
	PHOTO_NOT_FOUND_ERROR
	AUDIO_NOT_FOUND_ERROR
	VIDEO_NOT_FOUND_ERROR
)

var (
	API_SERVER string = os.Getenv("API_SERVER")
	CDN_SERVER string = os.Getenv("CDN_SERVER")
)

func (e Error) String() string {
	switch e {
	case AUTH_ERROR:
		return "AUTH_ERROR"
	case NOT_ADMIN_ERROR:
		return "ERROR:Action not authorized! Contact group admin."
	case FORM_PARSING_ERROR:
		return "ERROR:Unable to parse form data!"
	case DB_CONN_ERROR:
		return "ERROR:Database connection error! try again later."
	case USER_NOT_FOUND_ERROR:
		return "ERROR:User not found!"
	case GROUP_NOT_FOUND_ERROR:
		return "ERROR:Group not found!"
	case PHOTO_NOT_FOUND_ERROR:
		return "ERROR:Photo not found!"
	case AUDIO_NOT_FOUND_ERROR:
		return "ERROR:Audio not found!"
	case VIDEO_NOT_FOUND_ERROR:
		return "ERROR:Video not found!"
	}
	return "ERROR:An unknown error occurred!"
}