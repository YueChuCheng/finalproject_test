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
    store: {
      storeSet: [],//儲存Home店家資訊
      storClick:""
    },

    registerBool: false//是否在登入狀態

    ,
    user: {//儲存註冊資訊
      username: '',//儲存登入後用戶名稱
      userid: ''

    }
  },
  getters: {
    storeSet: state => state.store.storeSet,
    registerBool: state => state.registerBool,
  }
  ,
  mutations: {


  },
  actions: {
    updateBool(){
      console.log("yesss")
      this.state.registerBool = true;
    },

    async init({ commit }) {
      commit('INIT')
    },


    signout() {
      firebase.auth().signOut();
    },

    async loginWithGoogle() {
      //self=this 可用此方法於firebase函式中取得state變數


      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      
      var res = await firebase.auth().signInWithPopup(provider).then(async function (result) { //以非同步函示才能取得接收值
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        //var user = result.user;
        // ...
        let user = firebase.auth().currentUser.uid;//取得使用者uid
        let doc = await firebase.firestore().collection("user").doc(user).get()


        if (doc.data().registerBool == "true") { //若曾經註冊
          console.log("login successful")
          return 'login';
        }
        else {//若未註冊
          alert("需註冊才能使用店家功能!");
          return 'register';
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

      return res//回傳跳哪一頁的值
    },

    async readUser() { //登入時讀取User資料
      var user = firebase.auth().currentUser.uid;
      let docRef = await firebase.firestore().collection("user").doc(user)
      try {
        let doc = await docRef.get();
        this.state.user.userid = user; //填入User uid
        this.state.user.username = doc.data().storename;//填入User Name
        this.state.registerBool = true;//若登入則設為true        
        
      }
      catch (error) {
        console.log("提取文件時出錯:", error);
      }
    }

    ,
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
      let docRef = await firebase.firestore().collection("Restaurant1").doc("Info")
      try {
        let doc = await docRef.get();
        return doc.data();

      }
      catch (error) {
        console.log("提取文件時出錯:", error);
        return false;
      }
    }


  }
})
