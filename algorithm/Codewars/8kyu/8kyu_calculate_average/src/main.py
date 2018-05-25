def find_average(arr):
    return sum(arr) / len(arr) if arr else 0

array = [1, 2, 3]
print(find_average(array) == 2)
