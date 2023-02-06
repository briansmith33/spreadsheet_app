package utils

import (
	"log"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/rsa"
    "crypto/sha256"
	"crypto/x509"
	"encoding/base64"
	"io/ioutil"
	"fmt"
	"strings"
	"encoding/pem"
	"io"
	"os"
)

// CheckError ...
func CheckError(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

// AESEncrypt ...
func AESEncrypt(text []byte) []byte {
	aesKey, err := GenRandomBytes(32)
	CheckError(err)
	c, err := aes.NewCipher(aesKey)
	CheckError(err)
	gcm, err := cipher.NewGCM(c)
	CheckError(err)
	
	nonce := make([]byte, gcm.NonceSize())
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		fmt.Println(err)
	}

	rsaPubKey := GetRsaPub()
	encKey := RSAEncrypt(aesKey, *rsaPubKey)
	b64Key := base64.StdEncoding.EncodeToString([]byte(string(encKey)))
	cipherText := gcm.Seal(nonce, nonce, text, nil)

	data := []byte(b64Key + "\n" + string(cipherText))
	encodedCipher := make([]byte, base64.StdEncoding.EncodedLen(len(data)))
	base64.StdEncoding.Encode(encodedCipher, data)
	return encodedCipher
}

// AESDecrypt ...
func AESDecrypt(ciphertext []byte) []byte {
	decodedCipher := make([]byte, base64.StdEncoding.DecodedLen(len(ciphertext)))
	n, err := base64.StdEncoding.Decode(decodedCipher, ciphertext)
	CheckError(err)
	decodedCipher = decodedCipher[:n]

	splitcipher := strings.Split(string(decodedCipher), "\n")
	b64Key := splitcipher[0]

	encKey, err := base64.StdEncoding.DecodeString(b64Key)
	CheckError(err)
	
	ciphertext = []byte(strings.Join(splitcipher[1:], "\n"))


	rsaPrivKey := GetRsaPriv()
	aesKey := RSADecrypt(encKey, *rsaPrivKey)

	c, err := aes.NewCipher(aesKey)
	CheckError(err)
	gcm, err := cipher.NewGCM(c)
	CheckError(err)
	nonceSize := gcm.NonceSize()
	nonce, ciphertext := ciphertext[:nonceSize], ciphertext[nonceSize:]
	if len(ciphertext) < nonceSize {
		fmt.Println(err)
	}

	//fmt.Println(string(signature) + "\n")
	plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
	CheckError(err)
	return plaintext
}

// GenRandomBytes ...
func GenRandomBytes(size int) (blk []byte, err error) {
    blk = make([]byte, size)
    _, err = rand.Read(blk)
    return
}

// RSAEncrypt ...
func RSAEncrypt(data []byte, key rsa.PublicKey) []byte {
    label := []byte("OAEP Encrypted")
    rng := rand.Reader
    ciphertext, err := rsa.EncryptOAEP(sha256.New(), rng, &key, data, label)
    CheckError(err)
    return ciphertext
}
 
// RSADecrypt ...
func RSADecrypt(data []byte, privKey rsa.PrivateKey) []byte {
    //ct, _ := base64.StdEncoding.DecodeString(cipherText)
    label := []byte("OAEP Encrypted")
    rng := rand.Reader
    plainBytes, err := rsa.DecryptOAEP(sha256.New(), rng, &privKey, data, label)
    CheckError(err)

	return plainBytes
}

func GenerateKeyPair() *rsa.PrivateKey {
	// generate key pair
	keyPair, err := rsa.GenerateKey(rand.Reader, 2048)
	CheckError(err)

	// validate key
	err = keyPair.Validate()
	CheckError(err)
	return keyPair
}

func SaveRsaPriv(fileName string, keyPair *rsa.PrivateKey) {
	// private key stream
	privateKeyBlock := &pem.Block{
		Type:  "PRIVATE KEY",
		Bytes: x509.MarshalPKCS1PrivateKey(keyPair),
	}

	// create file
	f, err := os.Create(fileName)
	CheckError(err)

	err = pem.Encode(f, privateKeyBlock)
	CheckError(err)
}

func SaveRsaPub(fileName string, keyPair *rsa.PrivateKey) {
	// public key stream
	pubKeyBytes, err := x509.MarshalPKIXPublicKey(&keyPair.PublicKey)
	CheckError(err)

	publicKeyBlock := &pem.Block{
		Type:  "PUBLIC KEY",
		Bytes: pubKeyBytes,
	}

	// create file
	f, err := os.Create(fileName)
	CheckError(err)

	err = pem.Encode(f, publicKeyBlock)
	CheckError(err)
}

func GetRsaPriv() *rsa.PrivateKey {
	keyData, err := ioutil.ReadFile("private.pem")
	CheckError(err)

	keyBlock, _ := pem.Decode(keyData)
	if keyBlock == nil {
		log.Printf("ERROR: fail get idrsapub, invalid key")
		return nil
	}

	privateKey, err := x509.ParsePKCS1PrivateKey(keyBlock.Bytes)
	CheckError(err)

	return privateKey
}

func GetRsaPub() *rsa.PublicKey {
	keyData, err := ioutil.ReadFile("public.pem")
	CheckError(err)

	keyBlock, _ := pem.Decode(keyData)
	if keyBlock == nil {
		log.Printf("ERROR: fail get idrsapub, invalid key")
		return nil
	}

	publicKey, err := x509.ParsePKIXPublicKey(keyBlock.Bytes)
	CheckError(err)
	switch publicKey := publicKey.(type) {
	case *rsa.PublicKey:
		return publicKey
	default:
		return nil
	}
}
