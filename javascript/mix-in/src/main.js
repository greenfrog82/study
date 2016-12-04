/* jshint -W097 */
/*jslint node: true */
'use strict';

function mixin(receiver, supplier) {
  for(var property in supplier){
    console.log('- ', property);
    if(supplier.hasOwnProperty(property)){
        console.log('Own - ', property);
        receiver[property] = supplier[property];
    }
  }
  return receiver;
}

// class Person {
//   constructor(name) {
//     this.name = name;
//   }
// }

function Person(name) {
  this.name = name;
}

function EventTarget() {

}

EventTarget.prototype.add = function(value) {
  if(!this.hasWonProperty('_repo')) {
    this._repo = [];
  } else {
    this._repo.push(value);
  }
};

// EventTarget.prototype = {
//     constructor : EventTarget,
//
//     addListener : function(type, listener){
//         // 이벤트 리스너를 저장할 배열이 없으면 새로 만든다.
//         if(!this.hasOwnProperty("_listeners")){
//             this._listeners = [];
//         }
//
//         if(typeof this._listeners[type] == "undefined"){
//             this._listeners[type] = [];
//         }
//
//         this._listeners[type].push(listener);
//     },
//
//     fire : function(event){
//         if(!event.target){
//             event.target = this;
//         }
//
//         if(!event.type){  // 거짓스러운 값
//             throw new Error("이벤트 객체에 'type' 프로퍼티가 없습니다.");
//         }
//
//         if(this._listeners && this._listeners[event.type] instanceof Array){
//             var listeners = this._listeners[event.type];
//             for(var i=0, len=listeners.length; i<len; i++){
//                 listeners[i].call(this, event);
//             }
//         }
//     },
//
//     removeListener : function(type, listener){
//         if(this._listeners && this._listeners[type] instanceof Array){
//             var listeners = this._listeners[type];
//             for(var i=0, len=listeners.length; i<len; i++){
//                 if(listeners[i] === listener){
//                     listeners.splice(i, 1);
//                     break;
//                 }
//             }
//         }
//     }
// };

mixin(Person.prototype, new EventTarget());

const person = new Person('greenfrog');

console.log(person instanceof Person);
console.log(person instanceof EventTarget);

console.log(person);



// mixin(Person.prototype, )
