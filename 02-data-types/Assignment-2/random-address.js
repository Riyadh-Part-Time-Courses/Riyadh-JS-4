let streetNumber = ['1600' , '317', '1757', '21100'];
let streetName = ['Main Street Unit 123', 'Hill Haven Drive', 'Pheasant Ridge Road' , 'S State St #SPC 61'];
let cityName = ['Schenectady', 'Seattle', 'Philadelphia', 'San Jacinto'];
let stateName= ['NY', 'WA', 'PA', 'CA'];
let zipCode = ['12345[-1234]', '98161', '19146', '92583'];
let streetNumberRandom = Math.floor(Math.random() * streetNumber.length);
let streetNameRandom = Math.floor(Math.random() * streetName.length);
let cityNameRandom = Math.floor(Math.random() * cityName.length);
let stateNameRandom = Math.floor(Math.random() * stateName.length);
let zipCodeRandom = Math.floor(Math.random() * zipCode.length);

console.log(streetNumber[streetNumberRandom] + ' , ' +
streetName[streetNameRandom] + ' , ' +
cityName[cityNameRandom] + ' , ' +
stateName[stateNameRandom] + ' , ' +
zipCode[zipCodeRandom]);