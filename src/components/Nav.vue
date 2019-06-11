<template>
  <div>
    <div v-if="!registerBool" class="nav">
      <p>您好 {{user.username}}</p>
      <router-link to="/">登入</router-link>|
      <router-link to="/">註冊</router-link>
    </div>

    <div v-if="registerBool" class="nav">
      <p>您好 {{user.username}}</p>
      <router-link to="/">菜單管理</router-link>|
      <router-link to="/">訂單管理</router-link>
    </div>
  </div>
</template>


<style scoped>
.nav {
  background-color: pink;
  height: 50px;
}
.nav_logined {
  display: none;
}
.nav_init {
  display: block;
}
</style>


<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import $ from "jquery";
//consol.log(registerBool);
//add user's name at nav

export default {
  name: "Nav",
  computed: { ...mapGetters(['registerBool']), ...mapState(["user"]) },
  watch: {
      
    //監聽是否在登入狀態
    registerBool: function(newValue, oldValue) {
      console.log(newValue, oldValue);
     
    }
  },

  methods: {
    updateStatus(status){
      if(status) {
        
      }
    }
  },

  created(){
    //console.log("Hi" + this.registerBool);
    this.updateStatus(this.registerBool);
  }
};
</script>

