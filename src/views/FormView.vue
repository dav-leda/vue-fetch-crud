<template>

<div class="product-form" v-if="product">

  <label for="name">
    Producto:
    <input 
      type="text"
      maxlength="300"
      required 
      id="name" 
      v-model="product.name" 
      :placeholder="product.name"
      :class="{ error: !product.name }"
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
      required 
      min="100"
      id="price" 
      v-model.number="product.price" 
      :placeholder="product.price"
      :class="minError(product.price, 1000)"
    >
  </label>

  <label for="stock">
    Stock:
    <input 
      type="number"
      required
      min="1" 
      id="stock" 
      v-model.number="product.stock" 
      :placeholder="product.stock"
      :class="minError(product.stock, 2)"
    >
  </label>

  <label for="imgsrc">
    URL de la imagen:
    <input 
      type="text"
      required
      maxlength="200" 
      id="imgsrc" 
      v-model="product.imgsrc" 
      :placeholder="product.imgsrc"
      :class="{ error: !product.imgsrc }"
    >
  </label>

  <button
    class="add-btn"
    :class="{ added }"
    @click="addOrUpdateProduct"
  > {{ btnText }} </button>

</div>

<div v-else-if="fetchError" class="error-mg">{{ fetchError }}</div>

<div v-else class="spinner"></div>
  
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

import { placeholderProduct } from '@/mock-data'

export default {

  data: () => ({ 
    product: null,
    added: false
  }),

  created() {
    const id = this.$route.params.id

    this.product = this.newProduct 
      ? placeholderProduct 
      : this.productById(id)
  },

  computed: {

    ...mapGetters('products', ['productById', 'fetchError']),

    newProduct() {
      return this.$route.params.id === 'new-product'
    },

    btnText() {
      if (this.newProduct) {
        return this.added 
          ? 'Agregado' 
          : 'Agregar Producto'

      } else {
        return this.added 
          ? 'Actualizado' 
          : 'Actualizar Producto'
      }
    }
  },

  methods: {

    ...mapActions('products', ['createProduct', 'updateProduct']),

    addOrUpdateProduct() {
      this.added = true;
      this.newProduct 
        ? this.createProduct(this.product)
        : this.updateProduct(this.product)
    },

    minError(value, min) {
      return value < min ? 'error' : ''
    }
  }
}

</script>

<style scoped>

.error {
  border: 1px solid red;
  outline: none;
  box-shadow: 0 0 6px 5px red;
}


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
