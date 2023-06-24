<template>

  <div v-if="products.length" class="table-view">

    <button 
      class="btn-add"

      @click="$router.push(
        { 
          name: 'form', 
          params: { id: 'new-product' } 
        }
      )"
    >Agregar Producto</button>

    <TableComponent
      :products="products"
      @delete-product="deleteProduct"  
    />

    <ModalWindow
      :showModal="showModal" 
      @close-modal="showModal = false"
    >
      <template #header>
        <h4 class="m-1">
          ¿Estás seguro de que deseas <strong>eliminar</strong> este producto?
        </h4>
        <h4 class="ml-1 mb-3">
          Producto: <strong>{{ productName }}</strong>
        </h4>
      </template>

      <template #footer>
        <button 
          @click="confirmDelete"
          class="btn-delete"
        >Confirmar</button>

        <button 
          @click="showModal = false"
          class="btn-cancel"
        >Cancelar</button>
      </template>

    </ModalWindow>

  </div>

  <div v-else class="spinner"></div>

</template>

<script>

import TableComponent from '../components/TableComponent.vue'
import ModalWindow from '../components/ModalWindow.vue'


import { fetchService as ax } from '../services/fetchService'

export default {

  components: {
    TableComponent, ModalWindow
  },

  data: () => ({ 
    products: [],
    showModal: false,
    productId: '',
    productName: ''
  }),

  async created() {
    this.products = await ax.get('/products')
  },

  methods: {
    deleteProduct(id) {
      this.showModal = true
      this.productId = id
      this.productName = this.products.find(p => p.id === id).name
    },

    async confirmDelete() {
      this.showModal = false
      const endpoint = `/products/${this.productId}`
      const res = await ax.delete(endpoint)
      console.log(res)

      this.products = this.products.filter(product => {
        return product.id !== this.productId
      })
    }
  }
}
</script>

<style scoped>

.table-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn-add {
  margin-top: 2rem;
  background-color: navy;
  padding: 1rem 2rem;
}

.btn-delete {
  background-color: darkred;
  float: right;
  margin-top: 1rem;
  margin-right: 1rem;
}

.btn-cancel {
  background-color: darkgreen;
  float: right;
  margin-top: 1rem;
  margin-right: 1rem;
}

</style>
