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
        router.push('/')//if login change to home page
       
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
        address:"台北市",
        tel: "0975975670",
        time:"7-11"
      });
    
    }
    ,
    read() {
      //將docRef包裝成return 變數
      //接取A.then()
      var r;
      function read(){
        var user = firebase.auth().currentUser.uid;
        var docRef = firebase.firestore().collection("user").doc(user);
        docRef.get().then(function(doc) {
          var i;
          i= doc.data()
          return i;

      })
      .catch(function(error) {
        console.log("提取文件時出錯:", error);
      });
        console.log(read);
  
       
      }
     
      read().then(r=i);
      console.log(r);
    }
   

  }
})
