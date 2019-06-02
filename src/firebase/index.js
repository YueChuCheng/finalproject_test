import firebase from 'firebase/app';

let config = {
    apiKey: "AIzaSyDHw4dwSe3ZCsq8YCSELcD5sbHLWkh0hf8",
  authDomain: "test-write-c7062.firebaseapp.com",
  databaseURL: "https://test-write-c7062.firebaseio.com",
  projectId: "test-write-c7062",
  storageBucket: "test-write-c7062.appspot.com",
  messagingSenderId: "369128448444",
  appId: "1:369128448444:web:de14c546b005e292"
 
}

firebase.initializeApp(config);
window.firebase=firebase;


