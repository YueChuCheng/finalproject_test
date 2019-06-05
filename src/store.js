import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: {
      email: "",
      password: "",
      errors: [],
      loading: false,
      user: ""
    },
    registered: {
      userid: '',
      registerBool:'',
    }
  },
  getters: {
    registerBool: state => state.registered.registerBool,
    getregisterBool: state => {
      return state.registered.registerBool;
    },
    setvalue(value){
      this.state.registered.registerBool=value;
    }
  }
  ,
  mutations: {
  },
  actions: {
    async loginWithGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    
    },
    set() {
      var user = firebase.auth().currentUser.uid;
      firebase.firestore().collection("user").doc(user).set({
        storename: "好食",
        date: "2010",
        desctiption: "本劇改編自阿瑟·柯南·道爾爵士家喻戶曉的推理小說，一位脾氣古怪的大偵探在現代倫敦的街頭悄悄巡行，四處搜尋線索。",
        actors: ["班尼迪克·康柏拜區", "馬丁·費曼"],
      });
    
    }
    ,
    read() {

      var docRef = firebase.firestore().collection("movies").doc("新世紀福爾摩斯");
      docRef.get().then(function(doc) {
      if (doc.exists) {
        console.log(doc.data());
      } else {
        console.log("找不到文件");
      }
    })
    .catch(function(error) {
      console.log("提取文件時出錯:", error);
    });
      


    }
  }
})
