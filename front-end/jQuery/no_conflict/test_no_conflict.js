e = {}

e.$ = 100;
e.jQuery = 500;

var Jt = e.jQuery
    , Kt = e.$;

e.jQuery = 'jQuery';
e.$ = 'jQuery';


w = 'jQuery'
function perform() {
    
    return w.noConflict = function(t) {
        return e.$ === w && (e.$ = Kt),
        t && e.jQuery === w && (e.jQuery = Jt),
        w
    }
    // ,
    // t || (e.jQuery = e.$ = w),
    // w
}

console.log(perform()(true))
console.log(e)
