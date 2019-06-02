import firebase from 'firebase/app';

let config = {
    apiKey: "AIzaSyCGHT41JjCdzyOyvWY6r5MtF66PWQe010k",
    authDomain: "finalprojecttest-ce7e0.firebaseapp.com",
    databaseURL: "https://finalprojecttest-ce7e0.firebaseio.com",
    projectId: "finalprojecttest-ce7e0",
    storageBucket: "finalprojecttest-ce7e0.appspot.com",
    messagingSenderId: "783315037094",
    appId: "1:783315037094:web:a770e6899697a0c2"
 
}

firebase.initializeApp(config);

window.firebase=firebase;