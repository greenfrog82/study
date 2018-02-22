import unittest
from mock import patch
from b import test_target

class MockTest(unittest.TestCase):
    @patch('a.get_zipcode') # Problem
    # @patch('b.get_zipcode') # Solution
    def test(self, mm):
        mm.return_value = ''        
        self.assertEqual(test_target(), '') 

if __name__ == '__main__':
    unittest.main()