def strip_url_params(url, params_to_strip = []):
    # &?(\w+)=.+?
    return ''


print('www.codewars.com?a=1&b=2' == strip_url_params('www.codewars.com?a=1&b=2&a=2'))
print('www.codewars.com' == strip_url_params('www.codewars.com?a=1&b=2&a=2', ['a', 'b']))
print('www.codewars.com?a=1' == strip_url_params('www.codewars.com?a=1&b=2&a=2', ['b']))
print('www.codewars.com' == strip_url_params('www.codewars.com', ['b']))
