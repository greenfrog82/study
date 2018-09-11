import pdb
class TestStatic:
    mark = '[@staticmethod] '

    @classmethod
    def print_msg(cls, msg):
        pdb.set_trace()
        print cls.mark + msg
        print TestStatic.mark


    @staticmethod
    def print_msg(msg):
        pdb.set_trace()
        print TestStatic.mark + msg


    def use_mark(self):
        self.mark = '----> instance vairable'
        print self.mark
        print TestStatic.mark
        print '---------------'

# TestStatic.print_msg('test')
TestStatic.print_msg('classmethod')

# test = TestStatic()
# test.use_mark()

