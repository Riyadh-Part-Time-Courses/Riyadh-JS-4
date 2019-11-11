/* Independent Practice

Making a favorites list: event delegation


Refactor the code below.

The difference will be: use event delegation so that you only have
to set one event listener for all the items once, when the
code first runs, and you don't have to add any others whenever
someone adds an item.

Bonus: When the user mouses over each item, the item should turn grey. Don't use CSS hovering for this.

*/

function addToList($list, thing) {
  var $thingLi = $('<li>').html(thing);
  addCompleteLink($thingLi);
  $list.append($thingLi);
}

function addCompleteLink($li) {
  var $completedLink = $('<span>').html(' complete task').addClass('complete-task');
  $li.append($completedLink);
  $completedLink.on('click', function(event) {
    $li.addClass('completed');
    $completedLink.html('');
  });
}

$(document).ready(function() {
  var $thingList = $('#fav-list');
  var $things = $('.fav-thing');
  var $button = $('#new-thing-button');
  var $newThingInput = $('#new-thing');

  $things.toArray().forEach(function(li) {
    addCompleteLink($(li));
  });

  $button.on('click', function(event) {
    event.preventDefault();
    var newThing = $newThingInput.val();
    if (newThing === '') {
      alert('You must type in a value!');
    } else {
      addToList($thingList, newThing);
      $newThingInput.val('');
    }
  });
});
