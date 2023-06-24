<template>

<div class="product-form" v-if="product">

  <label for="name">
    Producto:
    <input 
      type="text"
      maxlength="300" 
      id="name" 
      v-model="product.name" 
      :placeholder="product.name"
    >
  </label>

  <label for="description">
    Descripción:
    <textarea
      maxlength="1000" 
      id="description" 
      v-model="product.description" 
      :placeholder="product.description"
    ></textarea>
  </label>

  <label for="price">
    Precio:
    <input 
      type="number" 
      min="100"
      id="price" 
      v-model.number="product.price" 
      :placeholder="product.price">
  </label>

  <label for="stock">
    Stock:
    <input 
      type="number"
      min="1" 
      id="stock" 
      v-model.number="product.stock" 
      :placeholder="product.stock"
    >
  </label>

  <label for="imgsrc">
    URL de la imagen:
    <input 
      type="text"
      maxlength="100" 
      id="imgsrc" 
      v-model="product.imgsrc" 
      :placeholder="product.imgsrc">
  </label>

  <button
    class="add-btn"
    :class="btnColor"
    @click="addOrUpdateProduct"
  > {{ btnText }} </button>

</div>

<div v-else class="spinner"></div>
  
</template>

<script>

import { fetchService as ax } from '../services/fetchService'

const placeholderProduct = {
  name: 'Chocotorta',
  description: 'Con chocolinas.',
  price: 1000,
  stock: 1,
  imgsrc: 'https://dav-leda.github.io/images-bakery/chocotorta.jpg'
}


export default {

  data: () => ({ 
    product: null,
    added: false
  }),

  async created() {

    const id = this.$route.params.id
    const endpoint = `/products/${id}`

    if (id === 'new-product') {
      this.product = placeholderProduct
    } else {
      this.product = await ax.get(endpoint)
    }
  },

  computed: {
    btnText() {
      const newProduct = 
        this.$route.params.id === 'new-product'
      
      if (newProduct) {
        return this.added 
          ? 'Agregado' 
          : 'Agregar Producto'

      } else {
        return this.added 
          ? 'Actualizado' 
          : 'Actualizar Producto'
      }
    },

    btnColor() {
      return this.added ? 'added' : ''
    }
  },

  methods: {
    async addOrUpdateProduct() {

      this.added = true

      const newProduct = 
        this.$route.params.id === 'new-product'

      const id = newProduct
        ? ''
        : this.$route.params.id;

      const endpoint = `/products/${id}`

      const res = newProduct
        ? await ax.post(endpoint, this.product)
        : await ax.update(endpoint, this.product)

      console.log(res)
    }
  }
}

</script>

<style scoped>

label {
  display: block;
  margin-bottom: 1rem;
}

input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

textarea {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  height: 5rem;
}

.add-btn {
  margin: 2rem auto;
  padding: 1rem 2rem;
  background-color: navy;
  font-weight: bold;
  width: 26rem;
  height: 3.4rem;
}

.added {
  background-color: darkgreen;
  cursor: default;
}
.product-form {
  margin: 2rem auto;
  padding: 1rem 2rem;
  max-width: 30rem;
  font-weight: bold;
}
.back-icon {
  cursor: pointer;
  margin: 8rem 1rem 0rem 2rem;
}
</style>
