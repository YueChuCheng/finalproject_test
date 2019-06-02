import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: {
      email: "",
      password: "",
      errors: [],
      loading: false,
      user: ""
    }
  },
  mutations: {

  },
  actions: {
    async loginWithGoogle() {
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
        router.push("/");
      }catch(error){
        this.errors.push(error.message);
        this.loading=false;
      }
    }
  }
})
