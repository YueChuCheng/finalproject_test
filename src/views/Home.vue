<template>
  <div class="home">
    <Nav/>
    <img alt="Vue logo" src="../assets/logo.png">
    {{storeSet[0].Adress}}
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
  computed: { ...mapState(["login"]), ...mapGetters(["storeSet"]) },
  methods: {
    ...mapActions(["read"]),
    ...mapActions(["loginWithGoogle"])
  },

  components: {
    Nav
  },
  created() {
    this.read();
  }
};
</script>
