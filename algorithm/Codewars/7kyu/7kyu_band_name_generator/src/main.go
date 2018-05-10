package main

import (
	"fmt"
	"unicode"
	"regexp"
)

func bandNameGenerator(word string) string {
	if word[0] == word[len(word) -1] {
		firstCharUpperCase := unicode.ToUpper(rune(word[0]))
		withoutFirstChar := word[1:len(word)]

		return fmt.Sprintf("%c%s%s", firstCharUpperCase, withoutFirstChar, withoutFirstChar)
	} else {
		re_sep := regexp.MustCompile("\\W+")
		re_word := regexp.MustCompile("\\w+")

		seps := re_sep.FindAllString(word, -1)
		words := re_word.FindAllString(word, -1)

		newWord := "The "

		for i, _word := range words {
			firstCharUpperCase := unicode.ToUpper(rune(_word[0]))
			withoutFirstChar := _word[1:len(_word)]

			newWord += fmt.Sprintf("%c%s", firstCharUpperCase, withoutFirstChar)

			if i < len(seps) {
				newWord += seps[i]
			}
		}

		return newWord
	}
}

func main() {
	fmt.Println("The Dolphin" == bandNameGenerator("dolphin"))
	fmt.Println("Alaskalaska" == bandNameGenerator("alaska"))	
	fmt.Println("The Step-Daughter" == bandNameGenerator("step-daughter"))
}