import firebase from 'firebase/app';

let config = {
  apiKey: "AIzaSyBe2QWeHqJvjkSurqXhqZuU-qqyaOCC4KY",
  authDomain: "test-firestore-847fa.firebaseapp.com",
  databaseURL: "https://test-firestore-847fa.firebaseio.com",
  projectId: "test-firestore-847fa",
  storageBucket: "test-firestore-847fa.appspot.com",
  messagingSenderId: "1067319899742",
  appId: "1:1067319899742:web:8c701210401314f8"
 
}

firebase.initializeApp(config);
window.firebase=firebase;
var db = firebase.firestore();
//
//export const db = firebase.database();
//export const namesRef = db.ref('name');
