# -*- coding: utf-8 -*-
import re
import unittest

def method_me(str_):
    res = re.search(r'^(.+?)\((.+)\)', str_)
    if not res:
        return str_

    groups = res.groups()
    return u'{} {}'.format(groups[0].strip(), groups[1].strip())

def method_falsetru(str_):
    return re.sub(r'\s*\((.+?)\)', lambda m: ' ' + m.group(1).strip(), str_)

solution = method_me


class TestSolution(unittest.TestCase):
    def test_1(self):
        self.assertEqual(solution(u'BHC치킨(강남논현점)'), u'BHC치킨 강남논현점')
        self.assertEqual(solution(u'BHC 치킨(강남논현 1호점)'), u'BHC 치킨 강남논현 1호점')
        self.assertEqual(solution(u'BHC 치킨    (강남논현 1호점     )'), u'BHC 치킨 강남논현 1호점')
        self.assertEqual(solution(u'BHC치킨((강남논현점))'), u'BHC치킨 (강남논현점)')
        self.assertEqual(solution(u'BHC치킨 강남논현점'), u'BHC치킨 강남논현점')

unittest.main()