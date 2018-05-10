def encode(inp):
    final = ''

    tmp = inp[0]
    cnt = 1
    for ch in inp[1:]:
        if ch != tmp:
            final += '%s%d' % (tmp, cnt)
            tmp = ch
            cnt = 1
        else:
            cnt += 1

    final += '%s%d' % (tmp, cnt)
    return final