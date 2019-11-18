# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Asynchronous JavaScript and Callbacks (3:00)

| Timing | Type | Topic |
| --- | --- | --- |
| 10 min | [Opening](#opening) | Introduction to Asynchronous JavaScript |
| 15 min | [Recap](#recap) | Anonymous Functions and Functions as First-Class Objects: Recap |
| 60 min | [Codealong](#codealong1) | Functions as First-Class Objects |
| 30 min | [Lab](#lab1) | Functions and Callbacks: Independent Practice |
| 30 min | [Codealong](#codealong2)  | Anonymous Functions and IIFEs  |
| 30 min | [Lab](#lab2) | IIFE: Independent Practice  |
| 5 min |  [Conclusion](#conclusion)| Homework, Final Questions & Exit Tickets |


### Objectives
*After this lesson, students will be able to:*

- Store and use anonymous functions in variables.
- Pass functions as arguments to functions that expect them.
- Write functions that take other functions as arguments.
- Return functions from functions.

### Preparation
*Before this lesson, students should already be able to:*

- Implement an AJAX request with Vanilla JS.
- Reiterate the benefits of separation of concerns – API vs. Client.
- Understand the difference between function declarations and function expressions.
- Understand scope and hoisting.

> Note: Last class, we learned how to implement an AJAX request with Vanilla JS and a jQuery AJAX client. Check with students to make sure that everyone is comfortable with the materials covered in the last class.

<a name = "opening"></a>
## Introduction to Asynchronous JavaScript (10 min)

As our programs start relying on user input/behavior and data that might not be available right away, we need to increasingly start thinking about how we can run our code at different times. We refer to this "now and later" programming as asynchronous programming. We have already used asynchronous programming in our code in previous lessons:

- We have listened for click and mouse events that execute certain code when that event is complete.
- We have waited for a return from an AJAX call, and we have executed code for success and error scenarios.

Although we have used asynchronous programming in our code, we have not discussed _how_ this is all happening. Before we can truly understand how asynchronous programming works in JavaScript, we need to take a deeper look at functions and scope.

---
<a name = "recap"></a>
## Anonymous Functions and Functions as First-Class Objects: Recap (15 min)

We have worked with numerous scenarios where we have run a block of code after a user has performed an action. Take the following scenario from our DOM and jQuery continued lesson:

```js
  var $thingList = $('#fav-list');

  $thingList.on('mouseleave', 'li', function(e) {
    ...
  });
```

Taking a close look at the jQuery `on()` method, we notice two very important overlooked concepts:

1. The `on()` method is taking a function as one of its parameters.
2. The function we are passing into the `on()` method does not have a name, we are just passing a raw function: the function keyword, a parameter list, and a function body inside curly braces.

---
<a name = "codealong1"></a>
##  Functions as First-Class Objects (60 min)

Functions as first-class objects, along with the related concept of closures, is JavaScript's chief superpower. By "first-class objects", we just mean that they can be used in any part of the code that strings, arrays, or data of any other type can be used. This means we can store functions as variables, pass them as arguments to other functions, return them from other functions, or just run them ad-hoc without the need to assign them to anything. A function that takes another function as an argument, or returns a function, is called a `higher-order function`.

In the above example we saw a function being passed to the jQuery `.on()` method, but JavaScript also has a plethora of built functions that allow us to pass functions as parameters. Let's take a look at the setTimeout function:

```js
  setTimeout( function(){
    console.log("Hello world");
  }, 1000 );
```

In this scenario setTimeout is taking a function as its first parameter, and the time (in milliseconds) to wait before running that function, as its second parameter. The syntax for defining our own function that takes a function as an argument is not any different than the syntax for defining a function that takes any other kind of argument:

```js
  var blastOff = function() {
    console.log("Blasting off!");
  }

  function launchRocket(rocketName, blastOffCallback) {
    console.log("Launching " + rocketName);
    console.log("3... 2... 1...");
    blastOffCallback();
  }

  launchRocket("Viking", blastOff);

  // => Launching Viking
  // => 3... 2... 1...
  // => Blasting off!

```

In the above example, the function being passed into `launchRocket` is acting as a "callback", which is a word that comes from pointer-based languages like C that we shouldn't concern ourselves with, but basically it just means a function that is designed to be executed by the code of another function.

Callback functions can also take arguments, even though we don't specify the need for arguments when we're passing the callback function itself as a variable:


```js
  var blastOff = function(destination) {
    console.log("Blasting off for " + destination + "!");
  }

  function launchRocket(rocketName, blastOffCallback) {
    console.log("Launching " + rocketName);
    console.log("3... 2... 1...");
    blastOffCallback("Mars");
  }

  launchRocket("Viking", blastOff);

  // => Launching Viking
  // => 3... 2... 1...
  // => Blasting off for Mars!

```

Just as we can pass functions as arguments to other functions, we can also return functions from other functions:


```js
  var blastOff = function(destination) {
    console.log("Blasting off for " + destination + "!");
  }

  function makeRocketLauncher(rocketName, blastOffCallback) {
    return function() {
      console.log("Launching " + rocketName);
      console.log("3... 2... 1...");
      blastOffCallback("Mars");
    };
  }

  var launchViking = makeRocketLauncher("Viking", blastOff);
  var launchMariner = makeRocketLauncher("Mariner", blastOff);

  launchViking();
  launchMariner();

  // => Launching Viking
  // => 3... 2... 1...
  // => Blasting off for Mars!

  // => Launching Mariner
  // => 3... 2... 1...
  // => Blasting off for Mars!

```

This ability to pass functions as arguments to other functions, and to return functions from other functions, gives JavaScript an enormous amount of flexibility and power, especially when coupled with a language feature called "closures". Notice how when you run `launchViking()` and `launchMariner()`, you somehow have access to the original rocketNames, even though the function `makeRocketLauncher()` that you passed them into has run its course and is no longer executing? That's because `launchViking()` and `launchMariner()` are "closures", meaning they have "closed over" those rocketName variables. We'll go into what that means and why it's useful a couple of lessons from now.


---

<a name = "lab1"></a>
## Functions and Callbacks: Independent Practice (30 mins)

Open the [main.js](starter-code/functions-callbacks-exercise/main.js) file.

- Write a function, `makeCountingFunction()`, that returns another function. The function returned by `makeCountingFunction()` should take an array as an argument, and return the number of odd integers in the array.
- `makeCountingFunction()` itself should take as its only argument something called a "predicate function", a function designed to run a test on each item in an array.

Test your code by running it in the command line using `node`!

---

<a name = "codealong2"></a>
## Anonymous Functions and IIFEs (30 min)

By this point we have seen various examples of functions being passed as callback arguments. Taking the first setTimeout example:

```js
  setTimeout( function(){
    console.log("Hello world");
  }, 1000 );
```

The function being passed into `setTimeout()` above is called an **anonymous function expression** because it is not named in any way -- it is not a function expression that got assigned to a variable name, and neither is it a function that got its name in a function declaration.

Note that you don't have to pass anonymous functions as callbacks in cases like this -- you can pass named functions as well, no matter how they got their names:

```js
  function sayHi() {
    console.log("Hello world");
  }

  var sayBye = function() {
    console.log("Goodbye world");
  }

  setTimeout(sayHi, 1000 );
  setTimeout(sayBye, 1261440000000);

  // (1,261,440,000,000 milliseconds is 40 years)
```

>Note: Anonymous functions are great, but they may give you some trouble when debugging, if you're looking at a stack trace and it shows a big column of unnamed functions. To get around this you can name them as shown above, or you can use a third way to give them a name which will show up in debugging, called a "named function expression":

```js
  setTimeout(function timer(){
    console.log( "Hello world" );
  }, 1000 );
```

**Invoking Function Expressions Immediately**

We have the ability to execute our function expressions as soon as they are declared. This pattern has become so commonplace, that the JS community gave it a name: Immediately-invoked function expressions (IIFE - pronounced "iffy"). We are familiar with this syntax:

```js
  var countDown = function() {
    var counter;
    for(counter = 3; counter > 0; counter--) {
      console.log(counter);
    }
  }
```

We can transform this to an IIFE and execute the function expression immediately by adding parenthesis at the end of the expression:

```js
  var countDown = function() {
    var counter;
    for(counter = 3; counter > 0; counter--) {
      console.log(counter);
    }
  }();
```

Note that we need to add a semicolon at the end of IFFEs.

IIFEs are just functions, so we can also pass arguments to them:

```js
  var counterStartPoint = 3;

  (function countDown( global ){
    var counter;
    for(counter = global.counterStartPoint; counter > 0; counter--) {
      console.log(counter);
    }

  })( window );

  console.log( counterStartPoint ); // 3
```

The above example highlights a common stylistic practice. Although IIFEs are commonly used with global objects, they can certainly be used inside an enclosing scope.

---
<a name = "lab2"></a>
## IIFE: Independent Practice (30 min)

Open the [main.js](starter-code/iife-exercise/js/main.js) file.

- Write an IIFE function that takes a timer argument.
- The function will automatically execute and count up every second until the specified argument.
- Use the setTimeout function to count up.
- Hint: a second is the timer passed * 1000 (milliseconds).

---

<a name = "conclusion"></a>
## Conclusion (5 min)
Callbacks and closures are the bread and butter of asynchronous programming. Looking back at our DOM and APIs lessons, our interfaces update on user interactions and/or once we receive data from remote locations. Best practices in JS call for these reactions to be handled in the form of callbacks.

Callbacks, closures, and IIFEs allow us to better organize our code for each scenario, as well as make our functions significantly more dynamic.

Make sure class objectives have been met.

## Homework

Before the next class, make sure that students sign up for a 500px developer account. **We strongly recommend that students do this before coming to class, as this can free up time during the lesson**. We've created a [set of sign up instructions](500px.md) that you can pass along to students. In the next class, you'll be reviewing the steps that students took to sign up and then leading an exercise that uses the  500px API.

**Optional homework:** Students who want an additional challenge can try to complete [this series of functional-programming JavaScript exercises](http://reactivex.io/learnrx/). Be sure to warn students that some of these exercises use methods and syntax that we haven't covered in class and which they will likely need to look up on their own.

#### Further Resources

- [Functions are first class objects in javascript][1]
- [Brief intro to callbacks][2]
- [Demystifying JavaScript Closures, Callbacks and IIFEs][3]
- [More in-depth article on callbacks][4]

[1]: http://helephant.com/2008/08/19/functions-are-first-class-objects-in-javascript/
[2]: http://www.impressivewebs.com/callback-functions-javascript/
[3]: http://www.sitepoint.com/demystifying-javascript-closures-callbacks-iifes/
[4]: http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/
