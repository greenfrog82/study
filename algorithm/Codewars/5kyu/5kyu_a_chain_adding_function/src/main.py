import unittest

class IntEx(int):
    def __call__(self, a):
        return IntEx(self + a)

def add(n):
    return IntEx(n)

class Test(unittest.TestCase):
    def test_add_1(self):
        self.assertEqual(add(1), 1)

    def test_add_1_2(self):
        self.assertEqual(add(1)(2), 3)
    
    def test_add_1_2_3(self):
        self.assertEqual(add(1)(2)(3), 6)
    
if __name__ == '__main__':
    unittest.main()
