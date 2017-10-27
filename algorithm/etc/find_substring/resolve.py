def perform(codes):    
    cur = codes[0]    
    idx = 1
    res = 0
    cnt = base_cnt = 1

    def calc_res(base_cnt, cnt, res):
        if base_cnt >= cnt:
            if 0 >= cnt:
                res += base_cnt
            else:
                res += base_cnt - cnt
        
        return res

    while idx < len(codes):        
        if cur == codes[idx]:
            cnt += 1
            base_cnt = cnt
        else:
            cnt -= 1

            if idx + 1 >= len(codes):
                res = calc_res(base_cnt, cnt, res)

            elif idx + 1 < len(codes) and cur == codes[idx + 1]:
                res = calc_res(base_cnt, cnt, res)

                cnt = 0
                    
                cur = codes[idx]
                idx -= 1

        idx += 1

    return res