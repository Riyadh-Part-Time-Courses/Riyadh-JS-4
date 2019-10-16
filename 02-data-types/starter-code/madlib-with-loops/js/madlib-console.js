
// console.log('A startup that is ' + startupX[random1] + ', but for ' + startupY[random2]);
var favorites = new Array();
document.getElementById('create').onclick = startup;
document.getElementById('save').onclick = save;
document.getElementById('print').onclick = print;

function startup(){
    var startupX = ['Uber', 'Google', 'Amazon', 'Apple', 'Facebook', 'Twitter', 'Arwa'];
var startupY = ['Arwa' ,'Slack', 'Trello', 'Tesla', 'Hyperloop', 'Harvest'];

var random1 = Math.floor((Math.random() * startupX.length));
var random2 = Math.floor((Math.random() * startupY.length));

var str = 'A startup that is ' + startupX[random1] + ', but for ' + startupY[random2];
var h1 = document.getElementById("xForY");
h1.innerText = str;

}

function save(){
    var h1 = document.getElementById("xForY");
    favorites.push(h1.textContent);
}
function print(){
    var h2 = document.getElementById("favorites");
    h2.innerText = favorites.toString('\n');
}