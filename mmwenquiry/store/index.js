export const state = () => ({

  productID: 0,
  enqName: '',
  enqEmail: '',
  enqMsg: '',
  enqComp: '',
  enqSize: '',
  enqCompURL: ''

})

export const getters = {
}

export const mutations = {

  saveID(state, payload) {

    state.productID = payload.productID
    
  },

  saveEmail(state, payload) { state.enqEmail = payload },
  saveName(state, payload) { state.enqName = payload },
  saveMsg(state, payload) { state.enqMsg = payload },
  saveComp(state, payload) { state.enqComp = payload },
  saveCompURL(state, payload) { state.enqCompURL = payload },
  saveSize(state, payload) { state.enqSize = payload }

}

export const actions = {
}