// '99 bottles of beer on the wall, 99 bottles of beer.'
// Take one down and pass it around, 98 bottles of beer on the wall.';

let strPlural1 = ' bottles of beer on the wall, ';
let strPlural2 = ' bottles of beer.'
let strPlural3 = 'Take one down and pass it around, ';
let strPlural4 = ' bottles of beer on the wall.';

let strSingular1 = ' bottle of beer on the wall, ';
let strSingular2 = ' bottle of beer.'
let strSingular3 = 'Take one down and pass it around, ';
let strSingular4 = ' bottle of beer on the wall.';

for(let i=99; i>= 0; i--){
if(i != 1 && i !=0){
    console.log(i + strPlural1 + i + strPlural2);
    console.log(strPlural3 + (i-1) + strPlural4);
}
else if(i == 1 ) { 
    console.log(i + strSingular1 + i + strSingular2);
    console.log(strSingular3 + 'no more' + strSingular4);
}
else {
    console.log('No more' + strPlural1 + 'no more' + strSingular2);
    console.log('Go to the store and buy some more, 99 bottles of beer on the wall'); 
}
}