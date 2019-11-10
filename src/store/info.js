import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo: (state, info) => {
      state.info = info
    },
    clearInfo: state => { state.info = {} }
  },
  actions: {
    async fetchInfo ({ dispatch, commit }) {
      try {
        let uid = await dispatch('getUserId')
        let info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('setInfo', info)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateInfo ({ dispatch, commit, getters }, infoForUpdate) {
      try {
        let uid = await dispatch('getUserId')
        let infoData = { ...getters.info, ...infoForUpdate }
        await firebase.database().ref(`/users/${uid}/info`).update(infoData)
        commit('setInfo', infoData)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    info: s => s.info
  }
}
