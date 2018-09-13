class Person(object):
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

    @classmethod
    def from_string(cls, name_str):
        first_name, last_name = map(str, name_str.split(' '))
        return cls(first_name, last_name)

    # @staticmethod
    # def create_inst(name_str):
    #     first_name, last_name = map(str, name_str.split(' '))
    #     return Student(first_name, last_name)

    def __str__(self):
        return '[Person] ' + self.first_name + ' ' + self.last_name

class Student(Person):
    def __init__(self, first_name, last_name):
        super(Student, self).__init__(first_name, last_name) 

    def __str__(self):
        return '[Student] ' + self.first_name + ' ' + self.last_name

print(Person.from_string('cho jaeyoung'))
print(Student.from_string('cho jaeyoung'))
# print(Student.create_inst('cho jaeyoung'))



