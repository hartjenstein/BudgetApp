import * as firebase from 'firebase';


// Initialize Firebase
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };


  
firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };

/* 
database.ref('expenses').on('child_changed', (snapshot) => {
console.log(snapshot.key, snapshot.val());
}, (err) => {
  console.log('ERROR', err);
});

database.ref('expenses').on('child_added', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
  }, (err) => {
    console.log('ERROR', err);
  }); */


/* database.ref('expenses').on('value', (snapshot) => {
  const expenses = [];
  snapshot.forEach((childSnapshot) => {
    expenses.push({
      id: childSnapshot.key,
      ...childSnapshot.val()
    });
  });
  console.log(expenses)
}, (err) => {
  console.log('ERROR', err);
}); */

/* setTimeout(() => {
  database.ref('expenses/-LLZ7UKz__QlVLloIuDz').update({
    amount: 93330000000
  })
}, 3000); */

  // Setup "expenses" with three items (description, note, amount, createdAt)
  
/*   database.ref('expenses').push({
    description: 'Rent',
    note: '',
    amount: 109500,
    createdAt: 976123498763
  });
  
  database.ref('expenses').push({
    description: 'Phone bill',
    note: '',
    amount: 5900,
    createdAt: 976123498763
  });
  
  database.ref('expenses').push({
    description: 'Food',
    note: '',
    amount: 1200,
    createdAt: 976123498763
  }); */
  
  
  
  
  
  // database.ref('notes/-Krll52aVDQ3X6dOtmS7').remove();
  
  // database.ref('notes').push({
  //   title: 'Course Topics',
  //   body: 'React Native, Angular, Python'
  // });
  
  // database.ref().on('value', (snapshot) => {
  //   const val = snapshot.val();
  //   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
  // })
  
  // Setup data sub -> Andrew is a Software Developer at Amazon.
  
  // Change the data and make sure it reprints
  
  // database.ref('location/city')
  //   .once('value')
  //   .then((snapshot) => {
  //     const val = snapshot.val();
  //     console.log(val);
  //   })
  //   .catch((e) => {
  //     console.log('Error fetching data', e);
  //   });
  
  // database.ref().set({
  //   name: 'Andrew Mead',
  //   age: 26,
  //   stressLevel: 6,
  //   job: {
  //     title: 'Software developer',
  //     company: 'Google'
  //   },
  //   location: {
  //     city: 'Philadelphia',
  //     country: 'United States'
  //   }
  // }).then(() => {
  //   console.log('Data is saved!');
  // }).catch((e) => {
  //   console.log('This failed.', e);
  // });
  
  // database.ref().update({
  //   stressLevel: 9,
  //   'job/company': 'Amazon',
  //   'location/city': 'Seattle'
  // });
  
  // database.ref()
  //   .remove()
  //   .then(() => {
  //     console.log('Data was removed');
  //   }).catch((e) => {
  //     console.log('Did not remove data', e);
  //   });