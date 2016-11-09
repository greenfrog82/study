function chained(functions) {
  return function(arg) {

    var recvFunc = function(arg) {
      if(0 >= functions.length) {
        return arg;
      }
      return recvFunc(functions.shift()(arg));
    };
    return recvFunc(arg);
  };
}

function f1(x){ console.log('1'); return x*2; }
function f2(x){ console.log('2'); return x+2; }
function f3(x){ console.log('3'); return Math.pow(x,2); }

function f4(x){ console.log('4'); return x.split("").concat().reverse().join("").split(" ");}
function f5(xs){ console.log('5');  return xs.concat().reverse(); }
function f6(xs){ console.log('6'); return xs.join("_"); }

// console.log('chained([f1,f2,f3])(0) is 4', chained([f1,f2,f3])(0));
// console.log('chained([f1,f2,f3])(2) is 36', chained([f1,f2,f3])(2));
// console.log('chained([f3,f2,f1])(2) is 12', chained([f3,f2,f1])(2));
// console.log('chained([f4,f5,f6])("lorem ipsum") is merol_muspi', chained([f4, f5, f6])('lorem ipsum'));
// console.log('chained([f4,f5,f6])("LOREM IPSUM") is MEROL_MUSPI', chained([f4, f5, f6])('LOREM IPSUM'));


var arg = 'h43eei22v6dtf4oyldi';
var expected = 'h43eei22v6dtf4oyldi';

console.log('arg[0] : ' + arg[0]);


function pf1(s){ console.log(1); return s.toUpperCase();}
function pf2(s){ console.log(2); return s.toUpperCase();}
function pf3(s){ console.log(3); return s[0].toUpperCase() + s.substring(1).toLowerCase();}
function pf4(s){ console.log(4); return s.split("");}
function pf5(s){ console.log(5); return s.join("");}

console.log('chained([pf1, pf2, pf3, pf4, pf5])', chained([pf1, pf2, pf3, pf4, pf5])(arg));
