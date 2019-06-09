<template>
    <div class="nav">
         <p>您好 {{registered.username}}</p>
        <router-link to="/">首頁</router-link> |
        <router-link to="/">菜單管理</router-link>|
        <router-link to="/">訂單管理</router-link>
    </div>
</template>


<style scoped>
    .nav{
        background-color: pink;
        height: 50px;
    }
    
</style>


<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
//add user's name at nav

export default {
    name:'Nav',
   computed: mapState(["registered"]),
}
</script>

