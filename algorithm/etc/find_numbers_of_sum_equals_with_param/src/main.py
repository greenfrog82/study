import unittest 

def method_1(inputs, n):
    # Method 1. O(n^2)
    # return [(inputs[i], inputs[j]) for i in range(0, len(inputs)) for j in range(i +1, len(inputs)) if n == inputs[i] + inputs[j]]
    return [(i_val, j_val) for i, i_val in enumerate(inputs) for _, j_val in enumerate(inputs, i+1) if n == i_val + j_val]
    
def method_2(inputs, n):
    # Method 2. O(n)    
    # return [(inputs[i], n - inputs[i]) for i in range(0, len(inputs)) if n - inputs[i] <= inputs[len(inputs) - 1]][:int(len(inputs)/2)]
    lst = [(element, n - element) for element in inputs if n - element in inputs]
    return lst[:int(len(lst)/2)]

find_element = method_1

class Test(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.inputs = [1, 2, 3, 4, 5]

    def test_1(self):
        ret = find_element(self.inputs, 5)
        self.assertEqual(ret, [(1, 4), (2, 3)])

    def test_2(self):
        ret = find_element(self.inputs, 6)
        self.assertEqual(ret, [(1, 5), (2, 4)])

    def test_3(self):
        ret = find_element(self.inputs, 7)
        self.assertEqual(ret, [(2, 5), (3, 4)])

    def test_4(self):
        ret = find_element(self.inputs, 8)
        self.assertEqual(ret, [(3, 5)])

    def test_5(self):
        ret = find_element(self.inputs, 2)
        self.assertEqual(ret, [])

    def test_6(self):
        ret = find_element([1, 2, 4, 10], 6)
        self.assertEqual(ret, [(2, 4)])

    def test_7(self):
        ret = find_element([1, 2, 4, 10, 5], 6)
        self.assertEqual(ret, [(1, 5), (2, 4)])

    def test_8(self):
        ret = find_element([3, 4, 2, 10, 5, 1], 6)
        self.assertEqual(ret, [(4, 2), (5, 1)])

    def test_9(self):
        ret = find_element(self.inputs, 4)
        self.assertEqual(ret, [(1, 3)])

    def test_10(self):
        ret = find_element(self.inputs, 2)
        self.assertEqual(ret, [])

if __name__ == '__main__':   
    unittest.main()

# for i,v in enumerate([1, 2, 3, 4], 1):
#     print('[%d] = %d' % (i, v))