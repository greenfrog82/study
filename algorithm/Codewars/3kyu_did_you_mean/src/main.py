class Dictionary(object):
    def __init__(self, words):
        self.words = words
        
    def find_most_similar(self, word):
        ret = [None, None]

        for base in self.words:
            next_idx = 0
            equal_words = []
            
            for j in range(0, len(base)):
                for k in range(0, len(word)):
                    if k in equal_words:
                        continue

                    if base[j] == word[k]:
                        equal_words.append(k)
                        break

            equal_cnt = len(equal_words)
            will_be_modified_char_cnt = (len(word) - equal_cnt) + (len(base) - equal_cnt)
            
            if not ret[0] or ret[1] > will_be_modified_char_cnt:
                ret[0] = base
                ret[1] = will_be_modified_char_cnt
                
        print ret
        return ret[0]
        
# fruits = Dictionary(['cherry', 'pineapple', 'melon', 'strawberry', 'raspberry'])
# print fruits.find_most_similar('strawbery') == 'strawberry'
# print fruits.find_most_similar('berry') == 'cherry'

# things = Dictionary(['stars', 'mars', 'wars', 'codec', 'codewars'])
# print things.find_most_similar('coddwars') == 'codewars'

# languages = Dictionary(['javascript', 'java', 'ruby', 'php', 'python', 'coffeescript'])
# print languages.find_most_similar('heaven') == 'java'
# print languages.find_most_similar('javascript') == 'javascript'
random = Dictionary(['dihhiczkdwiofpr', 'emvquxrvvlvwvsi', 'iroezmixmberfr', 'xrgdgqfrldwk', 'clxmqmiycvidiyr', 'hrwuhmtxxvmygb', 'ggcvrtxrtnafw', 'zqdrhpviqslik', 'fxpvfhfrujjaifr', 'cwhyyzaorpvtnlfr', 'xikoctmrhpvi', 'npyrgrpbdfqhhncdi', 'ntwmwwmicnjvhtt', 'fgtrjakzlnaebxr', 'riyhpvimgaliuxr', 'qifwqgdsijibor', 'cpnqknjyviusknmte', 'afirbipbmkamjzw', 'xffrkbdyjveb', 'ppctybxgtleipb', 'jhjyasikwyufr', 'fxjskybblljqr', 'ljxzjjorwgb', 'sefsknopiffajor', 'znystgvifufptxr', 'psaysnhfrrqgxwik', 'hkldhadcxrjbmkmcdi', 'karpscdigdvucfr', 'lnjhrzfrosinb', 'pdyjrkaylryr', 'iqkyztorburjgiudi', 'dyhxgviphoptak', 'osbednerciaai', 'ucxmdeudiycokfnb', 'kqijoorfkejdcxr', 'hirldidcuzbyb', 'cfvruditwcxr', 'loogviwcojxgvi', 'xuwahveztwoor', 'eglanhfredaykxr', 'mhmkakybpczjbb', 'nnsoamjkrzgldi', 'hwzsemiqxjwfk', 'vkholxrvjwisrk', 'pxyousorusjxxbt', 'ajacizfrgxfumzpvi', 'tklquxrnhfiggb', 'qojfrlhufr', 'jcocndjkyb', 'tdvibqccxr'])
print random.find_most_similar('rkacypviuburk') == 'zqdrhpviqslik'

# random = Dictionary(['Gamilas', 'Galman', 'Earth', 'Telezart', 'Gatlantis'])
# print random.find_most_similar('Gaslantis') == 'Gatlantis'
