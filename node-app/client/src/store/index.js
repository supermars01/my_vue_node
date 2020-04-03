import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const type = {
  SET_AUTHENTICATION: "SET_AUTHENTICATION", //判断是否认证通过
  SET_USER: 'SET_USER',
}
const state ={ 
  isAuthentication: false, //授权
  user: {},
  UserId: '',
  websit: 'http://localhost:5000'
}
const getters ={
  isAuthentication:state => state.isAuthentication,
  user: state => state.user,
  UserId: state => state.UserId
}
const mutations ={
  [type.SET_AUTHENTICATION](state,isAuthentication) {
    if(isAuthentication) state.isAuthentication = isAuthentication;
    else state.isAuthentication = false;
  },

  [type.SET_USER](state,user) {
    if(user) state.user = user;
    else state.user = {};
  },
  setUserId(state,UserId) {
    state.UserId = UserId
  }

}

const actions = { //异步操作
  setAuthentication: ({commit},isAuthentication) => {
    commit(type.SET_AUTHENTICATION,isAuthentication);
  },
  setUser:({commit},user) => {
    commit(type.SET_USER,user);
  },
  //退出登录清除状态
  clearCurrentState:({commit}) => {
    commit(type.SET_AUTHENTICATION,false);
    commit(type.SET_USER,null)
  },
  setUserId:({commit},UserId) => {
    commit('setUserId',UserId);
  },
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
