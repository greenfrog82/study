def perform(codes):    
    def do_count(codes):
        sub_str_cnt = 0
        base_cnt = 0
        base_cnt_ = 0    
        encount_zero = False

        for code in codes:
            if '1' == code:
                if encount_zero:                    
                    base_cnt = 1
                    base_cnt_ = 0
                    encount_zero = False
                else:
                    base_cnt += 1
            else:
                encount_zero = True
                if 1 < base_cnt:
                    base_cnt_ = base_cnt
                if 0 < base_cnt:
                    base_cnt -= 1
                    if 0 == base_cnt:
                        encount_zero = False
                        sub_str_cnt += 1
                        if 1 < base_cnt_:
                            sub_str_cnt += base_cnt_ - 1                        

        if 0 < base_cnt and encount_zero:
            sub_str_cnt += 1

        return sub_str_cnt

    res = do_count(codes)
    codes = codes[::-1]    
    res += do_count(codes)

    return res