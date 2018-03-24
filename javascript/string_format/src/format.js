String.prototype.format = function() {
    let tmp = this;
    for(let idx=0; idx<arguments.length; idx++) {
        tmp = tmp.replace(new RegExp(`\\{${idx}\\}`, 'g'), arguments[idx]);

    }
    return tmp;
}

console.log('{0}/{1}/{0}'.format('app', 'resource'));