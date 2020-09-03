<template>
  <div>
    <h3>Ingresar cerveza al registro</h3>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input v-model="currentBeer.data.name" type="text" class="form-control" placeholder="Name">
      </div>
      <div class="form-group">
        <label for="price">Precio</label>
        <input v-model="currentBeer.data.price" type="number" class="form-control" placeholder="Price">
      </div>
      <div class="form-group">
        <label for="picturelink">Enlace a Imagen</label>
        <input v-model="currentBeer.data.picture" type="text" class="form-control" placeholder="Link to Image">
      </div>
      <button class="btn btn-primary">{{ currentBeer.id ? 'Editar' : 'Crear' }}</button> 
    </form>  
  </div>  
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'beer-form',
  props: {
    currentBeer:{
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions(['submitBeer']),
    submitForm() {
      if(this.currentBeer.id) { //si existe id, editamos
        this.$emit('edit-beer', this.currentBeer) 
      }else{ //si no, creamos nueva beer
        this.createBeer() 
      }
      debugger
      this.cleanCurrentBeer()
    },
    createBeer() {
      const beer = {
        name: this.currentBeer.data.name,
        price: this.currentBeer.data.price,
        picture: this.currentBeer.data.picture
      }
      this.submitBeer(beer)  //metodo del store que realiza comunicacion con  
    },
    cleanCurrentBeer() {
      this.currentBeer.data.name = '',
      this.currentBeer.data.price = 0,
      this.currentBeer.data.picture = ''
      this.currentBeer.id = undefined
    }
  },
}
</script>

<style>

</style>