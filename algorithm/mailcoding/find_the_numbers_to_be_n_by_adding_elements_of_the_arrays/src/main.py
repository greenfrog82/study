import unittest

def find_elements(inputs, n):
    dict = {n-val:val for val in inputs}
    return [(i, dict[i]) for i in inputs if i in dict]
    
class Test(unittest.TestCase):
    def test_1(self):
        self.assertEqual(find_elements([1,2,3,4,5], 3), [(1,2),(2,1)])

    def test_2(self):
        self.assertEqual(find_elements([1,2,3,4,5,6], 6), [(1,5),(2,4),(3,3),(4,2),(5,1)])

    def test_3(self):
        self.assertEqual(find_elements([1,3,4,6], 6), [(3,3)])

    def test_4(self):
        self.assertEqual(find_elements([1,3,4,6], 11), [])


if __name__ == '__main__':
    unittest.main()
