def SumEvenFibonacci(limit):
    sum_even_fibo = fibo_num = 0
    first, second = 0, 1

    while(fibo_num < limit):
        fibo_num = first + second
        if not fibo_num % 2 and fibo_num <= limit:
            sum_even_fibo = sum_even_fibo + fibo_num
        first, second = second, fibo_num
    
    return sum_even_fibo

print 10 == SumEvenFibonacci(8)
print 0 == SumEvenFibonacci(1)
print 2 == SumEvenFibonacci(2)
print 60696 == SumEvenFibonacci(111111)
print 2 == SumEvenFibonacci(5)
print 2 == SumEvenFibonacci(6)
