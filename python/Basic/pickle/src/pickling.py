import pickle

numbers = [1, 2, 3, 4, 5]

afile = open('sample.pkl', 'wb')
pickle.dump(numbers, afile)
afile.close()