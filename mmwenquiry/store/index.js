export const state = () => ({

  productID: 0,
  enqName: '',
  enqEmail: '',
  enqMsg: '',
  enqCompetitor: '',
  enqSize: ''

})

export const getters = {
}

export const mutations = {

  saveID(state, payload) {

    state.productID = payload.productID
    
  },

  saveEmail(state, payload) { state.enqEmail = payload.enqEmail },
  saveName(state, payload) { state.enqName = payload.enqName },
  saveMsg(state, payload) { state.enqMsg = payload.enqMsg },
  saveComp(state, payload) { state.enqComp = payload.enqComp },
  saveSize(state, payload) { state.enqSize = payload.enqSize }

}

export const actions = {
}