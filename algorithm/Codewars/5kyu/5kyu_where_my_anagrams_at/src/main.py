# def anagrams(word, words): 
#     ret = []
#     for _word in words:
#         if len(word) != len(_word):
#             continue

#         mark = [0] * len(word)
#         for m in range(0, len(word)):
#             base = word[m]
#             for n in range(0, len(_word)):
#                 if not mark[n] and _word[n] == base:
#                     mark[n] = 1
#                     break

#         if not 0 in mark:
#             ret.append(_word)

#     print ret
#     return ret
                        

def anagrams(word, words):
    ret = []
    for _word in words:
        if len(word) != len(_word):
            continue

        mark = [0] * len(word)
        for m in range(0, len(word)):
            base = word[m]
            for n in range(0, len(_word)):
                if not mark[n] and _word[n] == base:
                    mark[n] = 1
                    break

        if not 0 in mark:
            ret.append(_word)

    print ret
    return ret

                        
    
    
print(anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']) == ['aabb', 'bbaa'])
print(anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']) == ['carer', 'racer'])
print(anagrams('laser', ['lazing', 'lazy', 'lacer']) == [])
