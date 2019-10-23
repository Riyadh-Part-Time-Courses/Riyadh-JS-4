/*Work with a partner to create a monkey object, which has the following properties:
* name
* species
* foodsEaten
And the following methods:
* eatSomething(thingAsString)
* introduce: producers a string introducing itself, including its name, species, and what it's eaten.
Create 3 monkeys total. Make sure all 3 monkeys have all properties set and methods defined.
Exercise your monkeys by retrieving their properties and using their methods. Practice using both syntaxes
for retrieving properties (dot notation and brackets).
*/


let Monkey = {
name: "",
species = "",
foodsEaten ="",
eatSomething = function(food){ this.foodsEaten = food},
introduce = function(){return this.name+", "+this.species+", "+foodsEaten};

}
let m1 = Monkey();
let m2 = Monkey();
let m3 = Monkey();

m1.name ="Monkey 1";
m2.name ="Monkey 2";
m3.name ="Monkey 3";
