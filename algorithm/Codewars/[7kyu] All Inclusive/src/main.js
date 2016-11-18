/* jshint -W097 */
/*jslint node: true */
'use strict';

function containAllRots(string, arr) {
    if('' === string || 0 >= arr.legnth) {
      return true;
    }

    let matchCount = 0;
    for(let i=0; i<string.length; i++) {
      const base = string.substring(0, string.length - 1);
      string = string[string.length - 1].concat(base);

      if(-1 < arr.indexOf(string)) {
        matchCount++;
      }
    }

    return matchCount === string.length;
}

console.log('containAllRots("bsjq", ["bsjq", "qbsj", "sjqb", "twZNsslC", "jqbs"]) is true >', containAllRots("bsjq", ["bsjq", "qbsj", "sjqb", "twZNsslC", "jqbs"]));
console.log('containAllRots("Ajylvpy", ["Ajylvpy", "ylvpyAj", "jylvpyA", "lvpyAjy", "pyAjylv", "vpyAjyl", "ipywee"]) is false >', containAllRots("Ajylvpy", ["Ajylvpy", "ylvpyAj", "jylvpyA", "lvpyAjy", "pyAjylv", "vpyAjyl", "ipywee"]));
