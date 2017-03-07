import pickle

afile = open('sample.pkl', 'rb')
numbers = pickle.load(afile)
afile.close()

for number in numbers:
    print(number)