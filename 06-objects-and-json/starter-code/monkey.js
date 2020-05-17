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


let Monkey1 = {
name: "",
species: "",
foodsEaten:"",
eatSomething:function(food){ this.foodsEaten = food},
introduce: function(){ return this.name+", "+this.species+", "+this.foodsEaten}
}

let Monkey2 = {
    name: "",
    species: "",
    foodsEaten:"",
    eatSomething:function(food){ this.foodsEaten = food},
    introduce: function(){ return this.name+", "+this.species+", "+this.foodsEaten}
    }
let Monkey3 = {
        name: "",
        species: "",
        foodsEaten:"",
        eatSomething:function(food){ this.foodsEaten = food},
        introduce: function(){ return this.name+", "+this.species+", "+this.foodsEaten}
}


Monkey1.name ="Monkey 1";
Monkey2.name ="Monkey 2";
Monkey3.name ="Monkey 3";

Monkey1.species ="Species 1";
Monkey2.species ="Species 2";
Monkey3.species ="Species 3";

Monkey1.eatSomething("Bnana");
Monkey2.eatSomething("Apple");
Monkey3.eatSomething("Bread");

console.log("Name1: "+ Monkey1.name);
console.log("Name1: "+ Monkey1["name"]);

console.log("Monkey1: "+ Monkey1.introduce());
console.log("Monkey2: "+ Monkey2.introduce());
console.log("Monkey3: "+ Monkey3.introduce());
