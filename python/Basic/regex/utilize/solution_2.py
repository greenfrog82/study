# -*- coding: utf-8 -*-
import re
import unittest

def solution(str_):
    # res = re.search(r'\s*\((.+?)\)|\s*_(.+)|\s*-(.+)', str_)
    # groups = [item for item in res.groups() if item is not None]
    # import pdb; pdb.set_trace()
    return re.sub(r'\s*\((.+?)\)|\s*_(.+)|\s*-(.+)', lambda m: ' ' + [item for item in m.groups() if item is not None][0].strip(), str_)


class TestSolution(unittest.TestCase):
    def test_1(self):
        self.assertEqual(solution(u'BHC치킨(강남논현점)'), u'BHC치킨 강남논현점')
        self.assertEqual(solution(u'BHC 치킨(강남논현 1호점)'), u'BHC 치킨 강남논현 1호점')
        self.assertEqual(solution(u'BHC 치킨    (강남논현 1호점     )'), u'BHC 치킨 강남논현 1호점')
        self.assertEqual(solution(u'BHC치킨((강남논현점))'), u'BHC치킨 (강남논현점)')
        self.assertEqual(solution(u'BHC치킨 강남논현점'), u'BHC치킨 강남논현점')
        self.assertEqual(solution(u'BHC치킨-강남논현점'), u'BHC치킨 강남논현점')

unittest.main()