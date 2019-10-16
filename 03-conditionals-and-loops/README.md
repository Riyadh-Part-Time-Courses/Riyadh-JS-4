# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Conditionals and Loops (3:00)

| Timing | Topic |Description|
| --- | --- | --- |
| 15 min | [Opening](#opening) | Conditional Statements |
| 20 min | [Codealong](#codealong1) | Comparison Operators |
| 15 min | [Codealong](#codealong2)| Truthy and Falsy |
| 20 min | [Codealong](#codealong3)| Boolean/Logical Operators |
| 25 min | [Lab](#practice1) | Independent Practice |
| 25 min | [Codealong & Independent Practice](#codealong4) | Switch Statements |
| 10 min | [Codealong](#codealong5) | While & Do-While |
| 15 min | [Codealong](#codealong6) | Iteration |
| 30 min | [Lab](#practice2) | Fizzbuzz Code Challenge|
| 5 min | [Conclusion](#conclusion) | Final Questions & Exit Tickets |



### Learning Objectives
*After this lesson, students will be able to:*

- Use if/else conditionals to control program flow based on Boolean (true or false) tests.
- Use Boolean logic (!, &&, ||) to combine and manipulate conditional tests.
- Use switch/case conditionals to control program flow based on matching explicit values.
- Differentiate among true, false, 'truth-y', and 'false-y'.
- Review loop iteration using for and forEach, and introduce while and do/while loops.

### Preparation
*Before this lesson, students should already be able to:*

- Describe the concept of a "data type" and how it relates to variables.
- Declare, assign to, and manipulate data stored in a variable.
- Create arrays and access values in them.
- Iterate over and manipulate values in an array.

> Note: Last class, we worked on data types, arrays, helper methods, and array iterations. Check with students to make sure that everyone is comfortable with the materials covered in the last class before introducing the new material.

---

<a name="opening"></a>
## Conditional Statements (15 min)

Conditional statements enable us to essentially decide which blocks of code to execute and which to skip, based on the results of tests that we run. JavaScript supports two conditional statements: `if`...`else` and `switch`. We'll start off with the 'if'...'else' statement, which uses Boolean (true or false) tests.

#### If/Else Statement

`if (expr) { code }`  

... is a command to run the `code` block if `expr` is `true`

```javascript
if (1 > 0) {
  console.log("hi");
}
//=> hi
```

You can also add an optional `else` clause, to run if `expr` is _not_ `true`:

`if (expr) { code } else { other code }`

```javascript
if (0 > 1) {
  console.log("hi");
} else {
  console.log("bye");
}
//=> bye
```

When you need to test more than one case, you may use `else if`:

```javascript
var name = "kittens";
if (name === "puppies") {
  name += "!";
} else if (name === "kittens") {
  name += "!!";
} else {
  name = "!" + name;
}
name === "kittens!!"
//=> true
```

**Note**: It is **not** recommended to assign variables within a conditional expression because that will assign a value to the variable, as seen below:

```javascript
student = "Jamie";
//=> "Jamie"
```

The expression above will return the value shown on the second line. So if you assign a truthy value inside a conditional statement, this condition will always be true; if you assign an undefined value, the conditional statement will be false (undefined = falsey). Another potential issue is that it can be confused with equality (`===`). The example below illustrates WHAT NOT TO DO:

```javascript
if (x = 3) {
    console.log("boo");
}
```

#### Ternary Operators

JavaScript has a ternary operator for conditional expressions. The ternary operator is basically a concise "if-else” in one line, except that it not only executes blocks of code, it also returns a value:

```javascript
var age = 12;
//=> undefined

var allowed = (age > 18) ? "yes" : "no";
//=> undefined

allowed
//=> "no"
```

#### Block Statements

Statements intended to be executed after a control flow operation will be grouped into a **block statement**; they are placed inside curly braces:

```javascript

{
  console.log("hello");
  console.log("roar");
}
```

#### Block Scope

We will talk about scope in later lessons; basically it means a limited area of code that knows about a variable's existence. In the case of **block statements** in JavaScript, no scope is created, unlike in most other languages.

```javascript
var name = "gerry";
{
  var name = "jay";
}
console.log(name);
// => jay
```

Only functions introduce scope in Javascript.

---

<a name="codealong1"></a>
## Comparison Operators (20 min)

[Comparisons](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) in JavaScript can be made using `<`, `>`, `<=` and `>=`. These can be used for both strings and numbers. This can be either beneficial or frustrating to a developer, since most languages do not implicitly convert strings to numbers the way that JavaScript does.

```javascript
"A" > "a"
//=> false

"b" > "a"
//=> true

12 > "12"
//=> false

12 >= "12"
//=> true
```

#### Double-Equals Equality Operator `==`

Equality is a bit more complex. JavaScript provides two ways to verify equality.

When you verify equality using double-equals `==`, JavaScript performs much of the "type coercion" in the background. As we mentioned above, if the operands have a different type (e.g., the number `1` and the string `"1"`), JavaScript will attempt to change the type of both operands in order to check if they are equal. This means that expressions will often return equal more easily than if we were stricter about what things were equivalent. Some examples:

```javascript
"dog" == "dog";
//=> true

1 == true;
//=> true
```

#### Triple-Equals Equality Operator `===`

To avoid type coercion and to measure equality more strictly, **use the triple-equals operator**. Because `===` more truly measures actual equality, we should always use `===` instead of `==`, which is a legacy of the early days of JavaScript when people thought it might be useful to have an operator that does type coercion before checking equality, but that's pretty much never a good idea as it defeats the whole purpose of having data types.

> **Note:** "Sameness" and "equality" have various definitions, which can make the differentiation somewhat fuzzy. They can also differ by programming language. Because you'll often be measuring whether two things are equal, you should carefully investigate the way this works.

Some examples:

```javascript
1 === true;
//=> false

true === true;
//=> true

"hello" === "hello"
//=> true
```

However, there are some situations when `===` does not behave as we expect it to, for example when empty objects or arrays are involved:

```javascript
{} === {}
//=> Uncaught SyntaxError: Unexpected token ===

[] === []
//=> false

[1,7] === [1,7]
//=> false
```

**Explanation**

The examples in the second set fail equality tests because both **object literals** and **arrays** are objects, not just "primitive" values like strings, numbers, and Booleans. Objects and arrays are complex collections of values, and when we refer to them, we're actually referencing where they live in memory. That's why we call them "reference types." Strings and numbers are "value types."

What does this all mean? When we attempt to compare two objects or arrays with `===`, JavaScript doesn't care if they look like similar collections. It only compares whether or not they are the exact same object in memory. In each case above, checking for equality is actually comparing two objects that are in two different places in memory. They're not exactly "the same."

#### != and !==

There are also `!=` and `!==` operators, which are the negative versions of `==` and `===`. And again, we should always use `!==` and `===`, because they are more precise than `!=` and `==`.

---

<a name="codealong2"></a>

## Truthy and Falsey (15 min)

All of the following become false when converted to a Boolean:

- `false`
- `0`
- `""` (empty string)
- `NaN`
- `null`
- `undefined`

All other values become true when converted to a Boolean.

Do not confuse the primitive Boolean values `true` and `false` with the true and false values of the Boolean object. For example:

```javascript
var b = new Boolean(false);
if (b) { console.log("true") }
//=> true
```

There is a simple way of verifying the 'truthyness' or 'falseyness' of a value. When you add `!` in front of a value, the returned value will be the inverse of the value in a Boolean. So if you add two `!` then you'll get the Boolean value of the original one:

```javascript
!!1
//=> true

!!0
//=> false

!!-1
//=> true

!![]
//=> true

!!{}
//=> true

!!null
//=> false

!!""
//=> false
```

*Find more on truthy and falsey values [here](http://adripofjavascript.com/blog/drips/truthy-and-falsy-values-in-javascript.html)*

---

<a name="codealong3"></a>

## Boolean and Logical Operators (20 min)

When you feed Boolean values of `true` or `false` into logical operators, they will  return `true` or `false` based on a few rules.

There are two "binary" operators that require two values:

- **AND**, denoted `&&`
- **OR**, denoted `||`

A third "unary" operator requires only one value:

* **NOT**, denoted `!`

#### && (AND)

The `&&` operator requires both left and right values to be `true` in order to return `true`:

```javascript
true && true
//=> true
```

Any other combination is false.

```javascript
true && false
//=> false

false && false
//=> false
```

#### || (OR)

The `||` operator requires just one of the left or right values to be `true` in order to return true.

```javascript
true || false
//=> true

false || true
//=> true

false || false
//=> false
```

Only `false || false` will return `false`

The `!` takes a value and returns the opposite Boolean value:

```javascript
!(true)
//=> false
```

### Short-Circuit Logic

`&&` and `||` and `!` don't have to operate only on true or false -- they can operate on any values, and JavaScript will evaluate the truthyness or falseyness of the operands. In the case of `!`, it returns a Boolean true-or-false, but in the case of `&&` and `||`, it returns one of the original operands themselves, using short-circuit logic.

This means that the execution of the second operand is dependent on the execution of the first. This is useful for checking for null objects before accessing their attributes:

```javascript
var name = person && person.name;
```

In this case, if the first operand `person` is undefined, which is falsey, the second operand `person.name` will not be evaluated. The expression basically says, "We already know the whole `&&` expression is false, because `person` is falsey. Why bother dealing with the second operand?"

Short-circuit logic is also useful for setting default values:

```javascript
var name = person.name || "Bobby Default";
```

In this case, if the first operand `person.name` turns out to be falsey for any reason (probably because it's undefined or it's an empty string), `"Bobby Default"` will be returned. If `person.name` is truthy (probably because it's a non-empty string), it will be returned, and the second operand won't be evaluated. The expression basically says, "We already know the whole `||` expression is true, because `person.name` is truthy. Why bother dealing with the second operand?"

Further reference: [Mozilla Developer Network article on Logical operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators)


---

<a name="practice1"></a>
## Independent Practice (25 min)

When programming user interfaces, you will often need to display results based on a certain input. In this exercise, help the students design a program that will let users know what legal privileges U.S. citizens enjoy based on their age.

Write a program that outputs results based on users’ age. This exercise draws on if/else statements, Boolean logic, and comparison operators. See the conditions below:

- If you are under 16, you cannot do much outside of going to school
- If you are 16 or older, you can drive
- If you 18 or older, you can vote
- If you are 21 or older, you can drink alcohol
- If you are 25 or older, you can rent a car
- If you are 35 or older, you can run for president
- If you are 62 or older, you collect social security benefits

Have the program print out only the most recent thing that they've become eligible to do, i.e. if they are 46, only print "You can run for president." (This will at least force them to use `else if` instead of just `if`).

Students can work in pairs to complete the exercise. Check out the solution below.

>Note: If you are outside the U.S., adjust the conditions above to reflect the laws in your country.

**Solution**

```javascript
var age = 25;

if (age < 16) {
  console.log('You can go to school!')
} else if (age >= 16 && age < 18) {
  console.log('You can drive!');
} else if (age >= 18 && age < 21) {
  console.log('You can vote!');
} else if (age >= 21 && age < 25) {
  console.log('You can drink alcohol!');
} else if (age >= 25 && age < 35) {
  console.log('You can rent a car!');
} else if (age >= 35 && age < 62) {
  console.log('You can run for president!');
} else if (age >= 62) {
  console.log('You can collect social security!');
} else {
  console.log('Please enter a correct age value');
}

=> You can rent a car!
```

---
<a name="codealong4"></a>
## Switch Statements (25 min)

Now let's look at switch statements. These conditional statements can be used for multiple branches based on a number or string:

```javascript
var food = "apple";

switch(food) {
  case 'pear':
    console.log("I like pears");
    break;
  case 'apple':
    console.log("I like apples");
    break;
  default:
    console.log("No favorite");
}
//=> I like apples
```

In this case, the `switch` statement compares `food` to each of the cases (`pear` and `apple`) and evaluates the expressions beneath them if there is a match. It uses `===` to evaluate equality.

The default clause is optional.

## Switch Statement Usage

>To illustrate why programmers implement a switch statement—as opposed to if/else logic—compare these two approaches with the students.

#### Part 1: Construct If/Else Conditionals

Create an if/else statement that returns a string, such as "Awesome Job" if the user gets a grade of “A” or "Bad Job" if they get an "F." Console.log a string for each letter grade.

```javascript

var grade = 'C';

if (grade === 'A') {
  console.log('Awesome job');
} else if (grade === 'B') {
  console.log('Good job');
} else if (grade === 'C') {
  console.log('Okay job');
} else if (grade === 'D') {
  console.log('Not so good job');
} else if (grade === 'F') {
  console.log('Bad job');
} else {
  console.log('Unexpected grade value entered');
}

```

#### Part 2: Construct Similar Logic Using a Switch Statement

Using the if/else statement from above, convert it into a switch statement.

>Ask students to do this exercise individually.

```javascript
var grade = 'C';

switch (grade) {
  case 'A':
    console.log('Awesome job');
    break;
  case 'B':
    console.log('Good job');
    break;
  case 'C':
    console.log('Okay job');
    break;
  case 'D':
    console.log('Not so good job');
    break;
  case 'F':
    console.log('Bad job');
    break;
  default:
    console.log('Unexpected grade value entered');
}

```

#### Part 3: Which is Faster?

>Note: Prompt students to answer which format is faster. Be sure to elaborate on the number of computations run by each of the approaches. For example, when evaluating for `grade = 'C'` using the if/else approach, the condition (`grade === 'x'`) is evaluated three times. What if the if/else statement had 10 conditions? 100? How would this impact the speed of the program? Please see ['Writing Efficient JavaScript'](http://archive.oreilly.com/pub/a/server-administration/excerpts/even-faster-websites/writing-efficient-javascript.html) for more details.

#### Part 4: Intentionally `Break` the Switch Statement

As `break` statements play a major role in switch statements, rewrite the switch statement from Part 2 without any `break`'s:

```javascript
var grade = 'C';

switch (grade) {
  case 'A':
    console.log('Awesome job');
  case 'B':
    console.log('Good job');
  case 'C':
    console.log('Okay job');
  case 'D':
    console.log('Not so good job');
  case 'F':
    console.log('Bad job');
  default:
    console.log('Unexpected grade value entered');
}

=> Okay job
=> Not so good job
=> Bad job
=> Unexpected grade value entered
```

>Ask the students to explain what is occurring here. If you are unable to generate any responses, try changing the `grade` being evaluated from `'C'` to `'B'`:

```javascript
var grade = 'B';

switch (grade) {
  case 'A':
    console.log('Awesome job');
  case 'B':
    console.log('Good job');
  case 'C':
    console.log('Okay job');
  case 'D':
    console.log('Not so good job');
  case 'F':
    console.log('Bad job');
  default:
    console.log('Unexpected grade value entered');
}

=> Good job
=> Okay job
=> Not so good job
=> Bad job
=> Unexpected grade value entered
```

>Be sure to explain the purpose of the `break`, (i.e., to stop evaluating and break out of the `switch` statement after the condition has been met).

#### Part 5: Illustrate the Fall-Through Technique

You will often need to return the same value for different cases. The fall-through technique is one way to achieve this:

```javascript
var grade = 'C';

switch (grade) {
  case 'A':
  case 'B':
  case 'C':
    console.log('You passed!')
    break
  case 'D':
  case 'F':
    console.log('You failed')
    break
  default:
    console.log('Unexpected grade value entered')
}

=> You passed!
```
---

<a name="codealong5"></a>
## While and Do-While (10 min)

`While` is a loop statement that will run **while** a condition is true.

JavaScript has `while` loops and `do-while` loops. The first is useful for basic looping, but there's a possibility it will never get run. Using a `do-while` loop makes sure that the body of the loop is executed at least once, because `while()` isn't evaluated until after the block of code runs.

[rewrite of the paragraph above for clarity; please check for accuracy]
JavaScript has `while` loops and `do-while` loops. The first is useful for basic looping; however, it would forever remain inert without the `do-while` loop, which ensures that the body of the loop is executed at least once, because `while()` isn't evaluated until after the block of code runs.

[some of this below looks like it might be missing content…]
```javascript
while (true) {
  // an infinite loop!
}
```

This should be enough to break a browser.

```javascript
var input = 0;
do {
  console.log(input++);
} while (input < 10);
```
---
<a name="codealong6"></a>
## Iteration (15 min)

Iterating is a way of incrementally repeating a task.

#### for

You can iterate over an array with:

```javascript
var a = [1, 2, 3, 4, 5];
for (var i = 0; i < a.length; i++) {
  console.log(i);
}
```

If the array length is fixed (aka elements are not being added/removed which change the number of elements in the array), the previous loop is slightly inefficient because it is essentially looking up the length property once every loop. An improvement is to chain the `var` assignment:

```javascript
var a = [1, 2, 3, 4, 5];
for (var i = 0, len = a.length; i < len; i++) {
  console.log(i);
}
```

Notice the placement of the comma and semi-colons.

#### forEach

Another way of iterating over an array added with ECMAScript 5 is [`forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach):

```javascript
["dog", "cat", "hen"].forEach(function(currentValue, index, array) {
   console.log("I want a ", currentValue);
   console.log(array[index]);
});
```
---

<a name="practice2"></a>

## Fizz Buzz: Independent Practice (30 min)

Relying on your new-found knowledge of loops and if/else statements, incrementally build the common Fizz buzz loop. Fizz buzz is a math game designed to teach the concept of division. Create a program that will iterate through numbers 1 to 100 and log each number in the console.

>Hint: Read about [the Remainder Operator on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators) and figure out how to use it to simplify this problem.

Open the [fizzbuzz.js](starter-code/fizzbuzz.js) to get started.

> Note: Guide students with solutions below as they complete each step.

##### Step 1:

Construct a for loop that iterates through, and `console.log()`'s out, numbers 1 - 100:

```javascript
for (var num = 1; num <= 100; num++) {
  console.log(num);
}
```

##### Step 2:

Add an if/else statement that logs the string `"fizz"` if the value being iterated over is divisible by `3`; otherwise, log out the value:

```javascript
for (var num = 1; num <= 100; num++) {
  if (num % 3 === 0) {
    console.log('fizz');
  } else {
    console.log(num)
  }
}
```

##### Step 3:

Add an `else if` clause that logs the string `"buzz"` if the value being iterated over is divisible by `5`:

```javascript
for (var num = 1; num <= 100; num++) {
  if (num % 3 === 0) {
    console.log('fizz');
  } else if (num % 5 === 0) {
    console.log('buzz')
  } else {
    console.log(num)
  }
}
```

##### Step 4:

Add an additional `else if` clause that logs the string `"fizzbuzz"` if the value being iterated over is divisible by both `3` and `5`. __Note:__ this step is intentionally broken! Place the new `else if` __below__ the evaluations for `fizz` and `buzz`; after running the code, and experiencing the undesired results, prompt the students as to why the `fizzbuzz` evaluation never occurred.

```javascript
for (var num = 1; num <= 100; num++) {
  if (num % 3 === 0) {
    console.log('fizz');
  } else if (num % 5 === 0) {
    console.log('buzz')
  } else if (num % 15 === 0) {
    console.log('fizzbuzz')
  } else {
    console.log(num)
  }
}
```

##### Step 5:

Fix the above code to evaluate the `fizzbuzz` condition:

```javascript
for (var num = 1; num <= 100; num++) {
  if (num % 15 === 0) {
    console.log('fizzbuzz');
  } else if (num % 5 === 0) {
    console.log('buzz')
  } else if (num % 3 === 0) {
    console.log('fizz')
  } else {
    console.log(num)
  }
}
```

<a name="conclusion"></a>
## Conclusion (5 min)

These are some of the foundational tools you’ll use in many of your applications. You might need to study the exact syntax before it’s committed to your memory, but it's important that you remember these core "control flow" concepts, because every programming language you encounter will involve them.

#### Review

Make sure the lesson objectives have been met.

* Be able to explain if/else and switch statements as well as use cases.
* Differentiate between true, false, 'truthy', and 'falsey'.

#### Homework

The following homework assignments should be introduced before the end of class--make sure that students understand the goals of both exercises and have an opportunity to ask questions. The assignments should be due by the next class period--students should submit their completed assignments to the instructional team using Slack (either as links to GitHub repos or as attached .js files, depending on the class' comfort level with GitHub).

**Assignment 1: 99 Bottles of Beer**
- Write a script that prints the lyrics to "99 Bottles of Beer on the Wall" in the terminal. If you're unfamiliar with the song, you can [find the lyrics here](http://www.99-bottles-of-beer.net/lyrics.html).
- Make sure your program can handle both singular and plural cases (i.e. both "100 bottles of beer" and "1 bottle of beer").

**Assignment 2: Random Address Generator**
- Write a script that can generate random addresses
- As a first step, create arrays that contain dummy data for each of the following: street number, street name, city name, state name and zip code
- Your script should randomly select one item from each of these arrays and then use them to construct a random address
- Each time you run the script, it should print a new randomly-generated address to the terminal. For example:
- `node random-address.js`
- `=> 34578 Dolphin Street, Wonka NY, 44506`

#### Further Resources
- [Control Flow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [While](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)
