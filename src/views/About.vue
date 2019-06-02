<template>
  <div class="about">
    <h1>This is an about page</h1>
    <form name="form_name" id="form_name">
      <label >Name</label>
      <input type="text" name="name" />
      <button @click="set()">Add</button>
      </form>
  </div>
  
</template>
<script >
import {namesRef} from '../firebase';
import '../firebase'
export default {
  methods:{

    set(){
      var form = document.getElementById("form_name");
      var user = firebase.auth().currentUser;
      user.providerData.forEach(function (profile) {
      firebase.database().ref('users/' + profile.uid).set({
      username: form.name.value,
    
        });
      });
  

    }


  }


}
</script>
