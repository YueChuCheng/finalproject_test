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
    async read() {
      //將docRef包裝成return 變數
      //接取A.then()
     let user =firebase.auth().currentUser.uid;
      let docRef = await firebase.firestore().collection("user").doc(user)
       try{
         let doc =await docRef.get();
         this.state.registered.registerBool= doc.data()
       }
       catch(error){
        console.log("提取文件時出錯:", error);
       }
        console.log(this.state.registered.registerBool.tel);
    }
   

  }
})
