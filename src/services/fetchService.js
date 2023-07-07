
const headers = { 'Content-Type': 'application/json' }

export const fetchService = {

    error: null,
    
    async get(url) {
      const method = 'GET'
      const options = { method, headers }
      return await this.fetchData(url, options)
    },

    async post(url, data) {
      const method = 'POST'
      const body = JSON.stringify(data)
      const options = { method, headers, body }
      return await this.fetchData(url, options)
    },

    async put(url, data) {
      const method = 'PUT'
      const body = JSON.stringify(data)
      const options = { method, headers, body }
      return await this.fetchData(url, options)
    },

    async delete(url) {
      const method = 'DELETE'
      const options = { method, headers }
      return await this.fetchData(url, options)
    },

    async fetchData(url, options) {

      this.error = null
    
      // Si el servidor no responde en menos de 5 segundos
      // abortar la petición
      const controller = new AbortController()
      const { signal } = controller
      setTimeout(() => controller.abort(), 5000)

      try {
        const res = await fetch(url, { ...options, signal })
        return res.json()
        
      } catch (err) {
        this.error = err.message
        console.log(err)
      }
    }
}
