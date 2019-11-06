// ########################################################
// ######################## jQuery ########################
// ########################################################
// Using DOM transversal and chaining jQuery methods

// .parent();
$(".box-example-3").parent().css("background-color", "red");

// .child();
$("#container-parent").children().css("background-color", "orange");

// .siblings();
// Note that if you use a selector that is present on all siblings, they all get the JS effect
$(".box-example-1").siblings().css("background-color", "green");
$(".box-example-2").siblings("#box-1").css("background-color", "green");

// .next() and .prev()
$("#box-20").prev().css("background-color", "green");
$("#box-20").next().css({
  "background-color": "yellow",
  "color": "black"
});

// .find()
// You should try never to use find()
// It's very expensive computationally because JS has to search your document to find the element
$("#that-crazy-element").find("span").css("color", "red");



// .child() with click event
// Notice how we select clickable element separately from the children() instruction
// But why does it jump to the top of the page like that when we click?
// Anchor links that don't go anywhere by default go to the top of the page
// ***How do we prevent that default behavior?***
$("#pink-clicker").click(function() {
  $("#container-parent-2").children().css("background-color", "pink");
});

// Use $(event).preventDefault() - it will stop the default event from propagating to the DOM
$("#orange-clicker").click(function() {
  $("#container-parent-3").children().css("background-color", "orange");
  event.preventDefault();
});
