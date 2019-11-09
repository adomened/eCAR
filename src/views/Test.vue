<template lang="html">
  <div class="container py-5 bg-success">
    <div class="row">
      <div class="col-12">
        <h2 class="mt-5">Goal</h2>
        <router-link to="/geolocation" class="btn btn-success btn-md mb-4">
          <span class="btn-inner--icon">
            <i class="fa fa-map-marker mr-2"></i>
          </span>
          Alquilar
        </router-link>
        <button class="btn btn-primary mb-4" @click.prevent="updateCount" type="button" name="button">updateCount</button>
        <p class="font-weight-bold"><mark>{{ count }} € euros</mark></p>
        <input type="text" @keydown.prevent="onKeydown" v-model="quantity">
        <button class="btn btn-primary btn-sm boton" @click.prevent="increment" type="button" name="button">increment</button>

        <blockquote class="blockquote">
          <p class="mb-0 text-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
          <footer class="blockquote-footer text-secondary">Someone famous in <cite title="Source Title">Source Title</cite></footer>
        </blockquote>
        <button class="butt" @click="fetchResults" type="button">fetchResults</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import toSource from 'tosource'

const KEY_DOWN = 40
const KEY_UP = 38
const ESCAPE = 27
const CHAR_A = 65

export default {
  name: 'Test',
  props: {
    slug: String
  },
  data () {
    return {
      count: 0,
      quantity: 0,
      value: null,
      req: {},
      res: {}
    }
  },
  methods: {
    getMessages () {
      if (this.req.user.isLoggedIn()) {
        return this.res.send('Yay')
      }
      this.res.send('Ooops. You need to log in to access this page')
    },
    async fetchResults () {
      // console.log(toSource(axios.get));
      const response = await axios.get('mock/service')
      this.value = response.data
    },
    updateCount () {
      this.count += 1
    },
    increment () {
      // console.log('hola 2')
      this.quantity += 1
    },
    decrement () {
      // console.log('hola 3')
      this.quantity -= 1
    },
    clear () {
      // console.log('hola 4')
      this.quantity = 0
    },
    onKeydown (e) {
      if (e.keyCode === ESCAPE) {
        // console.log('hola')
        this.clear()
      }
      if (e.keyCode === KEY_DOWN) {
        this.decrement()
      }
      if (e.keyCode === KEY_UP) {
        this.increment()
      }
      if (e.which === CHAR_A) {
        this.quantity = 13
      }
    }
  },
  watch: {
    quantity: function (newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>

<style>
</style>
