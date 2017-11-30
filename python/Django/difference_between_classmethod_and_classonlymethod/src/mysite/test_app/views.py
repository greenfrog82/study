# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from django.utils.decorators import classonlymethod

# class Test():
#     msg = 'Hello, world'
#
#     @staticmethod
#     def get_msg_by_static():
#         # return '[static] Hello, world'
#         return '[static] ' + msg
#
#     @classmethod
#     def get_msg_by_class(cls):
#         return '[class] Hello, world'
#
#     @classonlymethod
#     def get_msg_by_classonlymethod(cls):
#         # return '[classonly] Hello, world'
#         return '[classonly] ' + cls.msg
#
#     def get_msg_by_classonlymethod_internally(self):
#         # return self.get_msg_by_classonlymethod()
#         # return self.get_msg_by_class()
#         # return self.get_msg_by_static()
#         return Test.get_msg_by_static()

class Adder():
    count = 0

    # def __init__(self):
    #     print 'init'
    #     self.count = 0

    @classonlymethod
    def perform_by_classonlymethod(cls):
        return cls.count

    @classmethod
    def perform(self):
        self.count += 1
        return self.count




# Create your views here.
def index(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    # return HttpResponse(Test.get_msg_by_static())
    # return HttpResponse(Test.get_msg_by_classonlymethod())
    # return HttpResponse(Test.get_msg_by_class())
    # obj_test = Test()
    # return HttpResponse(obj_test.get_msg_by_static())
    # return HttpResponse(obj_test.get_msg_by_class())
    # AttributeError: This method is available only on the class, not on instances.
    # return HttpResponse(obj_test.get_msg_by_classonlymethod())
    # return HttpResponse(obj_test.get_msg_by_classonlymethod_internally())
    # return HttpResponse(Test.get_msg_by_classonlymethod())

    obj_adder = Adder()
    print obj_adder.count
    obj_adder.perform()
    print obj_adder.count

    return HttpResponse(Adder.perform_by_classonlymethod())
