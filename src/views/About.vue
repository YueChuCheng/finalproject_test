<template>
  <div class="about">
    <h1>This is an about page</h1>
    <form name="form_name" id="form_name">
      <label>Name</label>
      <input type="text" name="name">
      <button @click="set()">Add</button>
    </form>
    <br>

    <label>Read</label>
    <br>
    <button @click="read()">read</button>
  </div>
</template>



<script >
import { namesRef } from "../firebase";
import "../firebase";
export default {
  methods: {
    set() {
      var form = document.getElementById("form_name");
      var user = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref("users/" + user)
        .set({
          username: form.name.value
        });
    },

    read() {
      var user = firebase.auth().currentUser.uid;

      return firebase
        .database()
        .ref("/users/" + user)
        .once("value")
        .then(function(snapshot) {
          var username =
            (snapshot.val() && snapshot.val().username) || "Anonymous";
          console.log(username);
        });
    }
  }
};
</script>
