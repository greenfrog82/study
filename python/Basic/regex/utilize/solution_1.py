# -*- coding: utf-8 -*-
import re
import unittest

def solution(str_):
    res = re.search(r'^(.+)\((.+)\)', str_)
    groups = res.groups()
    
    return u'{} {}'.format(groups[0].strip(), groups[1].strip())

class TestSolution(unittest.TestCase):
    @unittest.skip('tmp')
    def test_1(self):
        self.assertEqual(solution(u'BHC치킨(강남논현점)'), u'BHC치킨 강남논현점')
        self.assertEqual(solution(u'BHC 치킨(강남논현 1호점)'), u'BHC 치킨 강남논현 1호점')
        self.assertEqual(solution(u'BHC 치킨    (강남논현 1호점     )'), u'BHC 치킨 강남논현 1호점')
        self.assertEqual(solution(u'BHC치킨((강남논현점))'), u'BHC치킨 (강남논현점)')

unittest.main()