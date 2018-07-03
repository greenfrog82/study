class Counter:
    def __init__(self, min_range, max_range):
        self.current = min_range
        self.max_range = max_range

    def __iter__(self):
        return self

    # def __next__(self): # For Python3
    def next(self):
        if self.current > self.max_range:
            raise StopIteration
        else:
            self.current += 1
            return self.current - 1


cnt = Counter(0, 5)

for i in cnt:
    print(i)