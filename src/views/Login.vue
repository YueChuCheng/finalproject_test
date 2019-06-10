<template>
  <div class="login">
    <button @click="loginWithGoogle();/*read()*/">loginWithGoogle</button>
    <br>
    <button @click="signout()">signout</button>
    <br>

    <label>Read</label>
    <br>
    <button @click="read()">read</button>
  </div>
</template>



<script >

import {mapState}from 'vuex';
import {mapActions}from 'vuex';
import "../firebase";
export default {
  computed:{
    ...mapState(['login']),
    ...mapState(['registerBool'])
    },
  methods: {
  ...mapActions(['loginWithGoogle']),  
  ...mapActions(['signout']),
  ...mapActions(['set']),
  ...mapActions(['read'])
  }
  
};


</script>
