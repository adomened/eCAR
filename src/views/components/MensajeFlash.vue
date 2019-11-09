<template lang="html">
  <div v-if="errors || error" class="mb-0">
    <base-alert :class="{'rounded-0' : noRounded}" :type="typeAlert" :dismissible="dismissible" v-on:dismiss-alert="quitAlert">
        <span class="alert-inner--icon text-center d-block mr-0">
          <i :class="icono"></i>
        </span>
        <span v-if="error" class="alert-inner--text text-center w-100"><strong>{{messageStrong}}</strong> {{error}} </span>
        <span v-if="errors" class="alert-inner--text w-100">
          <span class="alert-inner--text">
            <strong>{{messageStrong}}</strong>
            Se ha producido un problema en los siguientes campos:
          </span>
          <ul class="mb-0">
            <li v-for="err in errors">{{ err }}</li>
          </ul>
        </span>
        <button v-if="dismissible" type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </base-alert>
  </div>
</template>

<script>
export default {
  name: 'MensajeFlash',
  data () {
    return {
      mutableError: this.error,
      mutableErrors: this.errors
    }
  },
  props: {
    dismissible: {
      type: Boolean,
      default: false,
      description: 'if you can quit the alert text'
    },
    messageStrong: {
      type: String,
      default: 'Informacion ',
      description: 'header text'
    },
    typeAlert: {
      type: String,
      default: 'default',
      description: 'Alert type (e.g default, danger, warning, info)'
    },
    errors: {
      type: Array,
      default: undefined,
      description: 'Array\'s error'
    },
    error: {
      type: String,
      default: undefined,
      description: 'error'
    },
    icono: {
      type: String,
      description: 'icono',
      default: 'ni ni-like-2'
    },
    noRounded: {
      type: Boolean,
      description: 'selector rounded-0'
    }
  },
  methods: {
    quitAlert () {
      this.mutableError = this.mutableErrors = undefined
    }
  }
}
</script>

<style lang="css">
</style>
