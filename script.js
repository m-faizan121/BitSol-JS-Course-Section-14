'use strict';

///////////////////// Object Oriented Programming

// Constructor Function
// Diff from normal function because is always calls with 'new' keyword
const Person = function(name, age) {
    console.log(this); // Person {}
    // Instance properties
    this.name = name;
    this.age = age;
    console.log(this); // Person {name: 'Faizan', age: 22}
};
const faizan = new Person('Faizan', 22);
// This upper line perform 2 steps:
    // 1. New empty object {} is created
    // 2. Object {} linked to prototype
    // 3. Function automatically return {}

console.log(faizan instanceof Person); // true

// Prototypes
// As we dont create method inside constructor because for n instances, we have to carry n copies of that function
// which is not good, so we defined that method in prototype
// All the instances created using Constructor can access prototype property of that object

console.log(Person.prototype);
// To add a method in prototype
Person.prototype.showAge = function() {
    console.log("Age is " + this.age);
};
faizan.showAge();

// This is benifit because this method is not inside instance, it is only inside prototype
console.log(faizan); // It only has two members declare inside constructor, as Person {name: 'Faizan', age: 22}

// To look the prototype of instance
console.log(faizan.__proto__); // {showAge: ƒ, constructor: ƒ}
console.log(faizan.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(faizan)); // true

// Also we can add properties/attributes to prototypes
Person.prototype.gender = 'Male';
console.log(faizan.gender);
faizan.gender = 'male';
console.log(faizan.gender);

// Prototype Chain
// The root object of every object is Object.protoype conatains different methods
console.log(faizan.__proto__); // Prototype of Person
console.log(faizan.__proto__.__proto__); // Prototype of Object
console.log(faizan.__proto__.__proto__.__proto__); // null

// Built-in objects such as Arrays also has own prototypes

// ES6 Classes
class Developer {
    constructor(name, post, company) {
        this.name = name;
        this.post = post;
        this.company = company;
    }
    // Any method outside constructor will be added to its prototype
    show() {
        console.log(`My name is ${this.name} and I am a ${this.post} Developer at ${this.company}`);
    }
} 
let dev1 = new Developer('Faizan', 'Web', 'BitSol');
dev1.show(); // My name is Faizan and I am a Web Developer at BitSol
console.log(dev1); // Developer {name: 'Faizan', post: 'Web', company: 'BitSol'}
console.log(dev1.__proto__); // {constructor: ƒ, show: ƒ}

// Important points about ES6 classes in JS
// 1) Classes are not hoisted unlike functions (means we cant use classes before declaration)
// 2) Classes are first class citizes (means classes are just special functions behind and we can pass/return from functions)
// 3) Classes are executed in strict mode

// Setters and Gettes
class Car {
    constructor(company, model, price) {
        this.company = company;
        this.model = model;
        this.price = price;
    }
    // Any method outside constructor will be added to its prototype
    show() {
        console.log(`This car is made by ${this.company} of Model ${this.model} having Price Rs. ${this.price}`);
    }
    // Setter
    set setPrice(price) {
        this.price = price;
    }
    // Getter
    get getPrice() {
        return this.price;
    }
} 

let honda = new Car('Honda', 2022, 55000);
honda.show(); // This car is made by Honda of Model 2022 having Price Rs. 55000
console.log('Old Price is Rs. ' + honda.getPrice);
honda.setPrice = 60000;
console.log('New Price is Rs. ' + honda.getPrice);

// Static Methods
// They are not associated with instances because they are not declared in prototypes
// Thet are attached with constructors and can be accessed using class names

// Setters and Gettes
class Student {
    constructor(name, cgpa) {
        this.name = name;
        this.cgpa = cgpa;
    }
    // Any method outside constructor will be added to its prototype
    show() {
        console.log(`I am ${this.name} having CGPA of ${this.cgpa}`);
    }
    static showUniversity() {
        console.log("I am studying in QAU");
    }
} 
let ali = new Student('Ali', 3.8);
ali.show(); // I am Ali having CGPA of 3.8
// ali.showUniversity(); // Error
Student.showUniversity(); // I am studying in QAU

// Object.create
// Use to create a new object with prototype of another Object
const Laptop = {
    show(){
        console.log("This is " + this.brand + " Laptop with " + this.generation + "th Generation");
    }
};
const hp = Object.create(Laptop);
console.log(hp); // {} empty object with prototype of Laptop
console.log(hp.__proto__); //{show: ƒ}
hp.show(); // This is undefined Laptop with undefined
// Defining properties
hp.brand = "HP";
hp.generation = 11;
hp.show(); // This is undefined Laptop with undefined

// Inheritance using Constructor Function

// Parent class constructor
const Animal = function(color) {
    this.color = color;
}
// Child class constructor
const Dog = function(color, owner) {
    Animal.call(this, color);
    this.owner = owner;
}
// Adding a method to Dog prototype
Dog.prototype.show = function() {
    console.log(`This ${this.color} color Dog belongs to Mr. ${this.owner}`);
}
const dog = new Dog('White', 'Zain');
dog.show(); // This White color Dog belongs to Mr. Zain

console.log(Animal.prototype); // {constructor: ƒ}
console.log(Dog.prototype); // {show: ƒ, constructor: ƒ}

// Inheritance using ES6 classes
class Book {
    constructor(ISBN, title) {
        this.ISBN = ISBN;
        this.title = title;
    }
    show() {
        console.log(this.ISBN, this.title);
    }
}
class JAVABook extends Book {
    constructor(ISBN, title, topic) {
        super(ISBN, title);
        this.topic = topic;
    }
    show() {
        super.show();
        console.log(this.topic);
    }
}
// Instance
const java = new JAVABook('BK101', 'Java Programming', 'Coding');
java.show();

// Inheritance using Object.create
const Vehicle = {
    get getModel() {
        return this.model;
    }
    ,
    get getPrice() {
        return this.price;
    }
    ,
    get getColor() {
        return this.color;
    }
    ,
    init(model, price, color) {
        this.model = model;
        this.price = price;
        this.color = color;
    }
};

const Honda = Object.create(Vehicle);
Honda.init = function(model, price, color, ac) {
    Vehicle.init.call(this, model, price, color);
    this.ac = ac;
};
Honda.show = function(){
    console.log(this.getModel, this.getPrice, this.getColor, this.ac);
}

const hondaCar = Object.create(Honda);
console.log(hondaCar);
hondaCar.init(2022, 50000, "Red", true);
hondaCar.show();
console.log(hondaCar);

// 1) _ is use to make member Protected
// 2) # is used to make member Private
class Bottle {
    #liters = 0;
    constructor(made, liters) {
        this._made = made; // Protected
        this.#liters = liters; // Private
    }
    show() {
        console.log(`This bottle is made by ${this._made} and can store ${this.#liters} liters`);
    }
    get getLiters(){
        return this.#liters;
    }
}
const bottle = new Bottle('Steel', 2);
bottle.show(); // This bottle is made by Steel and can store 2 liters
console.log(bottle._made); // Steel
//console.log(bottle.#liters); // Error
console.log(bottle.getLiters);
