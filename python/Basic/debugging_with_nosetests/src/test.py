import unittest


class TestUsingPdbWithNosetests(unittest.TestCase):
    def test_pdb(self):
        import pdb; pdb.set_trace()
        print 'test'


if __name__ == '__main__':
    unittest.main()
