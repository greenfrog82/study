class Dictionary(object):
    def __init__(self, words):
        self.words = words
        
    def find_most_similar(self, word):
        ret = {}

        for dic_word in self.words:
            same_ch_idx_list = []
            for i in range(len(dic_word)):
                start_idx = 0 if not same_ch_idx_list else same_ch_idx_list[-1] + 1
                for j in range(start_idx, len(word)):
                    if dic_word[i] == word[j]:
                        if i == j or \
                            (len(dic_word) > i+1 and len(word) > j+1 and dic_word[i+1] == word[j+1]) or \
                            (same_ch_idx_list and same_ch_idx_list[-1] == j - 1):
                            same_ch_idx_list.append(j)
                            break

            modified_cnt = max(len(dic_word), len(word)) - len(same_ch_idx_list)
            
            if not ret or ret['modified_cnt'] > modified_cnt:
                ret['word'] = dic_word
                ret['modified_cnt'] = modified_cnt

        return ret['word']
                        
fruits = Dictionary(['cherry', 'pineapple', 'melon', 'strawberry', 'raspberry'])
print fruits.find_most_similar('strawbery') == 'strawberry'
print fruits.find_most_similar('berry') == 'cherry'

things = Dictionary(['stars', 'mars', 'wars', 'codec', 'codewars'])
print things.find_most_similar('coddwars') == 'codewars'

languages = Dictionary(['javascript', 'java', 'ruby', 'php', 'python', 'coffeescript'])
print languages.find_most_similar('heaven') == 'java'
print languages.find_most_similar('javascript') == 'javascript'
random = Dictionary(['dihhiczkdwiofpr', 'emvquxrvvlvwvsi', 'iroezmixmberfr', 'xrgdgqfrldwk', 'clxmqmiycvidiyr', 'hrwuhmtxxvmygb', 'ggcvrtxrtnafw', 'zqdrhpviqslik', 'fxpvfhfrujjaifr', 'cwhyyzaorpvtnlfr', 'xikoctmrhpvi', 'npyrgrpbdfqhhncdi', 'ntwmwwmicnjvhtt', 'fgtrjakzlnaebxr', 'riyhpvimgaliuxr', 'qifwqgdsijibor', 'cpnqknjyviusknmte', 'afirbipbmkamjzw', 'xffrkbdyjveb', 'ppctybxgtleipb', 'jhjyasikwyufr', 'fxjskybblljqr', 'ljxzjjorwgb', 'sefsknopiffajor', 'znystgvifufptxr', 'psaysnhfrrqgxwik', 'hkldhadcxrjbmkmcdi', 'karpscdigdvucfr', 'lnjhrzfrosinb', 'pdyjrkaylryr', 'iqkyztorburjgiudi', 'dyhxgviphoptak', 'osbednerciaai', 'ucxmdeudiycokfnb', 'kqijoorfkejdcxr', 'hirldidcuzbyb', 'cfvruditwcxr', 'loogviwcojxgvi', 'xuwahveztwoor', 'eglanhfredaykxr', 'mhmkakybpczjbb', 'nnsoamjkrzgldi', 'hwzsemiqxjwfk', 'vkholxrvjwisrk', 'pxyousorusjxxbt', 'ajacizfrgxfumzpvi', 'tklquxrnhfiggb', 'qojfrlhufr', 'jcocndjkyb', 'tdvibqccxr'])
print random.find_most_similar('rkacypviuburk') == 'zqdrhpviqslik'

random = Dictionary(['Gamilas', 'Galman', 'Earth', 'Telezart', 'Gatlantis'])
print random.find_most_similar('Gaslantis') == 'Gatlantis'
