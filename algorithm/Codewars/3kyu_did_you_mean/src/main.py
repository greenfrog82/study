class Dictionary(object):
    def __init__(self, words):
        self.words = words
        
        
    def findMostSimilar(self, word):
        words = []
        for item in self.words:
            words.append(''.join(sorted(item)))

        word = ''.join(sorted(word))
        
        similar = None

        for i in range(0, len(words)):
            base = words[i]
            for j in range(0, len(base) if len(base) < len(word) else len(word)):
                if word[j] == base[j]:
                    

        print similar
        return similar[0]

fruits = Dictionary(['cherry', 'pineapple', 'melon', 'strawberry', 'raspberry']);
print fruits.findMostSimilar('strawbery') == 'strawberry'
print fruits.findMostSimilar('berry') == 'cherry'
