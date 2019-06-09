<template>
  <div class="register">
    <h2>註冊</h2>
    <form name="form_name" id="form_name">
      <label>店名</label>
      <input type="text" name="name" required>
     
    </form>
    <form name="address" id="address">
      <label>地址</label>
      <input type="text" name="address" required>
     
    </form>
    <form name="tel" id="tel">
      <label>TEL</label>
      <input type="text" name="tel" required>
   
    </form>
    <form name="time" id="time">
      <label>外送時間</label>
      <input type="text" name="time" required>
    
    </form>
     <form name="img" id="img">
      <label>選擇照片</label>
      <input type="text" name="img" required>
      
    </form>
    <br>
    <button @click="set()">Add</button>
    <br>

    <label>Read</label>
    <br>
    <button @click="read(),readfirebase()">read</button>
  </div>
</template>



<script >

import {mapState}from 'vuex';
import {mapActions}from 'vuex';
import "../firebase";
export default {
  
  methods: { 
  ...mapActions(['set']),
  ...mapActions(['read']),
    ...mapActions(['readfirebase'])
  }
};
</script>
