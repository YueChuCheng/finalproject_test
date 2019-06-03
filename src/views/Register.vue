<template>
  <div class="register">
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
import {mapActions}from 'vuex';
import "../firebase";
export default {
  methods: {
  ...mapActions(['set']),
  ...mapActions(['read'])
  }
};
</script>
