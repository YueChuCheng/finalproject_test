import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import $ from 'jquery'
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
      registerBool: '',
    }
  },
  getters: {
    registerBool: state => state.registered.registerBool,
    getregisterBool: state => {
      return state.registered.registerBool;
    },
    setvalue(value) {
      this.state.registered.registerBool = value;
    }
  }
  ,
  mutations: {
  },
  actions: {

    async loginWithGoogle() {

      //讀取資料
      let user = firebase.auth().currentUser.uid;
      let docRef = await firebase.firestore().collection("user").doc(user)
      try {
        let doc = await docRef.get();
        this.state.registered.registerBool = doc.data()
      }
      catch (error) {
        console.log("提取文件時出錯:", error);
      }
      
      var registerBool=this.state.registered.registerBool; //save registerBool in local varible 


      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(registerBool);
        if (registerBool!=undefined) {
          router.push('/')//if login change to home page
        }
        else {
          alert("你沒有註冊過喔");
          router.push('/register')//if not register ever change to register page
         
        }

      }).catch(function (error) {
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
        storename: $("input[name='name']").val(),
        address: $("input[name='address']").val(),
        tel: $("input[name='tel']").val(),
        time: $("input[name='time']").val(),
        registerBool: "true"
      });

    }
    ,
    async read() {
      let user = firebase.auth().currentUser.uid;
      let docRef = await firebase.firestore().collection("user").doc(user)
      try {
        let doc = await docRef.get();
        this.state.registered.registerBool = doc.data()
      }
      catch (error) {
        console.log("提取文件時出錯:", error);
      }
      console.log(this.state.registered.registerBool);
    }


  }
})
