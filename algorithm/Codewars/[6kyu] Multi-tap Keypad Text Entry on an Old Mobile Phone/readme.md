# [6kyu] Multi-tap Keypad Text Entry on an Old Mobile Phone

### Description

Prior to having fancy iPhones, teenagers would wear out their thumbs sending SMS messages on candybar-shaped feature phones with 3x4 numeric keypads.

------- ------- -------
|     | | ABC | | DEF |
|  1  | |  2  | |  3  |
------- ------- -------
------- ------- -------
| GHI | | JKL | | MNO |
|  4  | |  5  | |  6  |
------- ------- -------
------- ------- -------
|PQRS | | TUV | | WXYZ|
|  7  | |  8  | |  9  |
------- ------- -------
------- ------- -------
|     | |space| |     |
|  *  | |  0  | |  #  |
------- ------- -------
Prior to the development of T9 (predictive text entry) systems, the method to type words was called "multi-tap" and involved pressing a button repeatedly to cycle through the possible values.

For example, to type a letter "R" you would press the 7 key three times (as the screen display for the current character cycles through P->Q->R->S->7). A character is "locked in" once the user presses a different key or pauses for a short period of time (thus, no extra button presses are required beyond what is needed for each letter individually). The zero key handles spaces, with one press of the key producing a space and two presses producing a zero.

In order to send the message "WHERE DO U WANT 2 MEET L8R" a teen would have to actually do 47 button presses. No wonder they abbreviated.

For this assignment, write a module that can calculate the amount of button presses required for any phrase. Punctuation can be ignored for this exercise. Likewise, you can assume the phone doesn't distinguish between upper/lowercase characters (but you should allow your module to accept input in either for convenience).

Hint: While it wouldn't take too long to hard code the amount of keypresses for all 26 letters by hand, try to avoid doing so! (Imagine you work at a phone manufacturer who might be testing out different keyboard layouts, and you want to be able to test new ones rapidly.)

### My Solution

```javascript
function presses(phrase) {
  var count = 0;

  if(0 === phrase.length) {
    return count;
  }

  phrase = phrase.toLowerCase();

  for (var i = 0; i < phrase.length; i++) {
    var asciiCode = phrase[i].charCodeAt(0);

    if('0'.charCodeAt(0) === asciiCode) {
      count += 2;
    } else if('1'.charCodeAt(0) === asciiCode || ' '.charCodeAt(0) === asciiCode) {
      count += 1;
    } else if('2'.charCodeAt(0) <= asciiCode && '6'.charCodeAt(0) >= asciiCode || '8'.charCodeAt(0) === asciiCode) {
      count += 4;
    } else if('7'.charCodeAt(0) === asciiCode || '9'.charCodeAt(0) === asciiCode) {
      count += 5;
    } else if ('a'.charCodeAt(0) <= asciiCode && 'o'.charCodeAt(0) >= asciiCode) { // alphabet
      count += (asciiCode - 'a'.charCodeAt(0)) % 3 + 1;
    } else if('p'.charCodeAt(0) <= asciiCode && 's'.charCodeAt(0) >= asciiCode) {
      count += (asciiCode - 'p'.charCodeAt(0)) % 4 + 1;
    } else if('t'.charCodeAt(0) <= asciiCode && 'v'.charCodeAt(0) >= asciiCode) {
      count += (asciiCode - 't'.charCodeAt(0)) % 3 + 1;
    } else if('w'.charCodeAt(0) <= asciiCode && 'z'.charCodeAt(0) >= asciiCode) {
      count += (asciiCode - 'w'.charCodeAt(0)) % 4 + 1;
    } else {
      //  Punctuation can be ignored for this exercise.
      console.log(asciiCode);
    }
  }
  return count;
}
```

### Others Solutions

```javascript
function presses(phrase) {
  var chunks = ['1', 'ABC2', 'DEF3', 'GHI4', 'JKL5', 'MNO6', 'PQRS7', 'TUV8', 'WXYZ9', ' 0'],
      phrase = phrase.toUpperCase().split(''),
      total = 0;

  phrase.forEach(function(l) {
    var key = chunks.filter(function(c) {
      return c.indexOf(l) > -1;
    })[0];
    total += key.indexOf(l) + 1;
  });

  return total;

}
```

```javascript
function presses(phrase) {
  var sumpress = 0;
  for (var i = 0; i < phrase.length; i++)
  {
    switch (true)
    {
      case (/[1adgjmptw\s]/i.test(phrase[i])):
        sumpress++;
        break;
      case (/[behknqux0]/i.test(phrase[i])):
        sumpress += 2;
        break;
      case (/[cfilorvy]/i.test(phrase[i])):
        sumpress += 3;
        break;
      case (/[sz234568]/i.test(phrase[i])):
        sumpress += 4;
        break;
      case (/[79]/.test(phrase[i])):
        sumpress += 5;
        break;
      default:
        sumpress++;
        break;
    }
  }
  return sumpress;
}
```
