import unittest 

def find_element(inputs, n):
    return [(inputs[i], inputs[j]) for i in range(0, len(inputs)) for j in range(i+1, len(inputs)) if n == inputs[i] + inputs[j]]

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
        
if __name__ == '__main__':
    unittest.main()