
import ax from 'dedalo-ax'

const { VITE_API_URL: baseUrl } = import.meta.env
const endpoint = baseUrl + '/products';


export const products = {

  namespaced: true,

  state: {
    products: [],
  },

  getters: {
    products: state => state.products,
    productById: state => id => state.products.find(p => p.id === id)
  },

  mutations: {
    setProducts: (state, products) => {
      state.products = products
    },
    createProduct: (state, product) => {
      state.products.push(product)
    },
    deleteProduct: (state, id) => {
      state.products = state.products.filter(product => product.id !== id)
    },
    updateProduct: (state, product) => {
      const index = state.products.findIndex(p => p.id === product.id)
      state.products.splice(index, 1, product)
    }
  },

  actions: {
    getProducts: async ({ commit }) => {
      const products = await ax.get(endpoint)
      commit('setProducts', products)
    },
    createProduct: async ({ commit }, product) => {
      const res = await ax.post(endpoint, product)
      commit('createProduct', res)
      console.log({res})
    },
    deleteProduct: async ({ commit }, id) => {
      console.log({id})
      const res = await ax.delete(`${endpoint}/${id}`)
      commit('deleteProduct', id)
      console.log({res})
    },
    updateProduct: async ({ commit }, product) => {
      const updated = await ax.put(`${endpoint}/${product.id}`, product)
      commit('updateProduct', updated)
      console.log({updated})
    }
  }
}

