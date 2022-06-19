import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      isVisibleLogout: false,
      isVisibleLogin: true,
      isVisibleRegistration: true,
      userName: "",
      titleMessage: "",
      subTitleOfList: "Чтобы просмотреть ваши задачи, войдите в свою учетную запись или зарегистрируйтесь.",
      btnAddOfList: false,
      // userEmail: "",
    }
  },
  getters: {
    StBtnLogin(state) {
      return state.isVisibleLogin
    },

    StBtnLogout(state) {
      return state.isVisibleLogout
    },

    StBtnReg(state) {
      return state.isVisibleRegistration
    },

    StSubTitleOfList(state) {
      return state.subTitleOfList
    },

    StUserName(state) {
      return state.userName
    },

    StTitleMessage(state) {
      return state.titleMessage
    },

    StBtnAddOfList(state) {
      return state.btnAddOfList
    },
  },
  mutations: {
    updateBtnLogin(state, item) {
      state.isVisibleLogin = item
    },

    updateBtnLogout(state, item) {
      state.isVisibleLogout = item
    },

    updateBtnReg(state, item) {
      state.isVisibleRegistration = item
    },

    updateSubTitleOfList(state, item) {
      state.subTitleOfList = item
    },

    updateUserName(state, item) {
      state.userName = item
    },

    updateTitleMessage(state, item) {
      state.titleMessage = item
    },

    updateBtnAddOfList(state, item) {
      state.btnAddOfList = item
    },
  },
  actions: {
  },
  modules: {
  }
})

export default store;