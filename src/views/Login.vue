<template>
  <div class="login">
    <button @click="loginWithGoogle">loginWithGoogle</button>
   
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
  computed:mapState(['login']),
  methods: {
  ...mapActions(['loginWithGoogle']),  
  ...mapActions(['set']),
  ...mapActions(['read'])
  }
};
</script>
