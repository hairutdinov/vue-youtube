import firebase from 'firebase/app'

export default {
  actions: {
    async createCategory ({ commit, dispatch }, { name, limit }) {
      try {
        const uid = await dispatch('getUserId')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ name, limit })
        return { name, limit, id: category.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategories ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUserId')
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        // let categoriesArr = []
        // Object.keys(categories).forEach(key => {
        //   categoriesArr.push({ name: categories[key]['name'], limit: categories[key]['limit'], id: key })
        // })
        // return categoriesArr
        return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoryById ({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUserId')
        const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
        return {
          ...category, id
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory ({ commit, dispatch }, { id, name, limit }) {
      try {
        const uid = await dispatch('getUserId')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ name, limit })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
