<template lang="html">
  <div class="container-fluid">
    <div class="row justify-content-between mb-2">
      <span class="col-12 px-0 mb-2">
        <i class="fa fa-envelope-open-o mr-2"></i>
        <span class="font-weight-bold">Asunto: </span>
        {{ query.titulo }}
      </span>
      <template v-if="!query.cerrada">
        <div class="col-auto px-0">
          <base-button v-show="!openInput" size="sm" type="neutral" class="border-primary btn-no-shadow no-translate-y text-primary mr-0" @click.prevent="showInput(query)">
            <i class="fa fa-comments-o mr-2" aria-hidden="true"></i>
            Nuevo mensaje
          </base-button>
          <base-button v-show="openInput" size="sm" type="neutral" class="border-danger btn-no-shadow no-translate-y text-danger mr-0" @click.prevent="closeInput">
            <i class="fa fa-comments-o mr-2" aria-hidden="true"></i>
            Cancelar
          </base-button>
        </div>
        <div class="col-auto pr-0">
          <base-button size="sm" type="neutral" class="border-success btn-no-shadow no-translate-y text-success mr-0" @click.prevent="closeQuery">
            <i class="fa fa-check mr-2" aria-hidden="true"></i>
            Cerrar tema
          </base-button>
        </div>
      </template>
      <div v-if="query.cerrada" class="col-auto px-0">
        <badge class="border border-success d-flex align-items-center bg-white" type="success">
          <i class="fa fa-check mr-2" aria-hidden="true"></i>Consulta resuelta
        </badge>
      </div>
    </div>
    <div class="row justify-content-between text-muted">
      <span class="col-6 px-0"><small>Iniciado</small></span>
      <span class="col-6 text-right px-0"><small>Actualizado</small></span>
      <span class="col-6 px-0"><small>{{date(query.createdAt)}}</small></span>
      <span class="col-6 text-right px-0"><small>{{date(query.updatedAt)}}</small></span>
    </div>
    <span v-if="showAlert" class="row align-items-center justify-content-center py-3">
      <span class="col-auto text-danger">
        <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
      </span>
      <small class="col-lg-8 col-md-10 col text-danger">
        No podrá enviar un nuevo mensaje, referido a este asunto, hasta que obtenga respuesta al anterior.
      </small>
    </span>
    <slot name="cuerpo-consulta"></slot>
    <template v-if="showConsultaInput && !showAlert">
      <consulta-input  type="secondary" color="secondary" size="sm" @interaction="emitInteraction($event)" :titulo="query.titulo"></consulta-input>
    </template>
    <template v-if="admin && !showConsultaInput && !showAlert && showAlertAdmin">
      <h6 class="text-center text-muted mb-0 py-3">Esta consulta se encuentra en proceso de respuesta, seleccione otra consulta</h6>
    </template>
  </div>
</template>

<script>
import ConsultaInput from './ConsultaInput'
import axios from 'axios'

export default {
  name: 'CabeceraConsulta',
  props: {
    query: {
      type: Object,
      description: 'Contenido en la cabecera de la consulta'
    },
    admin: {
      type: Boolean,
      description: 'Si el componente aparece en las secciones admin'
    }
  },
  components: {
    ConsultaInput
  },
  data () {
    return {
      showAlert: false,
      openInput: false,
      showConsultaInput: false,
      showAlertAdmin: false
    }
  },
  mounted() {
    if(this.admin && this.enProceso) {
      this.openInput = true
      this.showConsultaInput = true
    }
  },
  computed: {
    perfil () {
      return this.$store.state.perfil
    },
    enProceso() {
      let email = this.perfil && this.perfil.userEmail
      let inprocess = this.query && this.query.enProcesoRespuestaAuth
      return email === inprocess
    }
  },
  methods: {
    statusQuery(){
      this.getEnProcesoRespuesta(this.query)
      .then(response => {
        console.log({data: response.data});
        if (response.data.success) {
          this.showConsultaInput = false
          this.showAlertAdmin = true
        } else {
          console.log('marca de peticion a /api/admin/change-status-query');
          this.showConsultaInput = true
          axios({
            method:'post',
            url:'/api/admin/change-status-query',
            data: this.query,
            responseType:'json'
          })
          .then(response => {
            console.log({data: response.data});
          })
          .catch(e => {
            console.error(e);
          })
        }
      })
      .catch(e => {
        console.error(e);
        this.showConsultaInput = false
      })
    },
    getEnProcesoRespuesta(payload){
      console.log('marca de peticion a /api/admin/status-query');
      return axios({
        method:'post',
        url:'/api/admin/status-query',
        data: payload,
        responseType:'json'
      })
    },
    closeQuery() {
      this.$emit('close', this.query)
    },
    showInput (query) {
      this.openInput = true
      if (this.admin) {
        this.statusQuery()
      } else if (query.enTramite) {
        this.showAlert = true
      } else {
        this.showConsultaInput = true
      }
    },
    closeInput () {
      if (this.admin) {
        console.log('marca de peticion a /api/admin/change-status-query');
        axios({
          method:'post',
          url:'/api/admin/change-status-query',
          data: this.query,
          responseType:'json'
        })
        .then(response => {
          console.log({data: response.data});
          this.openInput = false
          this.showConsultaInput = false
        })
        .catch(e => {
          console.error(e);
        })
      } else {
        this.openInput = false
        this.showConsultaInput = false
        this.showAlert = false
      }
    },
    date(date) {
      date = new Date(date)
      return date.toLocaleDateString() + ' a las ' + date.toLocaleTimeString()
    },
    emitInteraction (payload) {
      payload.nickname = this.query.usuario
      this.$emit('interaction', payload)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
