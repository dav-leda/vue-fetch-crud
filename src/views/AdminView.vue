<template>

  <div v-if="products.length" class="table-view">

    <button 
      class="btn-add"

      @click="$router.push({ 
        name: 'form', 
        params: { id: 'new-product' } 
      })"

    >Agregar Producto</button>

    <TableComponent
      :products="products"
      @delete-product="openModal"  
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

  <div v-else-if="fetchError" class="error-msg">{{ fetchError }}</div>

  <div v-else class="spinner"></div>

</template>

<script>

import { mapGetters, mapActions } from 'vuex'

import TableComponent from '../components/TableComponent.vue'
import ModalWindow from '../components/ModalWindow.vue'


export default {

  components: {
    TableComponent, ModalWindow
  },

  data: () => ({ 
    // No es necesario declarar products
    // ya que el estado se inicializa en el store
    // products: [],
    showModal: false,
    productId: '',
    productName: ''
  }),

  created() {
    this.getProducts()
  },

  computed: {
    ...mapGetters('products', ['products', 'productById', 'fetchError'])
  },

  methods: {

    ...mapActions('products', ['getProducts', 'deleteProduct']),

    openModal(id) {
      this.showModal = true
      this.productId = id
      const product = this.productById(id)
      this.productName = product ? product.name : ''
    },

    confirmDelete() {      
      this.showModal = false
      this.deleteProduct(this.productId)
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
