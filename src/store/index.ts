import { message } from 'ant-design-vue';
// import { state } from './../../../electronic-health-book-web-admin-develop/electronic-health-book-web-admin-develop/src/store/state';
import { createStore } from 'vuex'
import Api from '@/axios/axios'
import axios from 'axios'

export default createStore({
  state: {
    currentUser: {},
    users: [],
    accounts: [],
    auth: false
  },
  getters: {
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users
    },
    LOGOUT_USER(state) {
      state.currentUser = {}
      window.localStorage.currentUser = JSON.stringify({});
    },
    SET_AUTH_LOGIN(state) {
      state.auth = true
    },
    SET_AUTH_LOGOUT(state) {
      state.auth = false
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user
      window.localStorage.currentUser = JSON.stringify(user);
    },
    SET_ACCOUNTS(state, account) {
      state.accounts = account.data
      // state.accounts
      window.localStorage.acc = JSON.stringify(account);
    },
    ADD_ACCOUNT(state, { createdAccount }) {
      state.accounts = state.accounts.concat(createdAccount)
    },
    DELETE_ACCOUNT(state, key) {
      // state.accounts = state.accounts.filter(acc => key === acc.id)
    }
  },
  actions: {
    async loadUser({ commit }) {
      let response = await Api().get('api/users');
      let users = response.data.data;
      commit('SET_USERS', users)
    },
    async getCurrentUser({ commit }) {
      let response = await Api().get('api/users/me', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      let user = response.data
      commit('SET_CURRENT_USER', user)
    },
    loadCurrentUser({ commit }) {
      let user = JSON.parse(window.localStorage.currentUser);
      commit('SET_CURRENT_USER', user)
    },
    logoutUser({ commit }) {
      localStorage.removeItem('token')
      commit('LOGOUT_USER')
      commit('SET_AUTH_LOGOUT')
    },
    async loginUser({ commit }, fromState) {
      try {
        let response = await axios.post('http://localhost:1337/api/auth/local', fromState)
        let user = response.data.user
        localStorage.setItem('token', response.data.jwt);
        commit('SET_CURRENT_USER', user)
        commit('SET_AUTH_LOGIN')
        return user
      } catch (error) {
        console.log(fromState);
        return { error: 'Username/Password is incorrect' }
      }
    },
    async getAllAccount({ commit }) {
      let response = await Api().get('user')
      let accounts = response
      commit('SET_ACCOUNTS', accounts)
    },
    async addAccount({ commit }, form) {
      try {
        let response = await Api().post('user', form,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }
        )
        let createdAccount = response.data
        console.log(form);
        console.log(response);
        commit('ADD_ACCOUNT', { createdAccount })
        return createdAccount
      } catch (error) {
        return { error: 'Wrong' }
      }
    },
    async deleteAccount({ commit }, key) {
      try {
        let response = await Api().delete(`/user/${key}`)
        let deletedAccount = response.data
        return deletedAccount
      } catch (error) {
        return { error: 'Wrong' }
      }
    },
    async updateAccount({ commit }, { form, key }) {
      try {
        let response = await Api().put(`/user/${key}`, form)
        let updateAccount = response.data
        return updateAccount
      } catch (error) {
        return { error: 'Wrong' }
      }
    }
  },

  modules: {
  }
})
