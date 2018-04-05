function stripUrlParams(url, paramsToStrip) {
    const splitedUrl = url.split('?');
    if(1 >= splitedUrl.length) {
        return url;
    } else {
        // const matched = /(\w+)\=/g.exec(splitedUrl[1]);
        const reg = new RegExp(/(\w+)\=/, 'g');
        const matched = reg.exec(splitedUrl[1]);
        console.log(matched);
    }
}

console.log('www.codewars.com?a=1&b=2' == stripUrlParams('www.codewars.com?a=1&b=2&a=2'));
console.log('www.codewars.com?a=1' == stripUrlParams('www.codewars.com?a=1&b=2&a=2', ['b']));
console.log('www.codewars.com' == stripUrlParams('www.codewars.com', ['b']));
