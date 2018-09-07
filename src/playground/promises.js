
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('This is my data');
  }, 2000);
 
});
console.log('before');
promise.then((data) => {
  console.log(data);
});

console.log('after')