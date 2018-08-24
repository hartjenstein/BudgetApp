//Object destructuring

/* console.log('destructuring');

const person = {
    name: 'Andrew',
    age: 26,
    location: {
        city: 'Philadelphia',
        temp: 92
    }
};
// [name = 'anonymous'] set default value 
// [age: userAge] renaming variable 
const {name = 'anonymous', age: userAge} = person;
console.log(`${name} is ${userAge}`) */

/* const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
}
const {name: publisherName = 'selfpublished'} = book.publisher;

console.log(publisherName); */

//
//
//Array destructuring

const adress = ['1299 s juniper street', 'philadelphia', 'pennsilvania', '10973'];

// setting default value - phone = '0123'
const [,city, country, zip, phone = '0123'] = adress;

console.log(`You are in ${city} ${country}, phone: ${phone}`)