<template>
    <div class="page">
        <section class="section-cover section-shaped my-0 bg-gradient-default">
          <div class="container px-0 py-5">
            <div class="row">
              <div class="col-12 pt-md-4 pt-0 mb-4 mb-md-0">
                <div class="profiling-header px-0 pt-5 text-center">
                  <h2 class="font-weight-light text-center text-secondary">
                    Finaliza el registro
                  </h2>
                  <p class="lead text-secondary text-center">Completa los siguientes campos para finalizar con exito
                    tu registro y poder usar nuestros servicios. Se te informa para que usamos cada uno de ellos.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="bg-secundario border-top-success">
            <div class="container px-0 pb-lg-5 pb-0">
                <card shadow class="card-page-regular border-0">
                  <template>
                    <div class="text-center">

                        <div class="text-wrap icon icon-size icon-shape bg-gradient-default rounded-circle text-white mb-3">
                          <i class="fa fa-address-card text--xl"></i>
                        </div>

                        <div class="mb-4">
                          <div class="point mx-2 d-inline-flex" :class="{'active-point': progreso === 0}"></div>
                          <div class="point mx-2 d-inline-flex" :class="{'active-point': progreso === 1}"></div>
                          <div class="point mx-2 d-inline-flex" :class="{'active-point': progreso === 2}"></div>
                          <div class="point mx-2 d-inline-flex" :class="{'active-point': progreso === 3}"></div>
                        </div>

                        <div class="mt-2 justify-content-left text-left mb-3">
                          <form role="form">
                            <div v-if="progreso === 0" class="row justify-content-left text-left">
                              <div class="col-lg-4">
                                <base-input alternative bgLabel class="mb-3"
                                            label="Apodo*" minlength="4"
                                            maxlength="20" v-on:blur="disponibilidad"
                                            :valid="helpBlock.apodo" v-model.trim="savePerfil[0].apodo"
                                            placeholder="Ejemplo: jmarquez_27" addon-left-icon="fa fa-user-plus">
                                </base-input>
                              </div>
                              <div class="col-lg-4">
                                <base-input alternative bgLabel class="mb-3"
                                            label="Nombre*" :valid="helpBlock.nombre"
                                            minlength="4" maxlength="20"
                                            v-model.trim="savePerfil[0].nombre" placeholder="Ejemplo: Manuel"
                                            addon-left-icon="fa fa-address-card-o">
                                </base-input>
                              </div>
                              <div class="col-lg-4">
                                <base-input alternative bgLabel class="mb-3" @keyup.enter="checkForm"
                                            label="Apellidos*" minlength="4"
                                            maxlength="28" :valid="helpBlock.apellidos"
                                            v-model.trim="savePerfil[0].apellidos" placeholder="Ejemplo: Garcia Martinez"
                                            addon-left-icon="fa fa-address-card-o">
                                </base-input>
                              </div>
                            </div>

                            <div v-if="progreso === 1" class="row justify-content-left text-left">
                              <div class="col-md-6 col-lg-3">
                                <base-input alternative bgLabel disabled label="Genero*"
                                            class="mb-3" :valid="helpBlock.genero"
                                            :select="['Masculino','Femenino']" v-on:toggle="toggleValue($event, 'genero')"
                                            buttonLeft="fa fa-angle-down" v-model.trim="savePerfil[1].genero"
                                            placeholder="Genero" addon-left-icon="fa fa-venus-mars">
                                </base-input>
                              </div>
                              <div class="col-md-6 col-lg-3">
                                <!-- <base-input addon-left-icon="ni ni-calendar-grid-58" class="mb-3" alternative>
                                    <flat-picker slot-scope="{focus, blur}"
                                                 @on-open="focus"
                                                 @on-close="blur"
                                                 :config="{allowInput: true}"
                                                 placeholder="17-07-1984"
                                                 class="form-control datepicker"
                                                 v-model="savePerfil.birth">
                                    </flat-picker>
                                </base-input> -->
                                <base-input alternative bgLabel class="mb-3" :valid="helpBlock.fecha"
                                            type="date" label="Fecha de nacimiento*"
                                            v-model="savePerfil[1].fecha" placeholder="12/12/1992"
                                            addon-left-icon="fa fa-calendar-o">
                                </base-input>
                              </div>
                              <div class="col-md-12 col-lg-6">
                                <base-input alternative bgLabel class="mb-3"
                                            disabled :lock="true" label="Correo electronico"
                                            v-model="perfil.email" placeholder="Correo electronico"
                                            addon-left-icon="fa fa-envelope-open-o">
                                </base-input>
                              </div>
                          </div>

                          <div v-if="progreso === 2" class="row justify-content-left text-left">
                            <div class="col-lg-8">
                              <base-input alternative bgLabel :valid="helpBlock.domicilio"
                                          class="mb-3" label="Domicilio*"
                                          v-model.trim="savePerfil[2].domicilio"
                                          placeholder="Ejemplo: Calle venia, 33"
                                          addon-left-icon="fa fa-map-marker">
                              </base-input>
                            </div>
                            <div class="col-lg-2 col-md-6">
                              <base-input alternative bgLabel class="mb-3"
                                          label="Planta" v-model="savePerfil[2].planta"
                                          placeholder="Ejemplo: 3º" addon-left-icon="fa fa-map-marker">
                              </base-input>
                            </div>
                            <div class="col-lg-2 col-md-6">
                              <base-input alternative bgLabel class="mb-3"
                                          label="Puerta" v-model.trim="savePerfil[2].puerta"
                                          placeholder="Ejemplo: A" addon-left-icon="fa fa-map-marker">
                              </base-input>
                            </div>
                          </div>

                          <div v-if="progreso === 3" class="row justify-content-left text-left">
                            <div class="col-lg-4">
                              <base-input alternative bgLabel :valid="helpBlock.localidad"
                                          label="Localidad*" class="mb-3"
                                          buttonLeft="fa fa-search" v-on:click-button="getProvincia"
                                          v-model.trim="savePerfil[3].localidad" placeholder="Busqueda de localidad"
                                          addon-left-icon="fa fa-map-marker">
                              </base-input>
                            </div>
                            <div class="col-lg-4">
                              <base-input alternative bgLabel :valid="helpBlock.provincia"
                                          label="Provincia*" class="mb-3"
                                          buttonLeft="fa fa-angle-down" v-model.trim="savePerfil[3].provincia"
                                          placeholder="Ejemplo: Almeria" addon-left-icon="fa fa-map-marker">
                              </base-input>
                            </div>
                            <div class="col-lg-4">
                              <base-input alternative bgLabel :valid="helpBlock.cp"
                                          label="Codigo postal*" class="mb-3" :select="postcodes" v-on:toggle="toggleValue($event, 'cp')"
                                          buttonLeft="fa fa-angle-down" v-model.trim="savePerfil[3].cp"
                                          placeholder="Ejemplo: 04007" addon-left-icon="fa fa-map-marker">
                              </base-input>
                            </div>
                          </div>

                          <div class="row no-gutters justify-content-between">
                            <div class="col">
                              <base-button v-if="progreso!==0" v-on:click.prevent="progreso-=1" size="lg" type="primary" nativeType="submit" class="my-4 no-translate-y">
                                <i slot="icon" class="fa fa-chevron-circle-left"></i>
                                Anterior
                              </base-button>
                            </div>
                            <div class="col text-center">
                              <base-button v-if="progreso===3" size="lg" type="success" nativeType="submit" class="ml-1 my-4 no-translate-y" @click.prevent="onSubmit">
                                <i slot="icon" class="fa fa-cloud-upload"></i>
                                Finalizar
                              </base-button>
                            </div>
                            <div class="col text-right">
                              <base-button :disabled="!success" v-if="progreso!==3" v-on:click.prevent="checkForm" size="lg" type="primary" nativeType="submit" class="my-4 no-translate-y">
                                Siguiente
                                <i class="fa fa-chevron-circle-right ml-2"></i>
                              </base-button>
                            </div>
                          </div>
                        </form>
                      </div>

                      <div class="row text-left mb-3">
                        <div class="col-12">
                          <base-alert v-if="Object.keys(messageBlock).length!==0" type="warning" :dismissible="true">
                            <span class="alert-inner--icon text-center d-block mr-0">
                              <i class="ni ni-notification-70"></i>
                            </span>
                            <span class="alert-inner--text">
                              <strong>Atención: </strong>
                              Se ha producido un problema en los siguientes campos:
                            </span>
                            <ul style="margin-bottom: 0rem;">
                              <li v-for="message in messageBlock">{{ message }}</li>
                            </ul>
                            <button v-if="messageAlert.dismissible" type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span>&times;</span>
                            </button>
                          </base-alert>
                        </div>
                        <div class="col-12">
                          <base-alert type="secondary" class="mb-0" style="border-left: 6px solid #8898aa;border-radius: 0rem .25rem .25rem 0rem;">
                            <span class="alert-inner--icon text-center d-block">
                              <i class="fa fa-info-circle" style="font-size:1.5rem; color:#8898aa;"></i>
                            </span>
                            <span v-if="progreso===0" class="alert-inner--text text-muted">
                              Recogemos <strong>nombre</strong> y <strong>apellidos</strong> por si tenemos que dirigirnos a usted por medio de
                              correo ordinario y por motivos de facturación. El campo <strong>apodo</strong> lo utilizamos para referirnos a usted
                              dentro de la aplicación. <router-link class="text-muted" :to="{ name: 'politicas', params: { politica: 'privacidad' } }"><small>Politica de privacidad</small></router-link>
                            </span>
                            <span v-if="progreso===1" class="alert-inner--text text-muted">
                              Recogemos <strong>genero</strong> para dirigirnos a usted de una forma apropiada. La <strong>fecha de nacimiento</strong>
                              como modelo de ratificar que eres mayor de edad y puedes usar nuestro servicio. Y el <strong>correo electronico</strong>
                              para dirigirnos a usted por un medio telematico. Ademas de ser la informacion fundamental con la cual inciaste el registro;
                              por ello es un campo inmutable.
                              <a class="text-muted" href="#"><small>Politica de privacidad</small></a>
                            </span>
                            <span v-if="progreso===2" class="alert-inner--text text-muted">
                              Recogemos su <strong>direccion postal</strong> por si tenemos que dirigirnos a usted por medio de
                              correo ordinario y por motivos de facturación.
                              <a class="text-muted" href="#"><small>Politica de privacidad</small></a>
                            </span>
                            <span v-if="progreso===3" class="alert-inner--text text-muted">
                              Recogemos su <strong>direccion postal</strong> por si tenemos que dirigirnos a usted por medio de
                              correo ordinario y facturacion. Aunque viniste por el precio, esperamos que te quedes por nuestro servicio tecnico.
                              <a class="text-muted" href="#"><small>Politica de privacidad</small></a>
                            </span>
                          </base-alert>
                        </div>
                      </div>

                      <div class="mt-3 pt-3 border-top">
                        <div v-if="messageAlert.errors || messageAlert.error">
                          <base-alert class="mb-0" :type="messageAlert.typeAlert" :dismissible="messageAlert.dismissible" v-on:dismiss-alert="quitAlert">
                              <span class="alert-inner--icon text-center d-block mr-0">
                                <i :class="messageAlert.icono"></i>
                              </span>
                              <span v-if="messageAlert.error" class="alert-inner--text w-100"><strong>{{messageAlert.messageStrong}}</strong> {{messageAlert.error}} </span>
                              <span v-if="messageAlert.errors" class="alert-inner--text w-100 text-left">
                                <span class="alert-inner--text">
                                  <strong>{{messageAlert.messageStrong}}</strong>
                                  Se ha producido un problema en los siguientes campos:
                                </span>
                                <ul style="margin-bottom: 0rem;">
                                  <li v-for="error in messageAlert.errors">{{ error }}</li>
                                </ul>
                              </span>
                              <button v-if="messageAlert.dismissible" type="button" class="close" data-dismiss="alert" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                              </button>
                          </base-alert>
                        </div>
                      </div>

                    </div>
                  </template>
                </card>
            </div>
        </section>
    </div>
</template>
<script>
import axios from 'axios'
// import flatPicker from "vue-flatpickr-component"
// import "flatpickr/dist/flatpickr.css"

export default {
  name: 'FinalRegister',
  components: {
     // flatPicker
  },
  data () {
    return {
      messageAlert:{
        typeAlert: 'default',
        messageStrong: 'Default!',
        dismissible: false,
        icono: 'ni ni-like-2',
        errors : false,
        error : false
      },
      helpBlock: {},
      messageBlock: {},
      postcodes: [],
      progreso: 0,
      perfil: {},
      savePerfil: [{nombre: undefined, apellidos: undefined, apodo: undefined},
        {genero: undefined, fecha: undefined},{domicilio: undefined},
        {localidad: undefined, provincia: undefined, cp: undefined}],
      success: true
    }
  },
  props: {
    slug: String
  },
  created () {
    axios({
      method:'get',
      url:'/api/auth/activar/' + this.slug,
      responseType:'json'
    })
    .then(response => {
      if(response.data.success === true){
        this.perfil.email = response.data.email
        this.showMessage(false, '¡Adelante! ', 'success', undefined, response.data.msg, 'ni ni-like-2')
      } else { // Modificar esto para que sea capturado en el bloque catch no aqui
        this.success = false
        this.showMessage(false, 'Lo sentimos ', 'danger', undefined, response.data.msg, 'ni ni-notification-70')
      }
    })
    .catch(e => {
      this.showMessage(false, 'Error ', 'warning', undefined, e.response.statusText, 'ni ni-notification-70')
    })
  },
  methods: {
    checkForm () {
      for (let field of Object.keys(this.savePerfil[this.progreso])) {
        if (field === 'apodo' && !(this.helpBlock[field]) && this.savePerfil[this.progreso][field]) {
          continue;
        }
        else if (!this.savePerfil[this.progreso][field]) {
          this.$set(this.helpBlock, field, false)
          this.$set(this.messageBlock, field, 'complete el campo ' + field + '.')
        } else {
          this.$delete(this.helpBlock, field)
          this.$delete(this.messageBlock, field)
        }
      }

      if (Object.keys(this.helpBlock).length === 0 && this.progreso !== 3)
        this.progreso += 1
      else if (Object.keys(this.helpBlock).length === 0)
        return true
      else
        return false
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
    },
    disponibilidad () {
      axios({
        method:'post',
        url:'/api/auth/disponible',
        responseType:'json',
        data: { apodo: this.savePerfil[0].apodo }
      })
      .then(response => {
        this.$set(this.helpBlock, 'apodo', response.data.success)
      })
      .catch(e => {
        if (e.response.data){
          this.$set(this.helpBlock, 'apodo', e.response.data.success)
          this.$set(this.messageBlock, 'apodo', e.response.data.msg)
        } else {
          this.$set(this.helpBlock, 'apodo', false)
        }
      })
    },
    quitAlert () {
      this.messageAlert.error = undefined
    },
    onSubmit (evt) {
      if(!this.checkForm()) return
      axios({
        method:'post',
        url:'/api/auth/activar/' + this.slug,
        responseType:'json',
        data: this.savePerfil
      })
      .then(response => {
        if(response.data.success === true){
          this.showMessage(false, '¡Gracias! ', 'success', undefined, response.data.msg, 'ni ni-like-2')
        } else {
          this.showMessage(false, 'Atención: ', 'warning', undefined, response.data.msg, 'ni ni-notification-70')
        }
      })
      .catch(e => {
        if (e.response.data.errors !== undefined) {
          this.messageAlert.errors = []
          for(let error of e.response.data.errors) {
            this.messageAlert.errors.push(error.msg)
          }
          this.showMessage(false, 'Atención: ', 'danger', this.messageAlert.errors, undefined, 'ni ni-notification-70')
        } else {
          this.showMessage(false, 'Atención: ', 'danger', undefined, e, 'ni ni-notification-70')
        }
      })
    },
    getProvincia () {
      console.log(JSON.stringify(this.savePerfil[3].localidad))
      const instance = axios.create({
        responseType:'json',
        headers: {'X-Algolia-Application-Id': 'pl2XYXJS25XB', 'X-Algolia-API-Key': '07a0ac28b433945ad316bbcad5f84337'},
        withCredentials: false
      });
      instance.defaults.headers.common['Authorization'] = '07a0ac28b433945ad316bbcad5f84337';
      instance({
        method:'post',
        data: { query: this.savePerfil[3].localidad, hitsPerPage: 5, language: 'es', "countries": ["es", "fr", "pt"] },
        url:`https://places-dsn.algolia.net/1/places/query`
      })
      .then(response => {
        console.log(response.data)
        /* En algunos casos la provincia esta en county[0] */
        if (response.data.hits[0].county.length === 2)
          this.$set(this.savePerfil[3], 'provincia', response.data.hits[0].county[1])
        else
          this.$set(this.savePerfil[3], 'provincia', response.data.hits[0].county[0])

        this.$set(this.savePerfil[3], 'cp', response.data.hits[0].postcode[0])
        this.postcodes = response.data.hits[0].postcode
        console.log(this.savePerfil[3].provincia)
        console.log(this.savePerfil[3].cp)
      })
      .catch(e => {
        console.log(JSON.stringify(e));
      })
    },
    toggleValue (e, field) {
      this.$set(this.savePerfil[this.progreso], field, e)
    }
  }
}
</script>
<style>

</style>
