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
    registered:{
      userid:'',
      registerBool:false
    }
  },
  getters:{
    registerBool: state=>state.registered.registerBool,
    getregisterBool: state=>{
      return state.registered.registerBool;
    }
  }
  ,
  mutations: {
  },
  actions: {
    async loginWithGoogle() {
      // loading set to true
      this.loading = true;
      // clear old errors
      this.errors = [];
      if(this.state.registered.registerBool===false){
      try {
        //• 利用ﬁrebase.auth().signInWithPopup()函數， 並且傳遞ﬁrebase.auth.GoogleAuthProvider() 物件就會導向Google的登入畫面
        //• 如果登入成功就會回覆response變數 
        let response = await firebase
          .auth()
          .signInWithPopup(new firebase.auth.GoogleAuthProvider());
        this.user = response.user;
        //• 登入成功後，利用Vue-Router提供的 router.push(“/“)即可直接導覽到Main.vue畫面
        this.loading = false;
        router.push("/login");
      }catch(error){
        this.errors.push(error.message);
        this.loading=false;
      }}
      else{
        
        router.push("/");
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
          registerBool:true
        });
    },
    read() {
      
          var user = firebase.auth().currentUser.uid;
          
          this.state.registered.registerBool=false;
          console.log(this.state.registered.registerBool);
          return firebase
            .database()
            .ref("/users/" + user)
            .once("value")
            .then(function(snapshot) {
              var username =
                (snapshot.val() && snapshot.val().username) || "Anonymous";
              console.log(username);
            });
        }
  }
})
