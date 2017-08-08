class TestStatic:
    mark = '[@staticmethod] '

    @staticmethod
    def print_msg(msg):
        print TestStatic.mark + msg

    def use_mark(self):
        self.mark = '----> instance vairable'
        print self.mark
        print TestStatic.mark

TestStatic.print_msg('test')

test = TestStatic()
test.use_mark()
