# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Closures and This (3:00)

| Timing | Type | Topic |
| --- | --- | --- |
| 5 min | [Opening](#opening) | Introduction to Closures and Context |
| 10 min | [Review](#review) | A Review of Scope |
| 10 min | [Codealong](#scope-chains) | Scope Chains |
| 20 min | [Codealong](#codealong1) | Closures |
| 15 min | [Lab](#lab1) | Create a Closure: Independent Practice |
| 25 min | [Lab](#lab2)  | Closure Brain Teaser: Independent Practice |
| 15 min | [Lab](#codealong2)  | The Module Pattern |
| 25 min | [Codealong](#codealong3) | Context...The Meaning and Purpose of this  |
| 25 min | [Codealong](#codealong4) | Manipulating Context  |
| 20 min | [Lab](#lab3) | The Brainteasers |
| 10 min |  [Conclusion](#conclusion)| Final Questions & Exit Tickets |

### Objectives

_After this lesson, students will be able to:_

- Understand and explain Javascript context.
- Understand and explain closures.
- Implement the module pattern in their code.

### Preparation

_Before this lesson, students should already be able to:_

- Create a function.
- Explain scope.
- Manipulate the DOM with jQuery.

>Note: Last class, we learned how prototypical inheritance differs from classical inheritance. Check with students to make sure that everyone is comfortable with the materials covered in the last class.

---

<a name = "opening"></a>
## Introduction to Closures and Context (5 min)

Today we are going to talk about a couple features of Javascript that make it unique from other languages; _closures_ and _context_. Closures and context are definitely used in many languages other than Javascript, but it is the way Javascript handles these two concepts that makes them unique. Context and closures are often thought of as the most hard to grasp concepts of JS, but we will break down this lesson covering them one topic at a time, followed by enough independent practice and brainteasers to give you a mastery of them. Let's get cracking!

---

<a name = "review"></a>
## A Review of Scope (10 mins)

As we have learned from Unit 1, Javascript implements a concept of scope. If you don't fully remember, scope is synonymous with variable access, meaning, the scope of our executed code will dictate which variables we have access to and can ultimately use at the time of execution. The two types of scope we've touched on were global and local.

Global scope:

```js
var a = 1

function foo() {
  console.log(a)
}

foo() // 1
```

If you declare a variable _outside_ of all functions it becomes globally scoped meaning it can be accessed from anywhere within the execution environment. In the example above, `foo()` logs the value for the global variable `a`.

Local scope:

```js
function bar() {
  var b = 'local value'
  console.log(b)
}

bar() // 'local value'

console.log(b) // b is not defined
```

Variables declared _inside_ of a function are given a local scope and can only be accessed from within the function they were declared. This is why when we run `bar()` our log of `b` gives us `'local value'` but when we try to access `b` outside that scope we get `b is not defined`.

---

<a name = "scope-chains"></a>
## Scope Chains (10 mins)

The scoping rules work the same when there are functions nested inside of other
functions; each function gets its own local scope, and variables in that scope
can only be accessed from the _lines of code_ within the function they were
declared. This is called _Lexical Scope_.

To phrase it a different way; inner functions can access variables in the scope
of their outer function, but the reverse is not true: outer functions _cannot_
access the scope of an inner function.

For example:

```javascript
function someFunc() {
  var outerVar = 1;
  function zip() {
    var innerVar = 2;
  }
}
```

*`zip` has access to both `innerVar` & `outerVar`, but `someFunc`* only *has
access to `outerVar`*

### Multiple Nested Scopes

Nesting isn't limited to a single inner scope, there can be multiple nested
scopes, each of which adhere to the rule above. With one addition: sibling
scopes are also restricted from accessing each other's variables.

For example:
```javascript
function someFunc() {
  function zip() {
  }
  function quux() {
  }
}
```

*`zip` & `quux` are both inner scopes of `someFunc`. Just as `someFunc`
cannot access `zip`'s variables, `zip` cannot access `quux`'s variables
(and vice versa)*

### Scope Tree

Looking at the nesting from top-down, a tree of scopes is formed.

This code

```javascript
function someFunc() {
  function zip() {
    function foo() {
    }
  }
  function quux() {
  }
}
```

Produces this tree

```
    global
       │
       ↓
   someFunc()
       │
      ╱ ╲
     ╱   ╲
    ↓     ↓
  zip() quux()
    │
    ↓
  foo()
```

Remembering that inner scopes can access outer scope's variables, but *not*
vice-versa (`foo()` can access `zip()`'s variables, and `zip()` can access
`someFunc()`'s variables), then it makes more sense to look at the tree from
bottom-up, which forms a chain, also known as...

### Scope Chains

Looking from the most inner to the most outer scope forms a *Scope Chain*:

```
    global
       ↑
       │
   someFunc()
       ↑
      ╱
     ╱
  zip()
    ↑
    │
  foo()
```

---

<a name = "codealong1"></a>
## Closures (20 mins)

Let's say `someFunc()` declares a variable `bar`:

```
    global
       ↑
       │
   someFunc()
    var bar
       ↑
       ⋮
```

Given how nesting scope works, it's possible for an inner scope within
`someFunc()` to access `bar`. In this example, let's say `zip()` accesses
`bar`:

```
    global
       ↑
       │
   someFunc()
    var bar
       ↑
      ╱
     ╱
   zip()
alert(bar)
    ↑
    ⋮
```

Then `zip()` is said to _Close Over_ `bar`. Therefore `zip()` is a _Closure_.

The closure will be maintained even if `zip()` isn't executed immediately. It is
perfectly legal in Javascript to pass `zip` around / return it from `someFunc()`
for later execution. All the while, `bar` will continue to be available.

This continues down the scope chain. Say `zip()` declares a variable `beep`, and
`foo()` alerts it out:

```
    global
       ↑
       │
   someFunc()
    var bar
       ↑
      ╱
     ╱
   zip()
alert(bar)
 var beep
    ↑
    │
   foo()
alert(beep)
```

Now we have two closures: one for `zip()` which closes over the variable `bar`,
and one for `foo()` which closes over both variables `bar` and `beep`.

Put another way; both `bar` and `beep` are _in scope_ of `zip()` and `foo()`.

Only `bar` is in scope of `someFunc()`, and neither `bar` nor `beep` are in
the `global` scope.

> Instructor note: A good analogy is to think of a scope chain as an arm
> reaching up, and the closure as the fist closing over that variable.

---

Here is a more practical example:

```html
<button>Click Me!</button>
```

```javascript
document.addEventListener('DOMContentLoaded', function() {

  var count = 0

  document.querySelector('button').addEventListener('click', function() {
    alert(count)
  })
})
```

The inner function closes over the variable `count`, and continues to have
access to that variable no matter how many times the user clicks on the
`<button>`.

Note that because `count` is declared inside the outer function, it is _not_
available in the `global` scope.

We can then extend the code to increase the count each time the button is
clicked:

```html
<button>Click Me!</button>
```

```javascript
document.addEventListener('DOMContentLoaded', function() {

  var count = 0

  document.querySelector('button').addEventListener('click', function() {
    count = count + 1
    alert(count)
  })
})
```

Because the variable `count` is in an outer function, and is closed over by the
inner function, any modifications made to it anywhere along any of the scope
chains leading to it are reflected in every closure:

```html
<button id="increase">Increase Number +</button>
<button id="show">Show Me!</button>
```

```javascript
document.addEventListener('DOMContentLoaded', function() {

  var count = 0

  document.querySelector('#increase').addEventListener('click', function() {
    count = count + 1
  })

  document.querySelector('#show').addEventListener('click', function() {
    alert(count)
  })
})
```

Here we have two scope chains:

1. `#increase`'s click function -> `document`'s loaded function
2. `#show`'s click function -> `document`'s loaded function

> Instructor's Note: The scope chains also extend up to the `global` scope, but
> it hasn't been depicted here for ease of explanation.

Both close over `count` so whenever it changes, both scope chains have access
to the new value.

*Note*: Due to this sharing of a variable across closures, it can sometimes be
the cause of unexpected bugs due to the variable being unexpectedly modified by
another scope chain.

---

<a name = "lab1"></a>
## Create a Closure: Independent Practice (15 mins)

What better way to learn something than by doing it?! For the next 15 minutes, create a closure that will help you create colored sticky notes dynamically in your DOM with the click of a button. The results should look something like:

![](https://s3.amazonaws.com/f.cl.ly/items/30342l3m3N151L442S1Z/Image%202015-12-03%20at%207.23.15%20PM.png)

The CSS is all setup for you in the start index.html, but you will have to add:

- create input and button elements
- run Javascript code only after document is "ready"
- sticky note color and message should both be dictated by user input
- each sticky note message should start with a number representing the order of its creation

---

<a name = "lab2"></a>
## Closure Brain Teaser: Independent Practice (25 mins)

As mentioned earlier, the ability for an inner function to reference an outer function variable can be dubious if that variable updates. Take a look at the following code.

```js
function queueCreator(waitList){
  var positionInQueue = 1

  for (var i=0; i<waitList.length; i++) {
    waitList[i].id = function() {
      return positionInQueue
    }
    positionInQueue++
  }

  return waitList
}

var people = [{name:'George'},{name:'Chris'}]

var queueList = queueCreator(people)

queueList[0].id() // 3?!
```

Here we have a `queueCreator` function that helps us order all of our guests upon arrival. However, as we can see the first person in our `queueList` is given an incorrect `id`! The same goes for the second person. Your job for the next 15 minutes is to help fix this `queueCreator` so that each guest is given his/her correct position in the list.

*hint:* You will need to create a closure which references a new position value
each time the `for` loop is executed.

#### Closure Brain Teaser Solution

Before we can cover the solution, we must first be able to explain the problem. Since, the inner function accesses the outer function's variable by reference and not by value it grabs the latest updated value of `positionInQueue`. And because the value of `positionInQueue` was incremented in a for loop that ran twice, its referenced value ended up being `3` (`1 + 1 + 1`). So, how can we fix the code so that our closure uses the correct reference? 

Here is a potential solution using _immediately invoked function expressions_
(IIFE):

```js
function queueCreator(waitList){
  var positionInQueue = 1

  for (var i=0; i<waitList.length; i++) {
    (function(position) {
      waitList[i].id = function() {
        return position
      }
    })(positionInQueue) // IIFE
    positionInQueue++
  }

  return waitList
}

var people = [{name:'George'},{name:'Chris'}]

var queueList = queueCreator(people)

queueList[0].id() // 1
```

By immediately invoking the function commented with `IIFE` we are immediately
creating a new scope. The function takes a single parameter `position`, which is
a copy of the current value of `positionInQueue`. This takes advantage of the
way JavaScript passes arguments by value, allowing the closure created by the
`.id` function to reference a unique, unchanging value for `position`.

An alternative solution, which also helps explain how the above IIFE works, is
to use any one of the built-in array iteration methods, such as `forEach`:

```js
function queueCreator(waitList){
  var positionInQueue = 1

  waitList.forEach(function(item, index) {
    item.id = function() {
      return positionInQueue + index
    }
  })

  return waitList
}

var people = [{name:'George'},{name:'Chris'}]

var queueList = queueCreator(people)

queueList[0].id() // 1
```

Here, the scope created by the function passed to `.forEach` also contains a
unique value for `index` every time it is executed, allowing the closure created
by `.id` to close over the single, unchanging value.

---

<a name = "codealong2"></a>
## The Module Pattern (15 mins)

Now that we know the ins-and-outs and quirks of scope & closure, how exactly is it useful?

Well, they can help us hide state by creating _modules_:

```js
var car;
function carFactory(kind) {
  var wheelCount, start;
  wheelCount = 4;
  start = function() {
    console.log('started the ' + wheelCount + ' wheel ' + kind + '.');
  };

  return {
    make: kind,
    wheels: wheelCount,
    startEngine: start
  };
}

car = carFactory('Tesla');

// => started the 4 wheel Tesla.
car.startEngine();
```

Unlike most other object-oriented languages, Javascript doesn't have a true concept of private context. Closures allow us to abstract away private variables and functions so that the public doesn't need to worry about the complicated details of how the program works, they can use the module pattern to get what they need done accomplished. In terms of this example, `wheelCount` and `start` expressions are private. The module is solely concerned with returning an object for the public to use while hiding how the values for the object properties were created. This is the main idea behind the module pattern, that it returns an object literal which through its use, is the only way to access the private functions and variables. Another benefit of the module pattern, is that it helps keep your codebase cleaner by organizing relevant code together which in turn also helps with testing and reuse.

---

<a name = "codealong3"></a>
## Context...The Meaning and Purpose of _this_ (25 mins)

The next thing we will be covering is one of Javascript's most confusing concepts, _context_. However, don't fear, this concept may be a little confusing to grasp at first, but once you start to get it you'll know context like the back of your hand. So, what exactly is context? Well, in Javascript when a function is invoked there is an execution context associated with it. This _context_ is what makes up the value of the keyword _this_, which is a reference to the object that "owns" the currently executing code. In other words, _this_ is a reference to an object, an object that is the subject in context. Knowing that context is determined by how a function is invoked, we can infer that context is decided at runtime when the function is called.

Confused? Here's some code to help bring some clarity:

```js
console.log(this === window) // true
```

If we were to run this single line of code by itself, in the global variable scope, it would run in the context of the `window` object, and because _this_ refers to the subject of the executing code, the subject in context, its value is equal to the `window` object it is running within.

Here's one more example to further the point:

```js
function foo() {
  console.log(this === window)
}

foo() // true
```
By default a function runs within the scope of the object it sits in, so in this case _this_ is still equivalent to the window object.

In fact:

```js
foo() === window.foo() // true
```
Here you can see that `foo()` is a property of the object it's running in.

*note:* In the real world, we would never need to explicitly code the `window` object like this, but this example illustrates the point that the function `foo` does in fact exist within `window` when it runs in the global scope.

OK, OK, OK...you have a basic understanding of _this_ now and how it refers to the object it's being executed within, but what's its purpose and why would we use it to refer to an object opposed to calling on the actual object itself? To answer these questions check out the following code:

```js
var chatroomUser = {
  age: '22',
  sex: 'm',
  location: 'Los Angeles',
  printASL: function() {
    // we can refer to the chatroomUser object with this
    console.log(this.age + '/' + this.sex + '/' + this.location)

    // or we could refer to it by name
    console.log(chatroomUser.age + '/' + chatroomUser.sex + '/' + chatroomUser.location)
  }
}
```

Inspecting the `printASL` function we can see that we can refer to the object the function is running within with _this_ or by directly calling the object name, `chatroomUser`. This leads us to the question, why not just use `chatroomUser`? The root of the answer lies within variable scope. Remember? That thing we learned a few units ago. ;) If we were to use `chatroomUser`, there is no predicting that that variable name is not already declared globally hence causing our reference to the `chatroomUser` in our object to break since the globally declared `chatroomUser` would be used instead. However, if we use _this_ as the context reference, we are precise and remove any ambiguity from our code. Further, _this_ gives us the ability to not only accurately _reference_ context, but it also allows us to _set_ the context of any function we call, allowing us to do some interesting things with closures. We'll get into the details of setting the context of functions in just a bit.

---

<a name = "codealong4"></a>
## Manipulating Context (25 mins)

Before we go into how to manually change context, we must remember that all objects, which includes functions, have properties. And when a function object executes, the value of _this_ is set to the object that invokes said function.

Let's take a look the following code to cement what we already know:

```js
var user = {
  firstName: 'Chelsea',
  lastName: 'Logan',
  showFullName: function() {
    console.log(this.firstName, this.lastName)
  }
}

user.showFullName() // Chelsea Logan
```

Looking at the example above, the first thing you may notice is that we have declared an object, `user`, which contains a few properties, one of them being a method. Because this method, `showFullName`, is defined on `user`, we also know that the context of _this_ within the method is `user`. So, when we run `user.showFullName()`, _this_ serves as a reference to `user` allowing us to access the `firstName` and `lastName` properties.

This is fine and dandy, but what if we want to be able to choose what object _this_ refers to, is it possible? In fact, with the help of a few built-in Javascript methods it is.

But before we dive into examples of how to use these methods, why do you think we would need to change our context in the first place? Well, when it comes to the use of event handlers, the value of _this_ is not always what we want.

For example:

```js
var user = {
  firstName: 'Chelsea',
  lastName: 'Logan',
  showFullName: function() {
    console.log(this.firstName, this.lastName)
  }
}

$('.button').click(user.showFullName) // undefined undefined
```

With what we know so far, we would expect to see `Chelsea Logan` upon a click, but instead we are returned with `undefined undefined`. Why is this? Well, if you're thinking its because our context has changed you're absolutely right! In Javascript, the context of an event listener is set to the element it is listening to. So for this example, _this_ is actually equal to the `button` element which is why we get `undefined undefined`, since `.button` doesn't have any `firstName` or `lastName` properties upon itself. And alas, this is a real-world example of why you would want to change the context of a function.

Here are the methods that allow us to control context:

- `call`: The call() method calls a function with a given this value and arguments provided individually
- `apply`: The apply() method calls a function with a given this value and arguments provided as an array (or an array-like object)
- `bind`: The bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called

`call`:

```js
$('.button').click(function() {
 user.showFullName.call(user) // Chelsea Logan
})
```

`apply`:

```js
$('.button').click(function() {
 user.showFullName.apply(user) // Chelsea Logan
})
```

`call` and `apply` are identical in their service, but they differ in how many arguments they take. `call` can accept many arguments, the first argument always being the setting context and the rest being arguments that are to be passed to the function whose context is being set in a respective order. `apply` only accepts two arguments, like `call` the first argument is the setting context, but the second argument is an array of all the arguments to be passed to the function whose context you are setting.

Their implementations with arguments looks like this:

```js
var user = {
  firstName: 'Chelsea',
  lastName: 'Logan',
  showFullName: function(one, two, three) {
    console.log(this.firstName, this.lastName, one, two, three)
  }
}

$('.button').click(function() {
 user.showFullName.call(user, 1, 2, 3) // Chelsea Logan 1 2 3
})

$('.button').click(function() {
 user.showFullName.apply(user, [1, 2, 3]) // Chelsea Logan 1 2 3
})
```

Pretty straightforward stuff. `bind` is different than `call` and `apply` in the sense that it doesn't set the context of a function, but rather `bind` creates a whole new function with the context you supply it.

```js
var user = {
  firstName: 'Chelsea',
  lastName: 'Logan',
  showFullName: function() {
    console.log(this.firstName, this.lastName)
  }
}

// declare a new variable whose value is the user.showFullName function with a context set to user
var contextSetUser = user.showFullName.bind(user)
$('.button').click(contextSetUser) // Chelsea Logan

$('.button').click(user.showFullName) // undefined undefined
```

---

<a name = "lab3"></a>
## This Brainteasers (20 mins)

Let's go ahead and test out all of our freshly acquired knowledge with a couple of fun brainteasers! Feel free to work independently or with a partner.

1. Explain the results of the following code:

```js
var fullName = 'John Doe';
var obj = {
   fullName: 'Colin Ihrig',
   prop: {
      fullName: 'Aurelio De Rosa',
      getFullName: function() {
         return this.fullName;
      }
   }
};

console.log(obj.prop.getFullName());

var test = obj.prop.getFullName;

console.log(test());
```

2. Make `console.log(test())` return `Aurelio De Rosa`

#### Brainteasers Solution

1. Context of a function is dependent on how a function is invoked, not how it's defined. For the first log, we execute `obj.prop.getFullName()` invoking `.getFullName()` upon the `prop` object, thereby setting the context of the function to `prop` and logging `prop`'s `fullName` property, `Aurelio De Rosa`. For the second log, `.getFullName()` is set to the variable `test` which is in declared in the context of the `window` object, similar to the first example we saw earlier. Hence, when `test` is called, the log returns the value of the `fullName` property of the `window` object, `John Doe`.

2. `console.log(test.call(obj.prop))` or `console.log(test.apply(obj.prop))`

---

<a name = "conclusion"></a>
## Conclusion (10 min)

Review class objectives and the following questions:

- What is the purpose of the module pattern and what are its benefits?
- When is context determined?
- Why would you want to manually change context of a function?
- What is a more commonly used to term for lexical scope?
- Explain one ability closure has upon variable scope that makes it special.
- How does closure work?

