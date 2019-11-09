<template lang="html">
  <div class="border-top pb-3 px-3">
    <div class="row justify-content-center">
      <div class="col-12 text-center">
        <h4 class="text-primary py-2 mb-0">
          Nuevo viaje
        </h4>
        <p>Utilice el boton <kbd class="bg-primary">Iniciar nuevo viaje</kbd> para dar comienzo
          a un <i>viaje</i>. Una vez llegado a su destino, pulse <kbd class="bg-danger">Finalizar</kbd>
          para dar por acabado el <i>viaje</i>. Una vez <i>finalizado</i> pasará a la seccion de Resumen de Viajes
          donde podrá efectuar el pago.</p>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-12 text-center mb-3">
        <base-button icon="fa fa-play" :disabled="disableStartTravel && !thereIsTravel" size="lg" type="primary" class="radius no-translate-y my-2" @click.prevent="startTravel">
          Iniciar Viaje
        </base-button>
        <base-button v-if="thereIsTravel" icon="fa fa-stop" size="lg" type="danger" class="radius no-translate-y my-2" @click.prevent="stopTravel">
          Finalizar
        </base-button>
      </div>
      <!-- <div v-html="rawHtml"></div> -->
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-8 col-12 mb-3">
        <card shadow no-body class="border-0">
          <div class="text-center bg-primary text-monospace rounded-top text-white mb-0">
            <i class="fa fa-terminal pr-2" aria-hidden="true"></i>
            <small>Consola</small>
          </div>
          <div id="parent" class="bg-dark text-secondary text-monospace rounded-bottom mb-0 pl-2" style="min-height:190px">
            <vue-scroll :ops="ops">
              <small id="child">
                <span class="font-weight-bold d-block">[lagarto@lomo ~]$ ...</span>
                <!-- <span v-if="message" class="font-weight-bold d-block">[lagarto@lomo ~]$
                  <span class="font-weight-normal text-success">{{ message }} ...</span>
                </span> -->
                <ul v-if="noStandartOutput.length" class="list-unstyled">
                  <li v-for="output in noStandartOutput">
                    <span v-if="output.success" class="font-weight-bold d-block">[lagarto@lomo ~]$
                      <span class="font-weight-normal text-success">{{ output.msg }} ...</span>
                    </span>
                    <!-- v-else-if="type === 'B'" -->
                    <span v-else>[latitud: {{output[0]}}, longitud: {{output[1]}}] ... [OK]</span>
                  </li>
                </ul>
              </small>
            </vue-scroll>
          </div>
        </card>
      </div>
    </div>

    <div v-if="thereIsTravel" class="row justify-content-center">
      <div class="col-12 mb-2">
        <div class="row align-items-end">
          <div class="col pr-0 pl-2">
            <p class="font-weight-normal text-primary text-center mb-0">Estado</p>
            <p class="bg-secondary border border-primary text-primary radius mb-0 px-3 py-1"><strong>{{ travel.estado }}</strong></p>
          </div>
          <div class="col pr-0 pl-2">
            <p class="font-weight-normal text-primary text-center mb-0">Fecha del inicio</p>
            <bPopover target="fecha-inicio-reserva"
                       placement="top"
                       boundary="viewport"
                       title="Fecha y hora de inicio del viaje"
                       triggers="hover"
                       :content="date(travel.fechaInicio)[0]">
            </bPopover>
            <p class="bg-secondary border border-primary text-primary radius mb-0 px-3 py-1">
              <span>{{date(travel.fechaInicio)[1]}}</span>
              <base-button size="sm" type="secondary" class="btn-tooltip no-translate-y mx-1 py-0"
                           id="fecha-inicio-reserva" style="box-shadow:none;">
                           <i class="fa fa-ellipsis-h text-primary" aria-hidden="true" style="font-size:.8rem"></i>
              </base-button>
            </p>
          </div>
          <div class="col-auto mb-1 px-1">
            <base-button size="sm" type="neutral" class="btn-no-shadow no-translate-y mr-0" id="localizacion">
                         <i class="fa fa-location-arrow" aria-hidden="true"></i>
            </base-button>
            <bPopover target="localizacion"
                       placement="top"
                       boundary="viewport"
                       title="Localización geografica"
                       triggers="hover"
                       :content="'Viaje iniciado:\n latitud: ' + travel.localizacionGeo[0][0] + '\n longitud: ' + travel.localizacionGeo[0][1] ">
            </bPopover>
            <router-link class="btn btn-neutral no-translate-y btn-no-shadow btn-sm"
              :to="{ name: 'vehiculo', params: { id: travel.vehiculo.idPublic }}">
                <i class="fa fa-car" aria-hidden="true"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div v-if="!travel && message" class="col-12">
        <span class="d-flex align-items-center justify-content-center my-2" style="color:#8798ab">
          <i class="fa fa-exclamation-circle mr-2" aria-hidden="true" style="font-size:1.4rem"></i> {{ message }}
        </span>
      </div>
    </div>

    <div class="row border bg-secondary rounded no-gutters align-items-center mt-3">
      <div class="col-auto px-2">
        <h5 class="text-monospace text-muted mb-0">N-06</h5>
      </div>
      <div class="col border-left pl-3 py-2 pr-1">
        <p class="font-weight-normal text-muted mb-0">Aqui podrás ver el viaje que has iniciado recientemente, junto a el figura
          diferentes acciónes como detenerlo. Asi como algunos meta datos sobre el viaje mismo.
          <router-link :to="{ name: 'ayuda', params: { topic: 'nota-al-pie', hash: 'n-06' }}">
            mas <i class="fa fa-angle-double-right" aria-hidden="true"></i>
          </router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import bPopover from 'bootstrap-vue/es/components/popover/popover';
import axios from 'axios'

export default {
  name: 'NuevoViaje',
  data () {
    return {
      ops: {
        vuescroll: {
          mode: 'native'
        },
        bar: {
          background: '#5e72e4',
          showDelay: 250,
          opacity: 40
        },
        scrollPanel: {
          scrollingX: false,
          scrollingY: true,
          padding: false
        }
      },
      geo: {
        latitude: undefined,
        longitude: undefined
      },
      rawHtml: undefined,
      travel: {},
      arrayGeo: [],
      arrayNoStdrtOut: [],
      watchPositionID: 1,
      firstGeoFindMe: true
    }
  },
  created () {
    // Recuperar si hay un viaje en transcurso actualmente. Con la opcion de finalizar dicho viaje
    axios.defaults.headers.common['Authorization'] = this.getToken
    console.log('marca de peticion a /profile/travel')
    axios({
      method:'get',
      url:'/profile/travel',
      responseType:'json'
    })
    .then(response => {
      if (response.data.success) {
        console.log({ travel_success: response.data.travel });
        this.travel = response.data.travel
        if(this.travel.estado === 'iniciado'){
          this.arrayNoStdrtOut = [{success:true, msg:response.data.msg}, ...response.data.travel.localizacionGeo]
          /* Chrome te muestra una advertencia que te indica que use solo la GeoLocazation
           a peticion del usuario y no al cargar la pagina (los usuarios desconfian de estas) */
          this.geoFindMe()
        }
      } else {
        console.log({ travel: response.data.msg });
        this.noStandartOutput = {success:true, msg:response.data.msg}
      }
    })
    .catch(e => console.error(e))
  },
  components: {
    bPopover
  },
  props: {
  },
  computed: {
    noStandartOutput: {
      get: function(){
        return this.arrayNoStdrtOut
      },
      set: function(value){
        if(this.arrayNoStdrtOut.length <= 60) {
          this.arrayNoStdrtOut.push(value)
        } else {
          this.arrayNoStdrtOut = []
          this.arrayNoStdrtOut.push(value)
        }
      }
    },
    getToken(token) {
      if (window.localStorage.getItem('authUser'))
        return JSON.parse(window.localStorage.getItem('authUser')).jwtToken
      else
        return 'none'
    },
    thereIsTravel() {
      if(Object.keys(this.travel).length === 0) {
        return false
      } else {
        return true
      }
    },
    vehicle() {
      return this.$store.state.vehicle
    },
    disableStartTravel() {
      if (!this.vehicle.matricula || this.vehicle.reserva) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
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
    date(date) {
      date = new Date(date)
      return [date.toLocaleDateString() + ' a las ' + date.toLocaleTimeString(), date.toLocaleDateString()]
    },
    startTravel() {
      console.log('marca de peticion a /profile/start-travel')
      this.geoFindMe()
        .then(result => {
          this.noStandartOutput = [result.lat, result.long]
          return axios({
            method:'post',
            url:`/profile/start-travel`,
            responseType:'json',
            data: { vehiculo: this.vehicle.idPublic, latitude: result.lat, longitude: result.long }
          })
        })
        .then(response => {
          if(response.data.success){
            this.noStandartOutput = {success:true, msg:response.data.msg}
            this.travel = response.data.travel
            this.showMessage(false, 'Exito ', 'success', undefined, response.data.msg, 'ni ni-like-2')
            this.firstGeoFindMe = false
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
    currentTravel(payload) {
      console.log('marca de peticion a /profile/current-travel')
      axios({
        method: 'post',
        url: `/profile/current-travel`,
        responseType: 'json',
        data: payload
      })
      .then(response => {
        this.travel = response.data.travel
        this.noStandartOutput = {success:true, msg:response.data.msg}
        this.noStandartOutput = [payload.latitude, payload.longitude]
      })
      .catch(e => console.error(e))
    },
    isSameLastEntry(latitude, longitude){
      if (this.arrayGeo.length) {
        let lastIndex = this.arrayGeo.length - 1
        return (this.arrayGeo[lastIndex][0] === latitude &&
          this.arrayGeo[lastIndex][1] === longitude) ||
          Math.random() < 0.85
      } else {
        return false
      }
    },
    geoFindMe() {
      this.noStandartOutput = {success:true, msg:'Localizando'}
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation){
          reject('La geolocaliazación no está soportada por el navegador')
        }
        var options = { enableHighAccuracy: true, timeout: 50000, maximumAge: 0 }
        const success = (position) => {
          if (this.firstGeoFindMe) {
            resolve({ lat: position.coords.latitude, long: position.coords.longitude })
          } else if(!this.isSameLastEntry(position.coords.latitude, position.coords.longitude)) {
            this.currentTravel({ latitude: position.coords.latitude, longitude: position.coords.longitude })
            this.arrayGeo.push([ position.coords.latitude, position.coords.longitude ])
          }
        }
        const error = (err) => {
          reject(`ERROR(${err.code}): ${err.message}`)
        }
        this.watchPositionID = navigator.geolocation.watchPosition(success, error, options)
      });
    },
    stopTravel() {
      navigator.geolocation.clearWatch(this.watchPositionID);
      console.log('marca de peticion a /profile/finish-travel')
      axios({
        method: 'get',
        url: `/profile/finish-travel`,
        responseType: 'json'
      })
      .then(response => {
        console.log({ 'finish-travel': response.data });
        this.noStandartOutput = {success:true, msg:response.data.msg}
        this.$set(this.travel, 'estado', 'finalizado')
      })
      .catch(e => console.error(e))
    }
  }
}
</script>
<style lang="css">
#child {
  width: auto;
  height: auto;
}
#parent {
  width: auto;
  height: 300px;
  display: inline-block;
}
</style>
