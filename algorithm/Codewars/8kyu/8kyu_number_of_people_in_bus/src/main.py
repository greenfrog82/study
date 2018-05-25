def number(bus_stops):
    remain = 0
    for bus_stop in bus_stops:
        remain += (bus_stop[0] - bus_stop[1])
    return remain

print(number([[10, 0], [3, 5], [5, 8]]) == 5)
print(
    number([[3, 0], [9, 1], [4, 10], [12, 2], [6, 1], [7, 10]]) == 17)
print(
    number([[3, 0], [9, 1], [4, 8], [12, 2], [6, 1], [7, 8]]) == 21)
