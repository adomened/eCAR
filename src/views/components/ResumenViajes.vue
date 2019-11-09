<template lang="html">
  <div class="border-top pb-3 px-3">
    <div class="row justify-content-center">
      <div class="col-12 text-center">
        <h4 class="text-primary py-2 mb-0">
          Resumen de viajes
        </h4>
        <p>Observe toda la <i>información</i> registrada para un viaje. Pulse <kbd class="bg-primary">Editar</kbd> para
        realizar acciones sobre los mismos.</p>
      </div>
    </div>

    <div class="row justify-content-center">
      <div v-if="!travels.length" class="col-lg-12 text-center py-5 px-2 mb-3">
        <h6 class="d-flex align-items-center justify-content-center my-2" style="color:#8798ab">
          <i class="fa fa-exclamation-circle mr-2" aria-hidden="true"></i>
          No hay registro de viaje realizado
        </h6>
      </div>

      <div v-if="travels.length" class="col-12 px-3 mb-2">
        <div class="row justify-content-end align-items-center">
          <div class="col-auto border-left border-top rounded-left shadow-sm bg-white py-3">
            <base-switch v-model="favorito" class="mb-1">
              <p class="mb-0 pr-3">
                Mostrar favoritos
              </p>
            </base-switch>
          </div>
        </div>
      </div>

      <div v-if="travels.length" class="col-lg-12 px-0 mb-3 text-center">
        <div class="border-0" v-for="travel, index of resumeListTravels" :key="travel.idPublic">
          <div class="padre">
            <vue-scroll>
              <!-- :ops="ops" -->
              <div class="d-flex align-items-start mx-lg-5 mx-0">
                <div class="col columna border rounded shadow-sm bg-white text-center hijo mr-1 pb-2 mb-2">
                  <div class="row">
                    <div class="col-12 bg-secondary pt-2">
                      <i class="fa fa-eur" aria-hidden="true" style="font-size:1.8rem;"></i>
                    </div>
                    <div class="col-12 bg-secondary border-bottom pb-1">
                      <strong v-if="travel.importe.estado" class="d-block">Pagado</strong>
                      <PayPal v-if="!travel.importe.estado" :amount="toFormatPay(travel.importe.cuantia)" env="sandbox" @payment-authorized="payAuthorized" @payment-completed="payCompleted" @payment-cancelled="payCancelled"
                       :button-style="myStyle" currency="EUR" locale="es_ES" :client="credentials">
                      </PayPal>
                    </div>
                    <div class="col-12">
                      <p class="mb-0">{{toFormat(travel.importe.cuantia)}} €</p>
                    </div>
                  </div>
                </div>
                <div class="col columna border rounded shadow-sm bg-white text-center hijo mr-1 pb-2">
                  <div class="row">
                    <div class="col-12 bg-secondary pt-2">
                      <i class="fa fa-calendar" aria-hidden="true" style="font-size:1.8rem;"></i>
                    </div>
                    <div class="col-12 bg-secondary border-bottom pb-1">
                      <strong class="d-block">Iniciado</strong>
                    </div>
                    <div class="col-12">
                      <span class="d-inline-flex py-0">
                        <p class="mb-0">{{date(travel.fechaInicio)[1]}}</p>
                        <base-button size="sm" type="neutral" class="btn-tooltip no-translate-y border-0 mr-0"
                                     :id="'Inicio' + index" style="box-shadow:none;">
                                     <i class="fa fa-ellipsis-h text-body" style="font-size:.8rem"></i>
                        </base-button>
                        <bPopover :target="'Inicio' + index"
                                   placement="topright"
                                   boundary="viewport"
                                   title="Fecha y hora de inicio del viaje"
                                   triggers="hover"
                                   :content="date(travel.fechaInicio)[0]">
                        </bPopover>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col columna border rounded shadow-sm bg-white text-center hijo mr-1 pb-2">
                  <div class="row">
                    <div class="col-12 bg-secondary pt-2">
                      <i class="fa fa-tachometer" aria-hidden="true" style="font-size:1.8rem;"></i>
                    </div>
                    <div class="col-12 bg-secondary border-bottom pb-1">
                      <strong class="d-block">Distancia</strong>
                    </div>
                    <div class="col-12">
                      <p v-if="travel.distanciaRecorrida" class="mb-0">{{toFormat(travel.distanciaRecorrida)}} km</p>
                      <p v-else class="mb-0">0 km</p>
                    </div>
                  </div>
                </div>
                <div class="col columna border rounded shadow-sm bg-white text-center hijo mr-1 pb-2">
                  <div class="row">
                    <div class="col-12 bg-secondary pt-2">
                      <i class="fa fa-car" aria-hidden="true" style="font-size:1.8rem;"></i>
                    </div>
                    <div class="col-12 bg-secondary border-bottom pb-1">
                      <strong class="d-block">Vehiculo</strong>
                    </div>
                    <div class="col-12">
                      <router-link class="btn btn-secondary btn-sm border-0 no-translate-y shadow-none less-padding" style="box-shadow:none;background-color:transparent;" :to="{ name: 'vehiculo', params: { id: travel.vehiculo.idPublic }}">
                        <i class="fa fa-link text-body" aria-hidden="true"></i>
                        <span class="text-body">Ver</span>
                      </router-link>
                    </div>
                  </div>
                </div>
                <div class="col columna border rounded shadow-sm bg-white text-center hijo mr-1 pb-2">
                  <div class="row">
                    <div class="col-12 bg-secondary pt-2">
                      <i class="fa fa-calendar" aria-hidden="true" style="font-size:1.8rem;"></i>
                    </div>
                    <div class="col-12 bg-secondary border-bottom pb-1">
                      <strong class="d-block">Finalizado</strong>
                    </div>
                    <div class="col-12">
                      <span class="d-inline-flex">
                        <p class="mb-0">{{date(travel.fechaFinal)[1]}}</p>
                        <base-button size="sm" type="neutral" class="btn-tooltip no-translate-y mr-0" style="box-shadow:none;"
                                     :id="'final' + index">
                                     <i class="fa fa-ellipsis-h text-body" style="font-size:.8rem"></i>
                        </base-button>
                        <bPopover :target="'final' + index"
                                   placement="top"
                                   boundary="viewport"
                                   title="Fecha y hora de inicio del viaje"
                                   triggers="hover"
                                   :content="date(travel.fechaFinal)[0]">
                        </bPopover>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col columna border rounded shadow-sm bg-white text-center hijo pb-2">
                  <div class="row">
                    <div class="col-12 bg-secondary pt-2">
                      <i class="fa fa-crosshairs" aria-hidden="true" style="font-size:1.8rem;"></i>
                    </div>
                    <div class="col-12 bg-secondary border-bottom pb-1">
                      <strong class="d-block">Localización</strong>
                    </div>
                    <div class="col-12">
                      <span class="d-inline-flex">
                        <base-button size="sm" type="neutral" class="btn-tooltip no-translate-y mr-0" style="box-shadow:none;"
                                     :id="'localizacion' + index">
                                     <i class="fa fa-location-arrow text-body" aria-hidden="true"></i>
                        </base-button>
                        <bPopover :target="'localizacion' + index"
                                   placement="top"
                                   boundary="viewport"
                                   title="Localización geografica"
                                   triggers="hover"
                                   :content="localizacionTravel(travel)">
                        </bPopover>
                      </span>
                    </div>
                  </div>
                </div>
                <div v-if="edit" class="col columna border rounded shadow-sm bg-white hijo ml-1 py-2">
                    <div class="text-left mb-1">
                      <!-- <base-button size="sm" type="neutral" class="btn-tooltip no-translate-y mr-0" style="box-shadow:none;"
                                   :id="'Favorito' + index">
                                   <i class="fa fa-info text-primary" style="font-size:.8rem"></i>
                      </base-button> -->
                      <base-button v-if="!travel.favorito" @click.prevent="addFavoriteTravel(travel)" class="btn btn-secondary mr-0 btn-sm border-0 no-translate-y shadow-none less-padding" style="box-shadow:none;background-color:transparent;">
                        <i class="fa fa-heart-o text-primary"></i>
                        <strong class="text-primary">Favorito</strong>
                      </base-button>
                      <base-button v-else @click.prevent="subtractFavoriteTravel(travel)" class="btn btn-secondary mr-0 btn-sm border-0 no-translate-y shadow-none less-padding" style="box-shadow:none;background-color:transparent;">
                        <i class="fa fa-heart text-primary"></i>
                        <strong class="text-primary">Quitar</strong>
                      </base-button>
                      <!-- <bPopover :target="'Favorito' + index"
                                 placement="top"
                                 boundary="viewport"
                                 title="Favoritos"
                                 triggers="hover"
                                 content="Puedes registrar (llevar un registro) como favoritos aquellos viajes para los cuales quieras llevar un seguimiento particular">
                      </bPopover> -->
                    </div>

                    <div class="text-left mb-1">
                      <!-- <base-button size="sm" type="neutral" class="btn-tooltip no-translate-y mr-0" style="box-shadow:none;"
                                   :id="'Eliminar' + index">
                                   <i class="fa fa-info text-primary" style="font-size:.8rem"></i>
                      </base-button> -->
                      <base-button @click.prevent="removeTravel(travel)" class="btn btn-secondary mr-0 btn-sm border-0 no-translate-y btn-no-shadow less-padding" style="box-shadow:none;background-color:transparent;">
                        <i class="fa fa-trash-o text-primary" aria-hidden="true"></i>
                        <strong class="text-primary">Eliminar</strong>
                      </base-button>
                      <!-- <bPopover :target="'Eliminar' + index"
                                 placement="top"
                                 boundary="viewport"
                                 title="Eliminar registro del viaje"
                                 triggers="hover"
                                 content="Todos hemos tenido algun que otro viaje que preferimos olvidar. Esta funcion te permite no recodar ese viaje">
                      </bPopover> -->
                    </div>

                    <div class="text-left">
                      <!-- <base-button size="sm" type="neutral" class="btn-tooltip no-translate-y mr-0" style="box-shadow:none;"
                                   :id="'Consulta' + index">
                                   <i class="fa fa-info text-primary" style="font-size:.8rem"></i>
                      </base-button> -->
                      <base-button @click.prevent="consultAboutTravel(travel)" class="btn btn-secondary mr-0 btn-sm border-0 no-translate-y btn-no-shadow less-padding" style="box-shadow:none;background-color:transparent;">
                        <i class="fa fa-comments-o text-primary" aria-hidden="true"></i>
                        <strong class="text-primary">Consulta</strong>
                      </base-button>
                      <!-- <bPopover :target="'Consulta' + index"
                                 placement="top"
                                 boundary="viewport"
                                 title="Realizar consulta"
                                 triggers="hover"
                                 content="Te permite realizar una consulta sobre el viaje. Nos permite identificar de forma inequívoca el viaje en cuestion.">
                      </bPopover> -->
                    </div>
                  </div>
              </div>
            </vue-scroll>
          </div>
        </div>

        <div v-if="filterTravelsCount > 3 && !(resumeListTravels.length === travels.length)" class="row justify-content-center">
          <div class="col-lg-9 text-center">
            <base-button size="sm" @click="showMoreItemsListTravel(2)" type="transparent" class="btn-tooltip no-translate-y bg-white mr-0" style="box-shadow:none;background-color:transparent;">
              <span class="d-flex align-items-center text-body">
                <i class="fa fa-chevron-circle-down mr-2" aria-hidden="true"></i>Mostrar más
              </span>
            </base-button>
          </div>
        </div>
      </div>
    </div>

    <div class="row border bg-secondary rounded no-gutters align-items-center mt-3">
      <div class="col-auto px-2">
        <h5 class="text-monospace text-muted mb-0">N-07</h5>
      </div>
      <div class="col border-left pl-3 py-2 pr-1">
        <p class="font-weight-normal text-muted mb-0">Aqui podrás ver los viajes que has realizado recientemente, junto a su importe y metadatos que
          almacenamos de el. Puedes ver el vehiculo utilizado y añadir el viaje a tus rutas o viajes preferidos.
          <router-link :to="{ name: 'ayuda', params: { topic: 'nota-al-pie', hash: 'n-07' }}">
            mas <i class="fa fa-angle-double-right" aria-hidden="true"></i>
          </router-link></p>
      </div>
    </div>

    <!-- <div class="row">
      <div class="col-lg-9 text-center mb-3">
        <p class="font-weight-normal">Aqui podrás ver los viajes que has realizado recientemente, junto a su importe y metadatos que
          almacenamos de el. Puedes ver el vehiculo utilizado y añadir el viaje a tus rutas o viajes preferidos.
          O quizas quieras llevar un registro de determinados viajes que hayas hecho. Como siempre decimos en eCAR,
          una herramienta se puede utilizar de multiples formas, la correcta es la que te sea mas util.</p>
      </div>
    </div> -->
  </div>
</template>

<script>
import bPopover from 'bootstrap-vue/es/components/popover/popover';
import axios from 'axios'
import PayPal from 'vue-paypal-checkout'

export default {
  name: 'ResumenViajes',
  data () {
    return {
      // ops: {
      //   vuescroll: {
      //     mode: 'slide',
      //     detectResize: true,
      //     zooming: false,
      //     scroller: {
      //       locking: true,
      //       preventDefaultOnMove: true,
      //       preventDefault: true,
      //       penetrationDeceleration: 0.75
      //     }
      //   },
      //   bar: {
      //     background: '#5e72e4',
      //     showDelay: 250,
      //     opacity: 40
      //   },
      //   scrollPanel: {
      //     scrollingX: true,
      //     scrollingY: false,
      //     padding: false
      //   }
      // },
      credentials: {
        sandbox: 'ARZCOGI1Ik_nXxgtI8fvcxvJT7O_agDeJ3uK38S8H0df0WzkXozyI3Bhp6YH-rN6Rq6i28X_Po9WBz6u',
        production: ''
      },
      myStyle: {
        label: 'checkout',
        size:  'responsive',
        shape: 'pill',
        color: 'blue'
      },
      eventPayAuth: 'event payment-authorized ...',
      eventPayCompleted: 'event payment-completed ...',
      eventPayCancelled: 'event payment-cancelled ...'
    }
  },
  props: {
    edit: {
      type: Boolean,
      description: 'editar la informacion del perfil',
      default: false
    }
  },
  components: {
    bPopover,
    PayPal
  },
  created () {
    axios.defaults.headers.common['Authorization'] = this.getToken
    if (this.travels.length === 0) {
      console.log('marca de peticion a /profile/travels');
      axios({
        method:'get',
        url:'/profile/travels',
        responseType:'json'
      })
      .then(response => {
        if (response.data.success) {
          console.log({ viajes: response.data.travels });
          this.$store.commit('setTravels', response.data.travels)
        } else {
          console.error('Petición a la API: ' + response.data.msg);
        }
      })
      .catch(e => {
        console.error(e);
      })
    }
  },
  computed: {
    resumeListTravels () {
      return this.$store.getters.resumeListTravels
    },
    getToken (token) {
      if (window.localStorage.getItem('authUser'))
        return JSON.parse(window.localStorage.getItem('authUser')).jwtToken
      else
        return 'none'
    },
    favorito: {
      get: function () {
        return this.$store.state.favorite
      },
      set: function (value) {
        this.$store.commit('setFavorite', value)
      }
    },
    filterTravelsCount(){
      return this.$store.getters.filterTravels.length
    },
    travels () {
      return this.$store.state.travels
    },
    localizacionTravel(){
      return function(travel){
        return 'Iniciado:\n lat: ' + travel.localizacionGeoInicio.lat + '\nlong: ' + travel.localizacionGeoInicio.long +
          '\n\nFinalizado:\n lat: ' + travel.localizacionGeoFinal.lat + '\nlong: ' + travel.localizacionGeoFinal.long;
      }
    }
  },
  methods: {
    removeTravel(travel) {
      console.log('marca de peticion a /remove-travel');
      axios({
        method:'post',
        url:'/profile/remove-travel',
        responseType:'json',
        data: { id: travel.idPublic }
      })
      .then(response => {
        if(response.data.success){
          this.emitMessage(false, 'Exito ', 'success', undefined, response.data.msg, 'ni ni-like-2')
        } else {
          this.emitMessage(false, 'Atención ', 'warning', undefined, response.data.msg, 'ni ni-notification-70')
        }
      })
      .catch(e => {
        console.error(e);
      })
    },
    subtractFavoriteTravel(travel) {
      console.log('marca de peticion a /subtract-favorite-travel');
      axios({
        method:'post',
        url:'/profile/subtract-favorite-travel',
        responseType:'json',
        data: { id: travel.idPublic }
      })
      .then(response => {
        if(response.data.success){
          this.emitMessage(false, 'Exito ', 'success', undefined, response.data.msg, 'ni ni-like-2')
        } else {
          this.emitMessage(false, 'Atención ', 'warning', undefined, response.data.msg, 'ni ni-notification-70')
        }
      })
      .catch(e => {
        console.error(e);
      })
    },
    addFavoriteTravel(travel) {
      console.log('marca de peticion a /add-favorite-travel');
      axios({
        method:'post',
        url:'/profile/add-favorite-travel',
        responseType:'json',
        data: { id: travel.idPublic }
      })
      .then(response => {
        if(response.data.success){
          this.emitMessage(false, 'Exito ', 'success', undefined, response.data.msg, 'ni ni-like-2')
        } else {
          this.emitMessage(false, 'Atención ', 'warning', undefined, response.data.msg, 'ni ni-notification-70')
        }
      })
      .catch(e => {
        console.error(e);
      })
    },
    consultAboutTravel(travel) {
      console.log('consult about a travel ' + travel.idPublic);
      this.$emit('new-query', travel.idPublic)
      // voy a tener que hacer un push en el objeto $router y añadir un prop en
      // consultas telematicas para pasar el identificasdor publico del Viaje
    },
    showMoreItemsListTravel (toAdd) {
      this.$store.commit('showMoreItemsListTravel', toAdd)
    },
    date(date) {
      date = new Date(date)
      return [date.toLocaleDateString() + ' a las ' + date.toLocaleTimeString(), date.toLocaleDateString()]
    },
    payAuthorized (payload) {
      this.eventPayAuth = payload
      console.log('event payment-authorized: ' + JSON.stringify(payload))
    },
    payCompleted (payload) {
      this.eventPayCompleted = payload
      console.log('event payment-completed: ' + JSON.stringify(payload))
      console.log('marca de peticion a /pay-travel');
      axios({
        method:'post',
        url:'/profile/pay-travel',
        responseType:'json',
        data: { id: travel.idPublic }
      })
      .then(response => {
        if(response.data.success){
          this.emitMessage(false, 'Exito ', 'success', undefined, response.data.msg, 'ni ni-like-2')
        } else {
          this.emitMessage(false, 'Atención ', 'warning', undefined, response.data.msg, 'ni ni-notification-70')
        }
      })
      .catch(e => {
        console.error(e);
      })
    },
    payCancelled (payload) {
      this.eventPayCancelled = payload
      console.log('event payment-cancelled: ' + JSON.stringify(payload))
    },
    toFormatPay(payload) {
      let n = this.toFormat(payload)
      return n.replace(/\,/, ".")
    },
    toFormat (payload) {
      let string_payload = payload.toLocaleString('es', {maximumFractionDigits : 2})
      return string_payload
    },
    emitMessage(...payload){
      this.$emit('message', payload)
    }
  }
}
</script>

<style lang="css" scoped>
.padre{
  white-space: nowrap;
  overflow: auto;
}
.hijo{
  display: inline-block !important;
  /* max-height: 150px !important; */
}
.columna{
  width: 147px !important;
  height: 100px !important;
}
.columna-s{
  width: auto !important;
  height: 100px !important;
}
</style>
