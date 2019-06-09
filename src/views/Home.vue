<template>
  <div class="home">
   <Nav />
    <img alt="Vue logo" src="../assets/logo.png">
    <br>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "../components/Nav";
import firebase from "firebase";
import { mapActions } from "vuex";
import { mapState } from "vuex";
export default {
  name: "home",
  computed: mapState(["login"]),
  methods: mapActions(["loginWithGoogle"]),

  components: {
    Nav
  }
};
</script>
