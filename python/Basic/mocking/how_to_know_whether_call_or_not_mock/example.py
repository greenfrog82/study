import unittest
from mock import patch

def get_value():
    return 100
    
def perform():
    return 10 * get_value()


class TestMock(unittest.TestCase):
    @patch('example.get_value')
    def test_perform(self, mock_get_value):
        mock_get_value.return_value = 1
        import pdb; pdb.set_trace()
        self.assertEqual(perform(), 10)
        # mock_get_value.assert_called()
        

# if __name__ == '__main()__':
#     unittest.main()

unittest.main()
