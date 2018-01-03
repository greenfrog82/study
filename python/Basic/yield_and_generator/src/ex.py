# def gen_num():
#     print '--- 1'
#     for i in range(5,10):
#         print '--- 2'
#         yield i

# numbers = [1, 2, 3, 4]
# numbers.extend(gen_num())

# print numbers


numbers = (i for i in range(1,5))
for num in numbers:
    print num

for num in numbers:
    print num