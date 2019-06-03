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
      var user = firebase.auth().currentUser.uid;
       
      firebase
        .database()
        .ref("/users/" + user)
        .on("value", (snapshot) => {
          this.state.registered.registerBool =  snapshot.val().registerBool;

        });
         
      // loading set to true
      this.loading = true;
      // clear old errors
      this.errors = [];

      try {
        //• 利用ﬁrebase.auth().signInWithPopup()函數， 並且傳遞ﬁrebase.auth.GoogleAuthProvider() 物件就會導向Google的登入畫面
        //• 如果登入成功就會回覆response變數 
        let response = await firebase
          .auth()
          .signInWithPopup(new firebase.auth.GoogleAuthProvider());
        this.user = response.user;
        //• 登入成功後，利用Vue-Router提供的 router.push(“/“)即可直接導覽到Main.vue畫面
        this.loading = false;
        if(this.state.registered.registerBool==true){
          router.push("/");
          console.log(this.state.registered.registerBool);
        }
        else{
          router.push("/register");
          console.log(this.state.registered.registerBool);
          
        }
        
      } catch (error) {
        this.errors.push(error.message);
        this.loading = false;
      }
    },
    set() {
      var form = document.getElementById("form_name");
      var user = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref("users/" + user)
        .set({
          username: form.name.value,
          registerBool: true
        });
    }
    ,
    //read() {
//
    //  var user = firebase.auth().currentUser.uid;
    //  
//
    //  firebase
    //    .database()
    //    .ref("/users/" + user)
    //    .on("value", async (snapshot) => {
    //      this.state.registered.registerBool =await snapshot.val().registerBool;
//
    //    });
    //  
//
//
    //}
  }
})
