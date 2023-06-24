


const { VITE_API_URL: baseUrl } = import.meta.env

const headers = { 'Content-Type': 'application/json' }


export const fetchService = {

  async get(endpoint) {

    const method = 'GET'
    const url = baseUrl + endpoint
    const options = { method, headers }

    return await this.fetchData(url, options)
  },

  async post(endpoint, data) {

    const method = 'POST'
    const url = baseUrl + endpoint
    const body = JSON.stringify(data)
    const options = { method, headers, body }

    return await this.fetchData(url, options)
  },

  async update(endpoint, data) {

    const method = 'PUT'
    const url = baseUrl + endpoint
    const body = JSON.stringify(data)
    const options = { method, headers, body }
      
    return await this.fetchData(url, options)
  },

  async delete(endpoint) {

    const method = 'DELETE'
    const url = baseUrl + endpoint
    const options = { method, headers }

    return await this.fetchData(url, options)
  },

  async fetchData(url, options) {

    // Crear un AbortController para cancelar el fetch
    // si se demora más de 5 segundos
    const controller = new AbortController()
    const { signal } = controller

    // Si la demora del fetch es mayor al timeout el fetch es cancelado
    setTimeout(() => controller.abort(), 5 * 1000)
 
    try {
      // Incluir el objeto signal dentro del objeto de opciones
      const response = await fetch(url, { ...options, signal })
      return response.json()

    } catch (error) {
      console.log(error)
    }
  }
}
