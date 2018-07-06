class TestStatic:
    mark = '[@staticmethod] '

    @staticmethod
    def print_msg(msg):
        print TestStatic.mark + msg

    @classmethod
    def print_msg(cls, msg):
        print cls.mark + msg
        print TestStatic.mark


    def use_mark(self):
        self.mark = '----> instance vairable'
        print self.mark
        print TestStatic.mark
        print '---------------'

# TestStatic.print_msg('test')
TestStatic.print_msg('classmethod')

# test = TestStatic()
# test.use_mark()
