e = {}

e.$ = 100;
e.jQuery = 500;

function perform() {
    var Jt = e.jQuery
    , Kt = e.$;

    var w = 'jQuery'
    e.jQuery = e.$ = w
    return w.noConflict = function(t) {
        return e.$ === w && (e.$ = Kt),
        t && e.jQuery === w && (e.jQuery = Jt),
        w
    }
}

// console.log(perform());
console.log(perform()())
console.log(e)
// console.log(perform()(true))
// console.log(e)
