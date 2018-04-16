class Dictionary(object):
    def __init__(self, words):
        self.words = words
        
        
    def findMostSimilar(self, word):
        words = []
        for item in self.words:
            words.append(''.join(sorted(item)))

        word = ''.join(sorted(word))

        ret = [self.words[0], 0]
        for i in range(0, len(words)):
            base = words[i]
            compare_idx = 0
            for j in range(0, len(base)):
                for k range(compare_idx, len(word)):
                    if base[j] == 
                    
                    
                
                
            

        
# fruits = Dictionary(['cherry', 'pineapple', 'melon', 'strawberry', 'raspberry']);
# print fruits.findMostSimilar('strawbery') == 'strawberry'
# print fruits.findMostSimilar('berry') == 'cherry'


