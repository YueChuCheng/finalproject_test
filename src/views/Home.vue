<template>
  <div class="home">
    <Nav/>
    <img alt="Vue logo" src="../assets/logo.png">
    <p>店名: {{hello.Name}}</p>
    <p>地址: {{hello.Adress}}</p>
    <p>外送時間: {{hello.OpenTime}}</p>
    <p>電話: {{hello.TEL}}</p>
    <!-- 按下查看店家資訊案件 儲存店家ID -->
    <button @click="save('太和豆漿ID')">submit</button>
    <br>
  </div>
</template>



<script>
// @ is an alias to /src
import Nav from "../components/Nav";
import firebase from "firebase";
import { mapActions } from "vuex";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "home",
  data(){
    return {
      hello: {
        Name: "",
        Adress: "",
        OpenTime: "",
        TEL: ""
      }
    } 
  },
  computed: { ...mapState(["login"]), ...mapGetters(["storeSet"]) },
  methods: {
    ...mapActions(["read"]),
    ...mapActions(["loginWithGoogle"]),
    save(storeString){ //按下查看店家資訊案件 儲存店家ID
      this.$store.state.store.storClick=storeString;
      console.log(this.$store.state.store.storClick);
    }
  },
  components: {
    Nav
  },
  async created() {
    this.hello = await this.read();
  
  }
};
</script>
<style scoped>
img {
  margin-top: 200px;
}
</style>
