package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"html/template"
	"io/ioutil"
	"os"
)

var (
	j    = flag.String("json", "", "json string")
	path = flag.String("path", "", "html path")
	out  = flag.String("out", "", "out path,plz contain the file suffix like .html")
)

func main() {
	flag.Parse()

	jf, err := os.Open(*j)
	if err != nil {
		fmt.Println("os.Open failed,err=", err)
		return
	}
	defer jf.Close()
	byteValue, err := ioutil.ReadAll(jf)
	if err != nil {
		fmt.Println("ioutil.ReadAll failed,err=", err)
		return
	}
	var result map[string]interface{}
	err = json.Unmarshal(byteValue, &result)
	if err != nil {
		fmt.Println("json.Unmarshal failed,err=", err)
		return
	}

	html, err := template.ParseFiles(*path)
	if err != nil {
		fmt.Println("template.ParseFiles failed,err=", err)
		return
	}
	var tpl bytes.Buffer
	err = html.Execute(&tpl, result)
	if err != nil {
		fmt.Println("tpl.Execute failed,err=", err)
		return
	}
	f, err := os.Create(*out)
	if err != nil {
		fmt.Println("os.Create failed,err=", err)
		return
	}
	f.Write(tpl.Bytes())
	f.Close()
}