def fib(n):        
    def _fib(n): 
        if n == 0:
            return (0, 1)
        else:
            a, b = _fib(n // 2)
            c = a * (b * 2 - a)
            d = a * a + b * b
            if n % 2 == 0:
                return (c, d)
            else:
                return (d, c + d)
    
    ret = _fib(n if n > 0 else n * -1)[0]
    return ret if n > 0 else ret * -1 if 0 == n % 2 else ret

print fib(0) == 0
print fib(1) == 1
print fib(2) == 1
print fib(3) == 2
print fib(4) == 3
print fib(5) == 5
print fib(0) == 0
print fib(-1) == 1
print fib(-2) == -1
print fib(-3) == 2
print fib(-4) == -3
print fib(-5) == 5