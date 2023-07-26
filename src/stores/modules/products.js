

// Importar servicios de acceso a la API
import { fetchService } from '@/services/fetchService'

// Crear el archivo .env en la raíz del proyecto
// con la variable de entorno VITE_API_URL
// VITE_API_URL=https://mi-token.mockapi.io/api

// Desestructurar la variable y redeclararla como baseUrl
const { VITE_API_URL: baseUrl } = import.meta.env

// Simular error en la llamada a la API
const baseUrl2 = 'https://token-inexistente.mockapi.io/api'

// Endpoint de productos dentro de MockApi
const endpoint = baseUrl + '/products';


export const products = {

  namespaced: true,

  state: {
    products: [],
    fetchError: null
  },

  getters: {
    products: state => state.products,
    getProductById: state => id => state.products.find(p => p.id === id),
    fetchError: state => state.fetchError
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

    setFetchError: (state, error) => {
      state.fetchError = error
    }
  },

  actions: {
    getProducts: ({ commit }) => {
      fetchService.get(endpoint)
        .then(products => products && commit('setProducts', products))
        .catch(error => commit('setFetchError', error))
    },

    createProduct: ({ commit }, product) => {
      fetchService.post(endpoint, product)
        .then(created => created && commit('createProduct', created))
        .catch(error => commit('setFetchError', error))
    },

    updateProduct: ({ commit }, product) => {
      fetchService.put(`${endpoint}/${product.id}`, product)
        .then(updated => updated && commit('updateProduct', updated))
        .catch(error => commit('setFetchError', error))
    },

    deleteProduct: ({ commit }, id) => {
      fetchService.delete(`${endpoint}/${id}`)
        .then(() => commit('deleteProduct', id))
        .catch(error => commit('setFetchError', error))
    }
  }
}

