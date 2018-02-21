import unittest
from unittest import TestCase
from mock import patch
from a import test_target

class MockTest(TestCase):
    # @patch('b.get_zipcode') # Problem
    @patch('a.get_zipcode') # Solution
    def test(self, mm):
        mm.return_value = ''        
        self.assertEqual(test_target(), '') 

if __name__ == '__main__':
    unittest.main()