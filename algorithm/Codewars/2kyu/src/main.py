from random import random

import unittest
import re

solution = ''

for num in range(0,101):
    if not num % 7:
        print(bin(num)[2:] + ' : ' + str(num))

class Test(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(isinstance(solution, str), True, 'your solution is not a string')

    def test_case_2(self):
        rgx = re.compile(solution)
        for num in range(0,101):
            print('Testing for: ' + str(num))
            self.assertEqual(bool(rgx.match(bin(num)[2:])), num%7 == 0)
    
if __name__ == '__main__':
    unittest.main()
