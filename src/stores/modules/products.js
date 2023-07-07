
import { fetchService } from '@/services/fetchService'

// Crear el archivo .env en la raíz del proyecto
// con la variable de entorno VITE_API_URL
// VITE_API_URL=https://mi-token.mockapi.io/api

// Desestructurar la variable y redeclararla como baseUrl
const { VITE_API_URL: baseUrl } = import.meta.env

// Endpoint de productos dentro de MockApi
const endpoint = baseUrl + '/products';


export const products = {

  namespaced: true,

  state: {
    products: []
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

    updateProduct: (state, product) => {
      const index = state.products.findIndex(p => p.id === product.id)
      state.products.splice(index, 1, product)
    },

    deleteProduct: (state, id) => {
      state.products = state.products.filter(product => product.id !== id)
    },
  },

  actions: {
    getProducts: async ({ commit }) => {
      const products = await fetchService.get(endpoint)
      commit('setProducts', products)
      console.log({products})
    },

    createProduct: async ({ commit }, product) => {
      const newProduct = await fetchService.post(endpoint, product)
      commit('createProduct', newProduct)
      console.log({newProduct})
    },

    updateProduct: async ({ commit }, product) => {
      const updated = await fetchService.put(`${endpoint}/${product.id}`, product)
      commit('updateProduct', updated)
      console.log({updated})
    },

    deleteProduct: async ({ commit }, id) => {
      const deleted = await fetchService.delete(`${endpoint}/${id}`)
      commit('deleteProduct', id)
      console.log({deleted})
    }
  }
}

