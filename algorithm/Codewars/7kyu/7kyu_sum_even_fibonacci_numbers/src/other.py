def SumEvenFibonacci(limit):
    a, b, s = 1, 1, 0
    while a <= limit:
        if not a % 2:
            s += a
        a, b = b, a + b
    return s

print 10 == SumEvenFibonacci(8)
print 0 == SumEvenFibonacci(1)
print 2 == SumEvenFibonacci(2)
print 60696 == SumEvenFibonacci(111111)
print 2 == SumEvenFibonacci(5)
print 2 == SumEvenFibonacci(6)