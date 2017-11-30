import unittest2 as unittest
from resolve import perform
# from bback import perform

class TestAlgorithm(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(perform('101011'), 4)

    def test_case_2(self):
        self.assertEqual(perform('11001'), 3)

    def test_case_3(self):
        self.assertEqual(perform('10001'), 2)

    def test_case_4(self):
        self.assertEqual(perform('11110'), 1)

    def test_case_5(self):
        self.assertEqual(perform('10000'), 1)

    def test_case_6(self):
        self.assertEqual(perform('00000'), 0)

    def test_case_7(self):
        self.assertEqual(perform('11111'), 0)

    def test_case_7(self):
        self.assertEqual(perform('01110'), 2)

    def test_case_8(self):
        self.assertEqual(perform('1110101010100001111'), 13)



if __name__ == "__main__":
    unittest.main()
