class Dictionary(object):
    def __init__(self, words):
        self.words = words
        
    def find_most_similar(self, word):
        ret = {}

        def get_modified_cnt(dict_word):
            return len(dic_word) - len(same_ch_idx_list) if len(dic_word) > len(word) else len(word) - len(same_ch_idx_list)

        for dic_word in self.words:
            same_ch_idx_list = []
            tmp = []
            
            for i in range(len(dic_word)):
                if not tmp and not same_ch_idx_list:
                    start_idx = 0
                elif tmp:
                    start_idx = tmp[-1] + 1
                else:
                    start_idx = same_ch_idx_list[-1] + 1

                for j in range(start_idx, len(word)):
                    if dic_word[i] == word[j]:
                        if i == j:
                            same_ch_idx_list.append(j)
                            break
                        elif not same_ch_idx_list or same_ch_idx_list[-1] == j - 1:
                            same_ch_idx_list.append(j)
                            break
                        elif not tmp or tmp[-1] == j - 1:
                            tmp.append(j)
                            break
                    elif 1 < len(tmp):
                        same_ch_idx_list = same_ch_idx_list + tmp
                        tmp = []
                    elif 1 >= len(tmp):
                        tmp = []

            if 1 < len(tmp):
                same_ch_idx_list = same_ch_idx_list + tmp
                        
            if not same_ch_idx_list:
                continue

            # print 'dic_word : %s / same_ch_idx_list : %s / len : %d' % (dic_word, str(same_ch_idx_list), len(same_ch_idx_list))

            # if 'mars' == dic_word:
            #     import pdb; pdb.set_trace()

            if not ret:
                ret['word'] = dic_word
                ret['modified_cnt'] = get_modified_cnt(dic_word)

                # print 'dic_word : %(word)s / modified_cnt : %(modified_cnt)d' % ret

            else:
                modified_cnt = get_modified_cnt(dic_word)
                # print 'dic_word : %s / modified_cnt : %d' % (dic_word, modified_cnt)
                
                if ret['modified_cnt'] > modified_cnt:
                    ret['word'] = dic_word
                    ret['modified_cnt'] = modified_cnt

        # print ret
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
