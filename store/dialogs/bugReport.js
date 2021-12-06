const state = () => {
  return {
    isDialogShow: false,
    isLoading: false,
  }
}

const getters = {
  getIsDialogShow: state => state.isDialogShow,
  getIsLoading: state => state.isLoading,
}

const mutations = {
  setIsDialogShow: (state, data) => (state.isDialogShow = data),
  setIsLoading: (state, data) => (state.isLoading = data),
}

const actions = {
  async createItem({ commit }, item) {
    commit('setIsLoading', true)

    await this.$axios
      .post(`${this.$config.apiEndpoint}/forms/bug-report`, item)
      .then(() => {
        commit('setIsDialogShow', false)
      })
      .finally(() => {
        commit('setIsLoading', false)
      })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
