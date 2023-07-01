<template>
  
  <table>

    <thead>
      <th>Nombre</th>
      <th>Imagen</th>
      <th class="center">Precio</th>
      <th class="center">Stock</th>
      <th class="center">Editar</th>
      <th class="center">Eliminar</th>
    </thead>

    <tbody>
      <tr v-for="product in products" :key="product.id">

        <td class="product-name">{{ product.name }}</td>
        
        <td>
          <img
            loading="lazy"
            @load="$event.target.style.opacity = 1" 
            class="product-img"
            :src="product.imgsrc" 
            :alt="product.name" 
          >
        </td>
        
        <td class="product-price">$ {{ product.price }}</td>
        
        <td class="center">{{ product.stock }}</td>
        
        <td>
          <button 
            class="btn-primary"

            @click="$router.push({ 
              name: 'form', 
              params: { id: product.id } 
            })"

          >Editar</button>
        </td>
       
        <td>
          <button 
            class="btn-danger"
            @click="$emit('delete-product', product.id)"
          >Eliminar</button>
        </td>

      </tr>
    </tbody>
  </table>
</template>

<script>

export default {

  props: {
    products: {
      type: Array
    }
  }
}
</script>

<style scoped>

.product-img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1s ease;
}

.product-name {
  width: 10rem;
}

.product-price {
  text-align: center;
  width: 5rem;
}

</style>
