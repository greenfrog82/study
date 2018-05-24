def rps(p1, p2):
    cases = {'rock': 0, 'paper': 1, 'scissors': 2}
    result = ['Draw!', 'Player 1 won!', 'Player 2 won!']
    return result[cases.get(p1) - cases.get(p2)]

print(rps('rock', 'scissors') == "Player 1 won!")
print(rps('scissors', 'paper') == "Player 1 won!")
print(rps('paper', 'rock') == "Player 1 won!")

print(rps('scissors', 'rock') == "Player 2 won!")
print(rps('paper', 'scissors') == "Player 2 won!")
print(rps('rock', 'paper') == "Player 2 won!")

print(rps('rock', 'rock') == 'Draw!')
print(rps('scissors', 'scissors') == 'Draw!')
print(rps('paper', 'paper') == 'Draw!')
