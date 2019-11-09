<template lang="html">
  <div class="border-top pb-3 px-3">
    <div class="row text-center">
      <!-- <div class="col border-superior ml-lg-5 ml-md-5 ml-0"></div> -->
      <h4 class="col-12 text-primary py-2 mb-0">
        Consultoria telemática
      </h4>
      <!-- <div class="col border-superior mr-lg-5 mr-md-5 mr-0"></div> -->
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <p>Pulse <kbd class="bg-primary">Nuevo mensaje</kbd> para resolver sus dudas referentes
          al tema que especificaste al iniciar una consulta.
          Si considera que su duda no esta cubierta en temas tratados anteriormente, puede abrir
          una nueva consulta;
          pulse <kbd class="bg-primary">Nueva consulta</kbd></p>
      </div>
    </div>

    <div class="row justify-content-center" id="nueva-consulta">
      <div class="col-auto">
        <base-button v-show="!openQuery" size="lg" type="primary" class="border-0 no-translate-y mr-0 mb-3" @click.prevent="showNewQueryInput">
          <i class="fa fa-comments mr-2" aria-hidden="true"></i>
          Nueva consulta
        </base-button>
        <base-button v-show="openQuery" size="lg" type="danger" class="border-0 no-translate-y mr-0 mb-3" @click.prevent="showNewQueryInput">
          <i class="fa fa-comments mr-2" aria-hidden="true"></i>
          Cancelar
        </base-button>
      </div>
    </div>

    <consulta-input :label="label" class="mb-3 mx-0" color="secondary" @query="newQuery($event)" v-if="openQuery"></consulta-input>

    <div class="row">
      <div class="col-lg-12 text-left mb-3">
        <ul class="list-unstyled mb-0">
          <li v-for="query in queries" class="mb-3">
            <cabecera-consulta @close="closeQuery($event)" @interaction="newInteraction($event)" :query="query">
              <template slot="cuerpo-consulta" v-for="child in query.children">
                <cuerpo-consulta :cerrada="query.cerrada" :nickname="query.usuario" :child="child"></cuerpo-consulta>
              </template>
            </cabecera-consulta>
          </li>
        </ul>
      </div>
    </div>

    <div class="row border bg-secondary rounded no-gutters align-items-center mt-3">
      <div class="col-auto px-2">
        <h5 class="text-monospace text-muted mb-0">N-08</h5>
      </div>
      <div class="col border-left pl-3 py-2 pr-1">
        <p class="font-weight-normal text-muted mb-0">Desde aqui podrás ponerte en contacto con el equipo de eCAR y formular sus
          cuestiones. Tambien existe la posibilidad de contactar con nosotros via telefonicamente o via correo electronico
          a la siguiente dirección: <i>info@ecar-uned.com</i>. Esperamos resolver sus dudas en las distintos recursos que
          ofrecemos, gracias por confiar en nosotros.</p>
      </div>
    </div>

    <!-- <div class="row no-gutters justify-content-center">
      <div class="col-9 text-center">
        <p class="font-weight-normal mb-4 px-3">Desde aqui podrás ponerte en contacto con el equipo de eCAR y formular sus
          cuestiones. Tambien existe la posibilidad de contactar con nosotros via telefonicamente o via correo electronico
          a la siguiente dirección: <i>info@ecar-uned.com</i>. Esperamos resolver sus dudas en las distintos recursos que
          ofrecemos, gracias por confiar en nosotros.</p>
      </div>
    </div> -->
  </div>
</template>

<script>
import ConsultaInput from './ConsultaInput'
import CuerpoConsulta from './CuerpoConsulta'
import CabeceraConsulta from './CabeceraConsulta'
import axios from 'axios'

export default {
  name: 'ConsultoriaTelematica',
  created () {
    axios.defaults.headers.common['Authorization'] = this.getToken
    console.log('marca de peticion a /profile/queries')
    axios({
      method:'get',
      url:'/profile/queries',
      responseType:'json'
    })
    .then(response => {
      this.$store.commit('setQueries', response.data.queries)
    })
    .catch(e => {
      console.error(e);
    })
  },
  components: {
    ConsultaInput,
    CuerpoConsulta,
    CabeceraConsulta
  },
  props: {
    label: {
      type: String,
      description: 'Si junto a la nueva consulta va a ir anexado alguna etiqueta identificativa'
    },
    openQuery: {
      type: Boolean,
      description: 'Controla la aparición de la ventana de nueva consulta inicialmente'
    }
  },
  computed: {
    queries () {
      return this.$store.state.queries
    },
    getToken (token) {
      if (window.localStorage.getItem('authUser'))
        return JSON.parse(window.localStorage.getItem('authUser')).jwtToken
      else
        return 'none'
    }
  },
  methods: {
    showNewQueryInput () {
      return this.openQuery = !this.openQuery
    },
    closeQuery(payload) {
      console.log('marca de peticion a /profile/close-query')
      axios({
        method:'post',
        url:'/profile/close-query',
        responseType:'json',
        data: payload
      })
      .then(response => {
        if(response.data.success === true){
          this.emitMessage(false, 'Exito ', 'success', undefined, response.data.msg, 'ni ni-like-2')
        } else {
          this.emitMessage(false, 'Atención ', 'warning', undefined, response.data.msg, 'ni ni-notification-70')
        }
      })
      .catch(e => {
        if (e.response.data.errors !== undefined) {
          let errors = []
          for(let error of e.response.data.errors) {
            errors.push(error.msg)
          }
          this.emitMessage(false, 'Atención ', 'danger', errors, undefined, 'ni ni-notification-70')
        } else {
          let data = e.response && e.response.data
          this.emitMessage(false, 'Atención ', 'danger', undefined, data.msg, 'ni ni-notification-70')
        }
      })
    },
    newInteraction (payload) {
      console.log('marca de peticion a /profile/new-interaction')
      axios({
        method:'post',
        url:'/profile/new-interaction',
        responseType:'json',
        data: payload
      })
      .then(response => {
        if(response.data.success === true){
          this.emitMessage(false, 'Exito ', 'success', undefined, response.data.msg, 'ni ni-like-2')
        } else {
          this.emitMessage(false, 'Atención ', 'warning', undefined, response.data.msg, 'ni ni-notification-70')
        }
      })
      .catch(e => {
        if (e.response.data.errors !== undefined) {
          let errors = []
          for(let error of e.response.data.errors) {
            errors.push(error.msg)
          }
          this.emitMessage(false, 'Atención ', 'danger', errors, undefined, 'ni ni-notification-70')
        } else {
          let data = e.response && e.response.data
          this.emitMessage(false, 'Atención ', 'danger', undefined, data.msg, 'ni ni-notification-70')
        }
      })
    },
    newQuery (payload) {
      console.log({payload});
      console.log('marca de peticion a /profile/new-query')
      axios({
        method:'post',
        url:'/profile/new-query',
        responseType:'json',
        data: payload
      })
      .then(response => {
        if(response.data.success === true){
          this.emitMessage(false, 'Exito ', 'success', undefined, response.data.msg, 'ni ni-like-2')
        } else {
          this.emitMessage(false, 'Atención ', 'warning', undefined, response.data.msg, 'ni ni-notification-70')
        }
      })
      .catch(e => {
        if (!!(e.response.data.errors)) {
          let errors = []
          for(let error of e.response.data.errors) {
            errors.push(error.msg)
          }
          this.emitMessage(false, 'Atención ', 'danger', errors, undefined, 'ni ni-notification-70')
        } else {
          let data = e.response && e.response.data
          this.emitMessage(false, 'Atención ', 'danger', undefined, data.msg, 'ni ni-notification-70')
        }
      })
    },
    emitMessage(...payload){
      this.$emit('message', payload)
    }
  }
}
</script>
<style lang="css">

</style>
