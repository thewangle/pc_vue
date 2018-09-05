import { getToken, removeToken } from '@/utils/auth'
import { logout } from '../../service/common'

const user = {
  state: {
    token: getToken(),
    agent_id: '',
    agent_name: '',
    role_id: '', // 角色id
    role_name: '',
    user_name: '',
    user_id: ''
  },

  mutations: {
    SET_USERINFO: (state, user) => {
      state = {
        ...state,
        ...user
      }
      console.log(state)
    },
    CLEAR_USERINFO: (state) => {
      state.agent_id = ''
      state.agent_name = ''
      state.role_id = ''
      state.role_name = ''
      state.user_id = ''
      state.user_name = ''
    }
  },

  actions: {
    saveUserinfo({ commit, state }, user) {
      commit('SET_USERINFO', user)
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('CLEAR_USERINFO')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('CLEAR_USERINFO')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
