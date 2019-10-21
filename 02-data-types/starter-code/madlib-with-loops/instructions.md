# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) JavaScript Development: Madlibs Exercise

Have you ever heard someone describe a startup as being "Like Uber for puppies" or "Like Amazon for kittens"? In this exercise, you'll be building a website that auto-generates madlib sayings like "A startup that is `X` but for `Y`". Here's what we've given you to get started:

* A JavaScript file ("madlib-console.js") that contains two arrays (`startupX` and `startupY`) that are pre-populated with startup names (feel free to add some of your own as well!). The JavaScript file also contains two variables (`random1` and `random2`) that will randomly select startup names from those arrays. Finally, at the bottom of the JavaScript file, there's a line of code that will log "A startup that is `X` but for `Y`" out to the console.

* An HTML file that contains a few elements you will want to use:
  * An `h1` with an ID of `XforY`--this is where your finished madlib saying will go.
  * Buttons that are labeled "Create new startup," "Favorite Startup" and "Print favorites".

* A CSS file, which contains some basic styling. You shouldn't need to do anything with this file (unless you want to tweak the styling).

## Minimum Requirements

Your job is to add code to the JavaScript file that makes the "Create new startup" button work. Basically, when the user clicks that buttons, your JavaScript should generate a new madlib saying, which should appear inside the `XforY` h1.

  * In order to complete this task, you will need to know a little bit about DOM manipulation. If this isn't something you've covered yet in class, you may want to wait until you've covered DOM manipulation before you try to tackle this exercise. If, however, you'd like to get a head start, feel free to [check out this tutorial](http://www.javascriptkit.com/javatutors/dom2.shtml), which should contain everything you need to get started.

## Stretch Goals

Were you able to meet the minimum requirements for the exercise? Want an additional challenge? Here are two more features you can implement in your JavaScript:

* Add functionality to make the "Favorite Startup" button work--when the "Favorite Startup" button is clicked, it should save that madlib saying to an array.

* Add functionality to make the "Print favorites" button work--when the "Print favorites" button is clicked, it should display all of the favorited startups in the array underneath the h2 with an ID of `favorites`.
