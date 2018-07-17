# Import math module  
import math  
  
# Define two integer numbers  
x = 4  
y = 4  
  
# If the assertion fails, print this message  
message = "{} is not the square root of {}".format(x, y)  
  
# The condition that we need to assert  
condition = (x == math.sqrt(y))  
  
# Do the assertion  
assert condition, message  