import re

def strip_url_params(url, params_to_strip = []):
    matched = re.match(r'^.+\?', url, re.M | re.I)
    if not matched:
        return url

    query_string = matched.group()
    it = re.finditer(r'&?(\w+)=.+?', url, re.M | re.I)
    
    for matched in it:
        var_name = matched.groups()[0]
        first_matched_idx = url.find(var_name + '=')
        
        if first_matched_idx < matched.start() or var_name in params_to_strip:
            continue

        query_string += matched.group()

    return query_string[0:-1] if '?' == query_string[-1] else query_string

print('www.codewars.com?a=1&b=2' == strip_url_params('www.codewars.com?a=1&b=2&a=2'))
print('www.codewars.com' == strip_url_params('www.codewars.com?a=1&b=2&a=2', ['a', 'b']))
print('www.codewars.com?a=1' == strip_url_params('www.codewars.com?a=1&b=2&a=2', ['b']))
print('www.codewars.com' == strip_url_params('www.codewars.com', ['b']))