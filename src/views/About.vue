<template>
  <div class="about">
    <h1>This is an about page</h1>
      <label >Name</label>
      <input type="text" v-model="name" />
      <button @click="set()">Add</button>
  </div>
</template>
<script >
import {namesRef} from '../firebase';
import '../firebase'
export default {
  methods:{

    set(){
      var user = firebase.auth().currentUser;
      user.providerData.forEach(function (profile) {
      firebase.database().ref('users/' + profile.uid).set({
      username: "testsadfas",
    
        });
      });
  

    }


  }


}
</script>
