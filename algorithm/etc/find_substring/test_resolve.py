import unittest2 as unittest
from resolve import perform

class TestMproxyAdmin(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(perform('101011'), 3)

    def test_case_2(self):
        self.assertEqual(perform('11001'), 3)

    def test_case_3(self):
        self.assertEqual(perform('10001'), 2)        

    def test_case_4(self):
        self.assertEqual(perform('11110'), 1)        
        



if __name__ == "__main__":
    unittest.main()