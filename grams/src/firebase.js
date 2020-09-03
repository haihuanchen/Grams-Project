import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDrD_VkAaEf10gCVsDfibo7zj39SUFN3iE",
    authDomain: "grams-project.firebaseapp.com",
    databaseURL: "https://grams-project.firebaseio.com",
    projectId: "grams-project",
    storageBucket: "grams-project.appspot.com",
    messagingSenderId: "752767577379",
    appId: "1:752767577379:web:c2cd083a8e6ce397267096",
    measurementId: "G-X9R9TQG7KY"
  });
  
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage, firebase} ;