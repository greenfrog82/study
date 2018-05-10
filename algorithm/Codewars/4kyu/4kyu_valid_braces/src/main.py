def validBraces(string):
    matched = {
        ')': '(',
        '}': '{',
        ']': '['
    }

    stack = []

    for item in string:
        matched_item = matched.get(item)
        if matched_item:
            if 0 >= len(stack) or matched_item != stack.pop():
                return False
        else:
            stack.append(item)
    
    return True if 0 >= len(stack) else False

print validBraces('(){}[]') == True
print validBraces('([{}])') == True
print validBraces('(}') == False
print validBraces('[(])') == False
print validBraces('[({})](]') == False
print validBraces('[({})])]') == False
