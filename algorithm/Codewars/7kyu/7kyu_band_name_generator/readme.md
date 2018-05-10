# [Band name generator](https://www.codewars.com/kata/band-name-generator)

My friend wants a new band name for her band. She like bands that use the formula: "The" + a noun with the first letter capitalized, for example:

>"dolphin" -> "The Dolphin"

However, when a noun STARTS and ENDS with the same letter, she likes to repeat the noun twice and connect them together with the first and last letter, combined into one word (WITHOUT "The" in front), like this:

>"alaska" -> "Alaskalaska"

Complete the function that takes a noun as a string, and returns her preferred band name written as a string.

## My Solution

```go
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
```

## Other Solution

```go
package main

import (
	"fmt"
	"strings"
)

func bandNameGenerator(word string) string {
	if word[0] == word[len(word) - 1] {
		return strings.Title(word + word[1:])
	} else {
		return strings.Title("The " + word)
	}
}
```

