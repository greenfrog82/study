import sys, math

ret = math.fabs(1.1*1.1-1.21) <= sys.float_info.epsilon
print(ret)