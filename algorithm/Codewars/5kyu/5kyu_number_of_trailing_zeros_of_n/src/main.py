import math
import time
import functools

def check_perform_time(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        ret = func(*args, **kwargs)
        print("--- %s seconds ---" % (time.time() - start_time))
        return ret
    return wrapper

@check_perform_time
def zeros(n): 
    p = 5
    cnt = 0

    for k in range(1, pow(p, 5) + 1):
        cnt += n / pow(p, k)

    return cnt

zeros(10000000000)