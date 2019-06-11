<template>
  <div class="login">
    <!-- 當login時順便取得使用者資料做顯示 -->
    <button @click="doLogin">loginWithGoogle</button>
    <br>
    <button @click="signout">signout</button>
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
  ...mapActions(['updateBool']),
  ...mapActions(['loginWithGoogle']),
  ...mapActions(['readUser']),  
  ...mapActions(['signout']),
  ...mapActions(['set']),
  ...mapActions(['read']),

    async doLogin(){
      let status = await this.loginWithGoogle();
      console.log(status);
      this.readUser();
      if(status === 'login')
        this.$router.push({path: '/'}) //if not register ever change to register page
      else if(status === 'register')
        this.$router.push({path: '/register'}) //if not register ever change to register page

    }
  }
  
};


</script>
