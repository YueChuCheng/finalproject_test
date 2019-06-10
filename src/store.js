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
      storeSet: []
    }
    ,
    registered: {//儲存註冊資訊
      registerBool: '', //是否曾經註冊bool
      username: ''//儲存登入後用戶名稱
    }
  },
  getters: {
    storeSet: state => state.store.storeSet,
  }
  ,
  mutations: {

    
  },
  actions: {
    async init({ commit }) {
      commit('INIT')
    },


    signout() {
      firebase.auth().signOut();
    },
    async loginWithGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      firebase.auth().signInWithPopup(provider).then( async function (result) { //以非同步函示才能取得接收值
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        //var user = result.user;
        // ...
        let user = firebase.auth().currentUser.uid;//取得使用者uid
        let doc =await firebase.firestore().collection("user").doc(user).get()
        console.log(doc.data().registerBool);//取得是否曾經註冊的bool值

        if (doc.data().registerBool == "true") { //若曾經註冊
          router.push('/')//if login change to home page
        }
        else {//若未註冊
          alert("需註冊才能使用店家功能!");
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
     
      let docRef = await firebase.firestore().collection("Restaurant1").doc("Info")
      try {
        let doc = await docRef.get();
        this.state.store.storeSet.push(doc.data());
    
      }
      catch (error) {
        console.log("提取文件時出錯:", error);
      }
    }


  }
})
