"use strict";
var Person = (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var person = new Person('Leon');
console.log(person.name);
