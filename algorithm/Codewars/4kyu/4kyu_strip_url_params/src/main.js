function stripUrlParams(url, paramsToStrip) {
    const splitedUrl = url.split('?');
    if(1 >= splitedUrl.length) {
        return url;
    } else {
        const set = new Set();
        let queryParam = '';
        const params = splitedUrl[1].split('&');
        params.forEach(param => {
            const varName = param.split('=')[0];
            if(set.has(varName) || ((paramsToStrip)? paramsToStrip.includes(varName): false)) {
                return;
            }
            set.add(varName);
            queryParam += ('' === queryParam)? param: `&${param}`;
        });
        return (queryParam)? `${splitedUrl[0]}?${queryParam}`: splitedUrl[0];
    }
}

console.log('www.codewars.com?a=1&b=2' == stripUrlParams('www.codewars.com?a=1&b=2&a=2'));
console.log('www.codewars.com' == stripUrlParams('www.codewars.com?a=1&b=2&a=2', ['a','b']));
console.log('www.codewars.com?a=1' == stripUrlParams('www.codewars.com?a=1&b=2&a=2', ['b']));
console.log('www.codewars.com' == stripUrlParams('www.codewars.com', ['b']));
