<template>
  <div class="page">
    <section class="section-cover section-shaped bg-success my-0">
        <div class="shape bg-gradient-default" style="z-index: 1;">
          <!-- class: shape-skew -->
        </div>
    </section>
    <section class="bg-secundario border-top-success pb-lg-5 pb-0">
      <div class="container px-0" style="z-index:-1;">
        <card shadow class="card-page border-0" style="z-index: 10;" no-body>
          <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2 mb-3">
                  <div class="card-image">
                      <a href="#">
                          <img :src="perfil.userImage" class="rounded-circle">
                          <!--  TODO v-lazy -->
                      </a>
                  </div>
              </div>
              <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                  <div class="card-actions py-4 mt-lg-0">
                      <base-button v-show="!edit === true" type="primary" size="sm" class="no-translate-y mr-3" @click.stop="editInfoUser">
                        <span class="d-flex align-items-center">
                          <i class="fa fa-pencil-square-o mr-1" aria-hidden="true"></i>
                          Editar
                        </span>
                      </base-button>
                      <base-button v-show="!edit === false" type="danger" size="sm" class="no-translate-y mr-3" @click.stop="editInfoUser">
                        <span class="d-flex align-items-center">
                          <i class="fa fa-ban mr-1" aria-hidden="true"></i>
                          Cancelar
                        </span>
                      </base-button>
                      <!-- <base-button type="info" size="sm" class="mr-4">Connect</base-button> -->
                      <router-link to="/perfil/consultas#nueva-consulta" class="btn btn-default btn-sm float-right no-translate-y">
                        <span class="d-flex align-items-center">
                          <i class="fa fa-comments mr-1" aria-hidden="true"></i>
                          Consúlta
                        </span>
                      </router-link>
                  </div>
              </div>
              <div class="col-lg-4 order-lg-1">
                  <div class="card-stats d-flex justify-content-center">
                      <div class="border">
                          <span class="heading">{{toFormat(getStats.avgAmount)}} €</span>
                          <span class="description">Importe</span>
                      </div>
                      <div class="border">
                          <span class="heading">{{getStats.travels}}</span>
                          <span class="description">Viajes</span>
                      </div>
                      <div class="border">
                          <span class="heading">
                            {{toFormat(getStats.avgKilometres)}} Km
                          </span>
                          <span class="description">Kilometros</span>
                      </div>
                  </div>
                  <span class="row text-center mx-2 mb-3">
                    <small class="col-12 text-muted">Las medias del importe, kilometros y viajes realizados.</small>
                  </span>
              </div>
          </div>

          <div class="text-center mt-2">
              <h3>
                {{perfil.userNickname}}<span class="font-weight-light">, {{getAge}} </span>
                <template v-if="perfil.userGender">
                  <span class="font-weight-light" v-if="perfil.userGender === 'Masculino'">
                    <i class="fa fa-mars"></i>
                  </span>
                  <span class="font-weight-light" v-if="perfil.userGender === 'Femenino'">
                    <i class="fa fa-venus"></i>
                  </span>
                </template>
              </h3>
              <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>{{perfil.userLocalidad}}, {{perfil.userProvincia}}</div>
              <div class="h6 mt-4">
                {{perfil.userSurname}}, {{perfil.userName}}
              </div>
              <div>
                {{perfil.userEmail}}
              </div>
          </div>

          <div class="mt-3 pt-3">
            <mensaje-flash id="message-flash" no-rounded :dismissible="messageAlert.dismissible"
                          :messageStrong="messageAlert.messageStrong"
                          :typeAlert="messageAlert.typeAlert"
                          :error="messageAlert.error"
                          :errors="messageAlert.errors"
                          :icono="messageAlert.icono"></mensaje-flash>
          </div>

          <div class="row no-gutters">
            <div id="botonera" class="col-12 d-flex justify-content-center" style="box-shadow: 0px 6px 9px -6px #c1c1c1;">
              <base-button type="transparent"
                          nativeType="button"
                          :class="[{'btn-border-bottom-primary text-primary': show.perfil === true},
                          {'btn-border-bottom-white text-body': show.perfil !== true}]"
                          class="mx-2 btn-no-shadow no-translate-y rounded-0"
                          @click.prevent="toTab('perfil')" style="background-color: white;">
                Perfil
              </base-button>
              <base-button type="transparent"
                          nativeType="button"
                          :class="[{'btn-border-bottom-primary text-primary': show.viajes === true},
                          {'btn-border-bottom-white text-body': show.viajes !== true}]"
                          class="mx-2 btn-no-shadow no-translate-y rounded-0"
                          @click.prevent="toTab('viajes')" style="background-color: white;">
                Viajes
              </base-button>
              <base-button type="transparent"
                          nativeType="button"
                          :class="[{'btn-border-bottom-body text-body': show.consultas === true},
                          {'btn-border-bottom-white text-body': show.consultas !== true}]"
                          class="mx-2 btn-no-shadow no-translate-y rounded-0"
                          @click.prevent="toTab('consultas')" style="background-color: white;">
                Consultas
              </base-button>
            </div>
          </div>

          <validacion-conductor v-if="show.perfil" :authToken="getToken"></validacion-conductor>
          <informacion-perfil class="pb-3" borderTop bgLabel v-if="show.perfil" @actulizar-perfil="actualizarDatosPerfil($event)" :payload="perfil" :edit="edit"></informacion-perfil>
          <cambiar-contrasena v-if="show.perfil" @cambiar="updatePassword($event)" :perfil="perfil"></cambiar-contrasena>
          <borrar-cuenta v-if="show.perfil" @borrar-perfil="removeProfile"></borrar-cuenta>

          <vehiculo-alquilado v-if="show.viajes"></vehiculo-alquilado>
          <nuevo-viaje v-if="show.viajes"></nuevo-viaje>
          <resumen-viajes @new-query="toNewQuery($event)" @message="showMessage(...$event)" :edit="edit" v-if="show.viajes"></resumen-viajes>

          <consultoria-telematica :label="label" :openQuery="openQuery" @message="showMessage(...$event)" v-if="show.consultas"></consultoria-telematica>
        </card>
      </div>
    </section>
  </div>
</template>
<script>

import InformacionPerfil from './components/InformacionPerfil'
import CambiarContrasena from './components/CambiarContrasena'
import BorrarCuenta from './components/BorrarCuenta'
import ResumenViajes from './components/ResumenViajes'
import NuevoViaje from './components/NuevoViaje'
import VehiculoAlquilado from './components/VehiculoAlquilado'
import ConsultoriaTelematica from './components/ConsultoriaTelematica'
import ValidacionConductor from './components/ValidacionConductor'
import MensajeFlash from './components/MensajeFlash'
import { mapState } from 'vuex'
import axios from 'axios'


export default {
  name: 'Profile',
  components: {
    InformacionPerfil,
    CambiarContrasena,
    BorrarCuenta,
    ResumenViajes,
    ValidacionConductor,
    NuevoViaje,
    ConsultoriaTelematica,
    VehiculoAlquilado,
    MensajeFlash
  },
  data () {
    return {
      messageAlert: {
        typeAlert: 'default',
        messageStrong: 'Default!',
        dismissible: false,
        icono: 'ni ni-like-2',
        errors: undefined,
        error: undefined
      },
      show: { // TODO Mirar el tema de animaciones para esto
        perfil: true,
        consultas: false,
        viajes: false
      },
      updatePerfil: {},
      edit: false,
      label: undefined,
      openQuery: false
    }
  },
  created () {
    if (this.tab)
      this.showTab(this.tab)
    /*responseType:'json' añade otros tipos de datos aceptados como text/plain */
    axios.defaults.headers.common['Authorization'] = this.getToken
    if (Object.keys(this.perfil).length <= 2) {
      console.log('marca de peticion a /profile/');
      axios({
        method:'get',
        url:'/profile/',
        responseType:'json'
      })
      .then(response => {
        console.log({user:response.data.user});
        this.$store.commit('setPerfil', response.data.user)
      })
      .catch(e => {
        if(e.response.status === 401) {
          this.$router.push({
            name: 'login'
          })
        } else if (e.response.status === 404) {
          this.showMessage(false, 'Atención ', 'danger', undefined, 'El servidor no es accesible (status code 404; Not Found).', 'ni ni-notification-70')
        }
      })
    }
  },
  computed: {
    ...mapState(['perfil', 'queries']),
    getToken () {
      if (window.localStorage.getItem('authUser'))
        return JSON.parse(window.localStorage.getItem('authUser')).jwtToken
      else
        return 'none'
    },
    getStats() {
      let perfil = this.perfil
      return {
        travels: perfil.userStats ? perfil.userStats.travels : 0,
        avgAmount: perfil.userStats ? perfil.userStats.avgAmount : 0,
        avgKilometres: perfil.userStats ? perfil.userStats.avgKilometres : 0
      }
    },
    getAge() {
      var today = new Date();
      var birthDate = new Date(this.perfil.userBirth);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return age;
    }
  },
  props: {
    tab: String
  },
  watch: {
    '$route'(to) {
      if (to.params && to.params.tab) {
        this.showTab(to.params.tab)
      } else {
        this.showTab('perfil')
      }
    }
  },
  methods: {
    logout() {
      this.logged = false
      this.$store.commit('setPerfil', {})
      this.$store.commit('setQueries', [])
      this.$store.commit('setTravels', [])
      localStorage.removeItem('authUser')
      this.$router.push({
        name: 'inicio-sesion'
      })
    },
    toFormat(payload) {
      let string_payload = payload.toLocaleString('es', {maximumFractionDigits : 1})
      return string_payload
    },
    toNewQuery(payload) {
      this.label = 'trvl-' + payload
      this.openQuery = true
      this.$router.push({ path: '/perfil/consultas#nueva-consulta' })
    },
    toTab(tab) {
      if (tab === 'perfil') {
        this.$router.push({ path: '/perfil#botonera' })
      } else {
        this.$router.push({ path: `/perfil/${tab}#botonera` })
      }
    },
    quitAlert () {
      this.messageAlert.error = undefined
    },
    showTab (payload) {
      switch (payload) {
        case 'perfil':
          this.$set(this.show, 'perfil', true)
          this.$set(this.show, 'consultas', false)
          this.$set(this.show, 'viajes', false)
          break;
        case 'consultas':
          this.$set(this.show, 'perfil', false)
          this.$set(this.show, 'consultas', true)
          this.$set(this.show, 'viajes', false)
          break;
        case 'viajes':
          this.$set(this.show, 'perfil', false)
          this.$set(this.show, 'consultas', false)
          this.$set(this.show, 'viajes', true)
          break;
      }
    },
    actualizarDatosPerfil (payload) {
      console.log('payload: ' + JSON.stringify(payload));
      axios({
        method:'post',
        url:'/profile/update-user',
        responseType:'json',
        data: payload
      })
      .then(response => {
        if(response.data.success === true){
          this.showMessage(false, 'Exito ', 'success', undefined, response.data.msg, 'ni ni-like-2')
        } else {
          this.showMessage(false, 'Atención ', 'warning', undefined, response.data.msg, 'ni ni-notification-70')
        }
      })
      .catch(e => {
        if (e.response.data.errors !== undefined) {
          this.messageAlert.errors = []
          for(let error of e.response.data.errors) {
            this.messageAlert.errors.push(error.msg)
          }
          this.showMessage(false, 'Atención ', 'danger', this.messageAlert.errors, undefined, 'ni ni-notification-70')
        } else {
          this.showMessage(false, 'Atención ', 'danger', undefined, e, 'ni ni-notification-70')
        }
      })
    },
    updatePassword (payload) {
      console.log('payload: ' + JSON.stringify(payload));
      let that = this
      axios.post('/profile/update-password', payload)
      .then(function (response) {
        that.showMessage(false, 'Exito ', 'success', undefined, response.data.msg, 'ni ni-like-2')
      })
      .catch(function (error) {
        if (error.response.data.errors !== undefined) {
          that.messageAlert.errors = []
          for(let error of error.response.data.errors) {
            that.messageAlert.errors.push(error.msg)
          }
          that.showMessage(false, 'Atención ', 'danger', that.messageAlert.errors, undefined, 'ni ni-notification-70')
        } else {
          that.showMessage(false, 'Atención ', 'danger', undefined, error.response.data.msg, 'ni ni-notification-70')
        }
      });
    },
    removeProfile () {
      let that = this
      axios.get('/profile/delete')
      .then(function (response) {
        that.logout()
      })
      .catch(function (error) {
        that.showMessage(false, 'Atención ', 'danger', undefined, error.response.data.msg, 'ni ni-notification-70')
      })
    },
    showMessage (dismissible, messageStrong, typeAlert, errorMessages, errorMessage, icono) {
      this.messageAlert = Object.assign({}, this.messageAlert, {
        typeAlert: typeAlert,
        messageStrong: messageStrong,
        dismissible: dismissible,
        icono: icono,
        errors : errorMessages,
        error: errorMessage
      })
      this.$router.push({
        hash: 'message-flash'
      })
    },
    // Metodo de EJEMPLO:

    // details (book) {
    //   this.$router.push({
    //     name: 'ShowBook',
    //     params: { id: book._id }
    //   })
    // },
    editInfoUser () {
      this.edit = !this.edit
    }
  }
}
</script>
<style>

</style>
