import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import $ from 'jquery'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: { //儲存firestore資料
      email: "",
      password: "",
      errors: [],
      loading: false,
      user: ""
    },
    store:{
      storeSet:[]
    }
    ,
    registered: {//儲存註冊資訊
      registerBool: '', //是否曾經註冊bool
      username:''//儲存登入後用戶名稱
    }
  },
  getters: {
    storeSet:state=>state.store.storeSet,
  }
  ,
  mutations: {

    //let docRef = await firebase.firestore().collection("user").doc(user)
    //  try {
    //    let doc = await docRef.get();
    //    this.state.registered.registerBool = doc.data()
    //  }
    //  catch (error) {
    //    console.log("提取文件時出錯:", error);
    //  }
     INIT(){
      let docRef =  firebase.firestore().collection("Restaurant1").doc("Info")
      try {
        let doc =  docRef.get();
        console.log(doc);
        let n=doc.data().Adress;
        
        state.store.storeSet.push(n);
        
      }
      catch (error) {
        console.log("提取文件時出錯:", error);
      }

      //state.store.storeSet.push(firebase.firestore().collection("Restaurant1").doc(Info));
    }

  },
  actions: {
    async init({ commit }) {
      commit('INIT')
  },


    signout(){
      firebase.auth().signOut();
    },
    async loginWithGoogle() { 
      //讀取資料
      //let docRef = await firebase.firestore().collection("user").doc(user)
      //let user = firebase.auth().currentUser.uid;
      //try {
      //  let doc = await docRef.get();
      //  this.state.registered.registerBool = doc.data()
      //}
      //catch (error) {
      //  console.log("提取文件時出錯:", error);
      //}
      //
      //var registerBool=this.state.registered.registerBool; //save registerBool in local varible

      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        //var user = result.user;
        // ...
        let user = firebase.auth().currentUser.uid;
        let docRef =  firebase.firestore().collection("user").doc(user).get();
        
        console.log( docRef);
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
      //
     
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
     // let user = firebase.auth().currentUser.uid;
      let docRef = await firebase.firestore().collection("Restaurant1").doc("Info")
      try {
        let doc = await docRef.get();

        console.log(doc.data());
        this.state.store.storeSet.push(doc.data());
        console.log(this.state.store.storeSet);
      }
      catch (error) {
        console.log("提取文件時出錯:", error);
      }
      //console.log(this.state.registered.registerBool);
      
     // this.state.registered.username=this.state.registered.registerBool.storename;
      //console.log(this.state.registered.username);
    }


  }
})
