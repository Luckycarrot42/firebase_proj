import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: undefined,
    beers: [],
    beer: undefined
  },
  mutations: {
    SET_USER(state, user){
      state.currentUser = user
    },
    SET_BEERS(state, beers){
      state.beers = beers
    },
    SET_BEER(state, beer){
      state.beer = beer
    }
  },
  actions: {
    setUser({commit}, user) {
      commit('SET_USER', user)
    },
    setBeers({commit}) {
      Axios.get('https://us-central1-proyectotest-bd0ba.cloudfunctions.net/api/beers/')
      .then((response) => {
        commit('SET_BEERS', response.data)
      })
    },
    setBeer({commit}, id) {
      Axios.get(`https://us-central1-proyectotest-bd0ba.cloudfunctions.net/api/beers/${id}`)
      .then((response) => {
        commit('SET_BEER', response.data) //commit llama a mutaciones
      })
    },
    submitBeer({dispatch}, beer) {
      Axios.post('https://us-central1-proyectotest-bd0ba.cloudfunctions.net/api/beers/', beer)
      .then(() => {
        dispatch('setBeers') //dispatch llama a otras acciones
      })
    },
    deleteBeer({dispatch}, id) {
      Axios.delete(`https://us-central1-proyectotest-bd0ba.cloudfunctions.net/api/beers/${id}`)
      .then(() => {
        dispatch('setBeers') //dispatch llama a otras acciones
      })
    },
    updateBeer({dispatch}, beer) {
      Axios.put(`https://us-central1-proyectotest-bd0ba.cloudfunctions.net/api/beers/${beer.id}`, beer.data)
      .then(() => {
        dispatch('setBeers') //dispatch llama a otras acciones
      })
    }
  },
  modules: {
  }
})
