def swap(data, i, j):
    data[i], data[j] = data[j], data[i]

def split(data, l_offset, r_offset):
    pivot_idx = l_offset
    pivot_val = data[pivot_idx]

    while l_offset < r_offset:
        while l_offset <= r_offset and data[l_offset] <= pivot_val:
            l_offset += 1
        while l_offset <= r_offset and data[r_offset] >= pivot_val:
            r_offset -= 1

        if l_offset <= r_offset:
            swap(data, l_offset, r_offset)
            l_offset += 1
            r_offset -= 1
    
    swap(data, pivot_idx, r_offset)
    return r_offset

def q_sort(data):
    def _qsort(data, l_offset, r_offset):
        if l_offset < r_offset:
            split_pos = split(data, l_offset, r_offset)
            _qsort(data, l_offset, split_pos - 1)
            _qsort(data, split_pos + 1, r_offset)

    _qsort(data, 0, len(data) - 1)

data = [3, 7, 8, 2, 1, 9, 5, 4, 6]
q_sort(data)
print([1,2,3,4,5,6,7,8,9] == data)