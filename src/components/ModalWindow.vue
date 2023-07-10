
<template>
  <teleport to="body">
    <transition>
      
      <dialog 
        v-if="showModal" 
        @click.self="$emit('close-modal')" 
        class="modal"
      >
        
        <article>

          <header>
            <slot name="header"/>
          </header>
          
          <footer>
            <slot name="footer"/>
          </footer>

        </article>

      </dialog>
    </transition>
  </teleport>
</template>


<script>

export default {

  props: {
    showModal: Boolean
  },

  emits: ['close-modal']
}

</script>



<style scoped>

dialog {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal > article {
  width: 29rem;
  margin: auto;
  padding: 20px 20px;
  background-color: snow;
  border-radius: 5px;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.4);
}

.modal > article > footer {
  border-radius: 0px 0px 5px 5px;
  border-top: 1px solid rgb(217, 217, 217);
  position: absolute;
  top: auto;
  left: 0;
  width: 100%;
  height: 5rem;
  padding: 0.5rem 1rem;
  background-color: rgb(238, 238, 238);
}

.v-enter-from, .v-leave-to {
  opacity: 0;
}

</style>
