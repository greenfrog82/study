import unittest 

def method_1(inputs, n):
    # Method 1. O(n^2)
    return [(inputs[i], inputs[j]) for i in range(0, len(inputs)) for j in range(i +1, len(inputs)) if n == inputs[i] + inputs[j]]
    
def method_2(inputs, n):
    # Method 2. O(n)    
    dic = {(el if el < n-el else n-el):(el if el > n-el else n-el) for el in inputs if el != n - el and n - el in inputs}
    return [(el, dic[el]) for el in inputs if el in dic]

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
        if find_element is method_1:
            self.assertEqual(ret, [(4, 2), (5 , 1)])
        else:
            self.assertEqual(ret, [(2, 4), (1, 5)])

    def test_9(self):
        ret = find_element(self.inputs, 4)
        self.assertEqual(ret, [(1, 3)])

    def test_10(self):
        ret = find_element(self.inputs, 2)
        self.assertEqual(ret, [])

if __name__ == '__main__':   
    unittest.main()