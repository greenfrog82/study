class Dictionary(object):
    def __init__(self, words):
        self.words = words
        
    def findMostSimilar(self, word):
        ret = None
        for i in range(0, len(self.words)):

            base = self.words[i]
            next_idx = 0
            equal_cnt = 0

            for j in range(0, len(base)):
                for k in range(next_idx, len(word)):
                    if base[j] == word[k]:
                        equal_cnt += 1
                        next_idx = k + 1
                        break
            
            if i == 0:
                ret = [base, equal_cnt]
            elif ret[1] < equal_cnt:
                ret[0] = base
                ret[1] = equal_cnt
            elif ret[1] == equal_cnt:
                ret[0] = base if len(ret[0]) > len(base) else ret[0]

        return ret[0]
        
fruits = Dictionary(['cherry', 'pineapple', 'melon', 'strawberry', 'raspberry'])
print fruits.findMostSimilar('strawbery') == 'strawberry'
print fruits.findMostSimilar('berry') == 'cherry'

things = Dictionary(['stars', 'mars', 'wars', 'codec', 'codewars'])
print things.findMostSimilar('coddwars') == 'codewars'

languages = Dictionary(['javascript', 'java', 'ruby', 'php', 'python', 'coffeescript'])
print languages.findMostSimilar('heaven') == 'java'
print languages.findMostSimilar('javascript') == 'javascript'
