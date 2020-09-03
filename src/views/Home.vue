<template>
  <div class="about">
    <div class="container">
      <h1>Beer List</h1>
      <h2>Welcome, {{ currentUser.email }}</h2>
      <hr>
      <BeerForm @edit-beer='beerUpdater' :currentBeer="currentBeer" />
      <ul>
        <li v-for="beer in beers" :key="beer.id">
          <div>
            {{ beer.data.name }}
            <img :src="beer.data.picture" />
            <button class="btn btn-warning"><router-link :to="{name: 'BeerComponent', params: {id: beer.id}}">Detalles</router-link></button>
            <button @click="deleteBeer(beer.id)" class="btn btn-danger">Borrar</button>
            <button @click="setCurrentBeer(beer)" class="btn btn-info">Editar</button>
          </div>
        </li>
      </ul>
      <hr>
      <button @click="returnLogin">Volver a Login Page</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BeerForm from '../components/BeerForm'

export default {
  data () {
    return {
      currentBeer: {
        data: {
          name: '',
          price: 0,
          picture: '',
        },
        id: undefined
      }
    }
  },
  components: {
    BeerForm
  },
  computed: {
    ...mapState(['currentUser', 'beers'])
  },
  methods: {
    ...mapActions(['setUser', 'setBeers', 'deleteBeer', 'updateBeer']),
    setCurrentBeer(beer){
      this.currentBeer = beer
    },
    beerUpdater(beer){
      this.updateBeer(beer),
      this.currentBeer.data.name = '',
      this.currentBeer.data.price = 0,
      this.currentBeer.data.picture = ''
    },
    returnLogin() { // boton al final de la pagina pára volver al login (añadido eva extra)
      this.$router.push('/login')
      this.setUser(undefined)
    }
  },
  created() {
    this.setBeers()
  }
}
</script>
