# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Prototypal Inheritance (3:00)


| Timing | Type | Topic |
| --- | --- | --- |
| 10 min | [Opening](#opening) | Introduction to Prototypal Inheritance |
| 15 min | [Introduction](#introduction) | Class vs. Prototype |
| 60 min | [Codealong](#codealong1) | Constructor & Prototype |
| 10 min | [Independent Practice](#practice) | What Are You Looking at? |
| 10 min | [Lab](#lab1) | Build a Constructor That... - Independent Practice |
| 15 min | [Codealong](#codealong2) | Subclasses  |
| 10 min | [Codealong](#codealong3) | Object.create()  |
| 35 min | [Lab](#lab2) | Build a Virtual Farm |
| 10 min | [Codealong](#codealong4) | ES6 - Same Ol' Inheritance Just With Syntactic Sugar |
| 5 min |  [Conclusion](#conclusion)| Final Questions & Exit Tickets |

### Objectives

_After this lesson, students will be able to:_

- Explain prototypal inheritance and its purpose.
- Distinguish the difference between prototypal from classical inheritance.
- Create and extend prototypes.
- Explain the difference literal and constructed objects.

### Preparation

_Before this lesson, students should already be able to:_

- Write JavaScript functions.
- Describe the difference between functions and methods in JavaScript.

>Note: Last class, we learned how to store and use anonymous functions in variables and write functions that take other functions as arguments. Check with students to make sure that everyone is comfortable with the materials covered in the last class.

---

<a name = "opening"></a>
## Intro (10 min)

> Prototype-based programming is a style of object-oriented programming in which behavior reuse (known as inheritance) is performed via a process of cloning existing objects that serve as prototypes. This model can also be known as prototypal, prototype-oriented, classless, or instance-based programming. Delegation is the language feature that supports prototype-based programming. - wikipedia

As we develop more programs we run into the concept of DRY, short for _Don't Repeat Yourself_. With DRY, we begin practicing the declaration of variables whose values range from arrays to functions, all for the purpose of being able to refer to and reuse these already defined values. However, what do we do when we want to go beyond reusing a value which may just be a primitive or an object containing some key/value data? What if instead we want to clone an object that has _behaviors_ we seek to reuse?

For example, say we are developing a revamped version of the video game Street Fighter. Each character may have their own unique fighting tricks, but in general, all character objects should have at least the same kick and punch abilities. With DRY in mind, when we develop a new fighter object we know we would want to avoid recreating any of these general behaviors and instead code a solution that clones them. This solution is performed with prototypal inheritance.

---

<a name = "introduction"></a>
## Class vs. Prototype (10 min)

The purpose of prototypal inheritance is to offer a modeling object, which contains certain behaviors, to other objects to be prototyped off of, inheriting the model's behaviors. For those of you familiar with other object-oriented languages, such as Ruby, this functionality may sound very similar to what a class does. However, Javascript is not a class-based language, but instead a prototype-based language. Let's discuss the differences by comparing Ruby against Javascript.

#### Class:

In Ruby, classes are objects that have unique responsibilities and methods:

- manufacture new objects
- define the behavior of the objects they manufacture

#### Prototypal Inheritance:

Similar to Ruby, Javascript also uses objects, function objects (generally everything in Javascript is an object except primitives), to perform inheritance. However unlike Ruby, Javascript does not have a special function object that can both manufacture a new object as well as define the behavior of the object it creates. Instead, Javascript has two different features, constructors and prototypes, which accomplish these tasks:

- a _constructor_ function manufactures new objects
- a _prototype_ property defines the behavior of new objects manufactured by the constructor

Now that we know the key differences between a prototype-based and a class-based language, let's take a deeper dive into the mechanics of a constructor and a prototype.

---
<a name = "codealong1"></a>
## Constructor & Prototype (60 min)

What exactly is a constructor?

A constructor is just an ordinary function no different than any function you've coded up to this point. However, what does distinguish this function from the rest is when it is used with the `new` operator.

```
function Vehicle(color) {
  this.color = color
}

var car = new Vehicle('red')
```

***note:*** Out of convention, just as we would capitalize a class name, we capitalize the name of our constructor function.

When we call upon our constructor function with the `new` operator we are creating a new object instance based off a user-defined object type, in this case `Vehicle`, or of a built-in object type, such as a String. Essentially, the constructor function is specifying the type of the object instance it creates. This has several implications.

**The constructor creates a new object:**

Nothing groundbreaking here, just a fresh new object: `{}`.

**The constructor sets a special internal constructor property of the object to the constructor function that created it:**

This means in our example `car.constructor === Vehicle`. Something to note is that the constructor property is unique in that if you try to enumerate the car object it will not show up. Also, if you try to redefine the constructor property, you will merely add a normal property with the name `constructor` on top of the special one. Point being, the `constructor` is built in with the `new` keyword and can never be set manually. This is important because it serves as a reliable reference to the constructor who created its prototype.

To assert the reference of a constructor, use the `instanceof` operator. Go into the console of your browser and take five minutes to construct a few objects and then assert its reference. You can do this with a string, array and even your own custom constructor! I'll get you started with a String example:

```javascript
var str = new String("abc") // "abc"

str instanceof String // true
```

From our use of `instanceof` in the String example we can see that calling upon the String constructor with the `new` operator prototyped `"abc"` as a String. The same thing should have happened if you tried doing this with an array:

```javascript
var arr = new Array(1,2,3) // [1,2,3]

arr instanceof Array // true
```

or if you even tried with your own hand rolled constructor:

```javascript
function Foo () {

}

var f = new Foo()

f instanceof Foo // true
```

**The constructor sets up the object to delegate to Vehicle.prototype:**

This is where things get pretty interesting. Because functions are just objects they have the ability to contain properties. In fact, all functions automatically receive a special `prototype` property which has a value of an empty object. However, this prototype property is unique in that whenever an object is constructed, it inherits all the properties of its constructor's prototype.

For example:

```javascript
Vehicle.prototype.wheels = 4

var car = new Vehicle()

car.wheels // 4
```

We can see evidence that `car` inherited the the wheels property from `Vehicle`'s prototype. Let's take an in-depth look in the console to further understand what's going on here:

![](https://s3.amazonaws.com/f.cl.ly/items/0U331d1k443K2n0l1I3K/Image%202015-11-17%20at%207.57.45%20PM.png)

With `car`'s value printed in our browser's console we can see its entire value which just consists of the Vehicle values it has inherited. We never declared a `wheels` property on `car` so how did it receive the `wheels` value from Vehicle? Well when we accessed `car.wheels` Javascript looked to the `car` object and could not find `wheels` so it continued along the _prototype chain_ to search for inherited values, where it then found `4` from Vehicle's `wheels` in its prototype.

Here's a diagram showing how the prototype chain works:
![](https://s3.amazonaws.com/f.cl.ly/items/2U0y1J3J0t2g1p2k053L/Image%202015-11-18%20at%2011.51.18%20PM.png)


Pretty powerful stuff. However, the awesomeness of inheritance doesn't stop here! A constructed object, in this case `car`, is set up to delegate properties which haven't been set up yet to take in the values from its prototype. What this means is that, as long as we don't manually define `car.wheels`, we can use the prototype to redefine the `wheels` property. Further, any instance created by the `Vehicle` object can have properties set on their prototype object after the fact!

```javascript
Vehicle.prototype.wheelCount = 8

car.wheels // 8
```

***note:*** When we construct a new object, opposed to declaring a literal object (i.e. ` var car = {wheels: 4}`) we are bettering memory performance because constructed objects refer to their prototype's properties whereas literal objects must define their properties each time they are declared.

**The constructor calls Vehicle() in the context of the new object:**

Context is something we will cover in the next lesson, but for now here's a brief explanation. Let's go all the way back and look at our first example:

```javascript
function Vehicle(color) {
  this.color = color
}

var car = new Vehicle('red')
```

Context in a nutshell deals with object reference. More specifically, Javascript offers a tool, `this`, which can be called upon to tell you which object you are working with. When we construct a new object the `this` in our constructor function will refer to the new object instance we are creating. This means that `car.color === 'red'`. This is what is known as an _instance property_ because it is a property our constructor can define every time it creates a new instance object. If you were to define a property with a function this would be known as an _instance method_. Knowing this, let's use the Vehicle constructor make a couple different cars.

```javascript
var hyundai = new Vehicle('green')
var volkswagen = new Vehicle('black')
hyundai // Vehicle {color: "green"}
volkswagen // Vehicle {color: "black"}
```

***pop quiz!*** What are the two ways to set properties on an object? (ǝdʎʇoʇoɹd puɐ ʎʇɹǝdoɹd ǝɔuɐʇsuᴉ :ɹǝʍsuɐ) What is one benefit of constructing an object over creating a literal object? (ǝɔuɐɯɹoɟɹǝd ʎɹoɯǝɯ :ɹǝʍsuɐ)

We've covered a lot of new ground so let's take a second to recap and gain some clarity. Javascript is an object-oriented language, just like Python or Ruby, however, unlike other object-oriented languages it does not have a traditional class system, instead it is prototype-based. Almost everything in Javascript is an object and each of these objects contain an internal property called _prototype_ which links the object to the object it is constructed from. This is what defines Javascript as being prototype-based and allows for inheritance. If we try to access a property on an object that doesn't exist Javascript will search the object's immediate properties, but once it cannot find it, it will continue to search within the object's prototype property. If it can't find it there, it will search within the prototype of _that_ prototype and so on and so forth traversing down the _prototype chain_ until it reaches the core constructor object at the end of the chain. And in a quick 60 second recap, those are the core fundamentals of prototypal inheritance.

---

<a name = "practice"></a>
## What Are You Looking at? - Independent Practice (10 mins)

![](https://s3.amazonaws.com/f.cl.ly/items/041a45180C3s2l3T3U2V/Image%202015-11-18%20at%207.54.48%20PM.png)

With a neighbor or two explain as concisely as possible what is happening line-by-line using all the following keywords: constructor, instance property, prototype, inheritance and prototype chain. On top of that, explain why `car` has a different value from the first and second times it is printed.

---
<a name = "lab1"></a>
## Build a Constructor That... - Independent Practice (10 mins)

With a clear understanding of what it looks like to construct a new object, take 10 minutes to create a constructor function that will allow for two instances and then prototype at least one method onto your constructor. If you can't think of an object you'd like to use as a model for inheritance make a constructor for a Bird or a Country.

---

<a name = "codealong2"></a>
## Subclasses (15 mins)

Now that we're starting to feel comfortable in our understanding of all these new concepts, let's add on another level of complexity. Have you ever seen the movie _Inception_? Brace yourself...just kidding, this won't be that bad.

Building off of our Vehicle constructor, let's extend Vehicle to make another constructor for hybrid cars.

```javascript
function Vehicle(color) {
  this.color = color
}

function HybridCar(color) {
  Vehicle.call(this, color)
}

HybridCar.prototype = new Vehicle()

var prius = new HybridCar('white')

prius.color // "white"
```

On the `HybridCar.prototype =...` line we are setting the `HybridCar`'s prototype to an instance of `Vehicle`, so that `HybridCar` inherits all of `Vehicle'`s properties. Remember how we've been talking about inheritance working by passing properties through the prototype? Then, in our actual `HybridCar` constructor we are using the `call` method to inherit the `Vehicle` constructor. We won't get into the mechanics of `call` in this lesson, but know that it allows `HybridCar` to use the `Vehicle` constructor for setting its own instance property. This is why, even though we never declared `this.color` in our `HybridCar` constructor we were still able to use the instance property setter, `this.color`, from `Vehicle` for `HybridCar`, ultimately allowing us the ability to set the color of our `HybridCar`, `prius.color === white`.

***note:*** If you have studied other object-oriented languages, this concept of extending prototypes/creating subclasses is similar to `parent` or `super`.

---

<a name = "codealong3"></a>
## Object.create() (10 mins)

So far we have practiced constructing new objects using the `new` keyword. However, this is not the only way. `Object` has a method `create` which allows us to create a new object with a specified prototype object and its properties.

```javascript
function Vehicle(color) {
  this.color = color
}

function HybridCar(color) {
  Vehicle.call(this, color)
}

HybridCar.prototype = Object.create(Vehicle.prototype)

var prius = new HybridCar('white')

prius.color // "white"
```

In this edit of our subclasses code, instead of using `new` we used `Object.create()`: `HybridCar.prototype = Object.create(Vehicle.prototype)`. The functionality of this snippet of code will still work exactly the same. Here's how, first, `Object.create()` performs the same task as `new` in that it creates a new object. Additionally, this created object contains the prototype object of `Vehicle`, which is the argument we pass. Lastly, we set this prototype object to the prototype of `HybridCar` thereby allowing it inherit `Vehicle`'s prototype. Now Javascript can follow the prototype chain of `HybridCar` to find the property `color`.

However, `new` and `Object.create()` are not totally synonymous in their functionality. If you pass a second argument to `Object.create()` it will serve as the object's property _descriptor_. A descriptor is an object that can be one of two types, _Data Descriptor_ or _Accessor Descriptor_. We won't be going too in-depth with descriptors, but just know that they provide developers the ability to have more control over how their objects are used.

**Data Descriptors:**

- writable: Whether the concrete value of the property may be changed.
- configurable: Whether the type of descriptor may be changed, or if the property can be removed.
- enumerable: Whether the property is listed in a loop through the properties of the object.
- value: The value of a property.

**Accessor Descriptors:**

- get (): A function called with no arguments when the property value is requested using dot notation (i,e: obj.prop).
- set (newValue): A function called with the new value for the property when the user tries to modify the value of the property using dot notation (i,e: obj.prop = 'new value').

---

<a name = "lab2"></a>
## Build a Virtual Farm - Independent Practice (35 mins)

![farm project](https://s3.amazonaws.com/f.cl.ly/items/1m2r3Y2A2J2S2q2N040v/Image%202015-11-21%20at%206.59.54%20PM.png)

With all the knowledge you've acquired thus far, it's time to put it all together and make a simple app. For the next half hour, you'll be creating a virtual farm whose animals can be clicked on to get an alert displaying what sound they make. Open up the [starter code](curriculum/lesson-plans/11-prototypal-inheritance/starter-code) to get started!

Requirements:

- Must have one `FarmAnimal` prototype that all other objects extend.
- 'FarmAnimal' must have `name` and `image` instance properties as well as a `talk` instance method.
- You should create at least five different animals for your farm.
- At least two animals must have subclasses. For example, if you create a `Cow` prototype it would have two types of cow objects extend from it (i.e. Angus & Texas Longhorn).
- Use vanilla JS or jQuery to create elements based off your `FarmAnimal` objects and bind them to the DOM. add the class `animal` to each element.
- When you click on animal an alert should show display the sound it makes (i.e. `mooo!`).
- Each animal element should have position styles, such as `left` and `top`, so images aren't stacked on one another.
- After completing all the above tasks, log your most extended prototypes and have a neighbor decipher the prototype chain without looking at the code. for even more fun, have him/her see if they can recreate the prototyping portion of your code!

Here's an example of how a simple animal object should look:

![](https://s3.amazonaws.com/f.cl.ly/items/1k0D3W1C3U1Q2m1e0k45/Image%202015-11-22%20at%2010.04.11%20AM.png)

This portion of the class is for you to really get your hands dirty and implement everything you've learned. The best way to do that is to truly customize your app to the best of your ability. Make it your own! If you want to show the animal sound in a way other than in an alert, do it! This is your app, learn and have fun!

---

<a name = "codealong4"></a>
## ES6 - Same Ol' Inheritance Just With Syntactic Sugar (10 mins)

One last thing we'll touch on is ECMAScript 2015 also known as ECMAScript 6 (ES6) which is one of the most recently published versions of Javascript. As Javascript evolves, it is becoming more and more object-oriented-_like_. ES6 only serves to further illustrate this point by introducing "classes" to the language. But wait a second, earlier we said Javascript doesn't have classes? Well, in fact, it still really doesn't. What the new class feature of ES6 brings to Javascript is really just syntactic sugar to make its code look like a traditional class, but in reality, its functionality of inheritance is still being powered by constructors and prototypes. Keeping that in mind let's see what ES6 classes look like!

we go from:

```javascript
function Vehicle(color) {
  this.color = color
}

var car = new Vehicle()
```

to:

```javascript
class Vehicle {
  constructor(color) {
  this.color = color
  }
}
```

*This constructor is no different than the constructor we've been learning about. It has the same purpose of creating instance properties and methods.*

...and how can we extend our class in ES6?

```javascript
class Car extends Vehicle() {
  constructor(color) {
    super(color)
  }
}
```

*`super` is a new one. Its purpose is to allow you the ability to call the constructor of the parent class.*

***note:*** ES5 and ES6 code can run side-by-side without the need of any [polyfills](https://en.wikipedia.org/wiki/Polyfill) or hacks.

---

<a name = "conclusion"></a>
## Conclusion (5 min)

Review class objectives and the following questions:

- What is the difference between class-based and prototype based languages?
- When would you want to declare a literal object and when would you want to construct an object?
- Why is using a constructed object better for memory performance?
- When would you want to implement a "subclass"?
- What is the purpose of a constructor function?
- What is the purpose of the prototype property?
- How does the prototype chain work?

