<template lang="html">
  <div class="border-top pb-3 px-3">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="text-primary py-2 mb-0">
          Vehiculo
        </h4>
        <p>Se le presentará aquí el vehiculo que tenga reservado o alquilado, junto a su información. Se le
          facilita la acción de reservar un vehiculo; para ello pulse <kbd class="bg-primary">Buscar vehiculo</kbd>.</p>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12 text-center">
        <base-button v-if="!showComponent" icon="fa fa-search" size="lg" type="primary" class="my-2 mr-0 radius" @click.prevent="searchVehicle">
          Buscar vehiculo
        </base-button>
      </div>
    </div>
    <div v-if="showComponent" class="row">
      <div class="col-lg-12 text-left mb-3">
        <div class="row mb-3">
          <div class="col">
            <p class="font-weight-normal text-center mb-0" style="color:rgb(119, 109, 27)">Estado</p>
            <p class="radius mb-0 px-3 py-1" style="border:.0625rem solid rgb(119, 109, 27);background-color:#ffe839a6">
              <span style="color:rgb(119, 109, 27)">{{stateVehicle}}</span>
            </p>
          </div>
          <div class="col-lg-8 col-12" v-if="vehicle.expiraReserva">
            <p class="font-weight-normal text-center mb-0" style="color:rgb(119, 109, 27)">Fecha de expiración</p>
            <p class="radius mb-0 px-3 py-1" style="border:.0625rem solid rgb(119, 109, 27);background-color:#ffe839a6">
              <span style="color:rgb(119, 109, 27)">{{date(vehicle.expiraReserva)}}</span>
            </p>
          </div>
          <div class="col-12">
            <p class="font-weight-normal text-center mb-0" style="color:rgb(119, 109, 27)">Mensaje</p>
            <p class="radius mb-0 px-3 py-sm-1 py-3" style="border:.0625rem solid rgb(119, 109, 27);background-color:#ffe839a6">
              <span style="color:rgb(119, 109, 27)">{{message}}</span>
            </p>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <p class="font-weight-bold rounded-top text-secondary bg-primary text-center py-2 mb-0">Modelo del vehiculo</p>
            <div class="row border-left border-right border-primary pt-2 mx-0">
              <div class="col">
                <p class="font-weight-normal text-primary text-center mb-0">Tipo</p>
                <p class="bg-secondary border border-primary text-primary radius mb-0 px-3 py-1">{{vehicle.tipo}}</p>
              </div>
              <div class="col">
                <p class="font-weight-normal text-primary text-center mb-0">Marca</p>
                <p class="bg-secondary border border-primary text-primary radius mb-0 px-3 py-1">{{vehicle.marca}}</p>
              </div>
              <div v-if="vehicle.tipo  === 'Motocicleta'" class="col-lg col-12">
                <p class="font-weight-normal text-primary text-center mb-0">Nº de plazas</p>
                <p class="bg-secondary border border-primary text-primary radius mb-0 px-3 py-1">{{vehicle.numPlazas}}</p>
              </div>
            </div>
            <div class="row border-left border-right border-primary mx-0">
              <div v-if="vehicle.tipo !== 'Motocicleta'" class="col">
                <p class="font-weight-normal text-primary text-center mb-0">Nº de plazas</p>
                <p class="bg-secondary border border-primary text-primary radius mb-0 px-3 py-1">{{vehicle.numPlazas}}</p>
              </div>
              <div v-if="vehicle.tipo !== 'Motocicleta'" class="col">
                <p class="font-weight-normal text-primary text-center mb-0">Nº de puertas</p>
                <p class="bg-secondary border border-primary text-primary radius mb-0 px-3 py-1">{{vehicle.numPuertas}}</p>
              </div>
              <div v-if="vehicle.tipo === 'Furgoneta'" class="col-lg-6 col-12">
                <p class="font-weight-normal text-primary text-center mb-0">Capacidad de carga</p>
                <p class="bg-secondary border border-primary text-primary radius mb-0 px-3 py-1">{{vehicle.capCarga}} Kg</p>
              </div>
            </div>
            <div class="row rounded-bottom border-bottom border-left border-right border-primary pb-3 mx-0 mb-3">
              <div class="col-lg-4 col-12">
                <p class="font-weight-normal text-primary text-center mb-0">Identificador</p>
                <p class="bg-secondary border border-primary text-primary radius mb-0 px-3 py-1">vhcl-{{vehicle.idPublic}}</p>
              </div>
              <div class="col-lg-4 col-6">
                <p class="font-weight-normal text-primary text-center mb-0">Autonomia</p>
                <p class="bg-secondary border border-primary text-primary radius mb-0 px-3 py-1">{{vehicle.autonomia}} km</p>
              </div>
              <div class="col-lg-4 col-6">
                <p class="font-weight-normal text-primary text-center mb-0">Matricula</p>
                <p class="bg-secondary border border-primary text-primary radius mb-0 px-3 py-1">{{vehicle.matricula}}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <p class="font-weight-bold rounded-top text-secondary bg-primary text-center py-2 mb-0">Localización geografica</p>
            <div class="row rounded-bottom border border-primary pt-2 pb-3 mx-0">
              <div class="col-lg col-12">
                <p class="font-weight-normal text-primary text-center mb-0">Localización</p>
                <p class="bg-secondary border border-primary text-primary radius mb-0 px-3 py-1">{{vehicle.localizacion}}</p>
              </div>
              <div v-if="vehicle.lat" class="col-lg col-6">
                <p class="font-weight-normal text-primary text-center mb-0">Latitud</p>
                <p class="bg-secondary border border-primary text-primary radius mb-0 px-3 py-1">{{vehicle.lat}}</p>
              </div>
              <div v-if="vehicle.long" class="col-lg col-6">
                <p class="font-weight-normal text-primary text-center mb-0">Longitud</p>
                <p class="bg-secondary border border-primary text-primary radius mb-0 px-3 py-1">{{vehicle.long}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row border bg-secondary rounded no-gutters align-items-center mt-3">
      <div class="col-auto px-2">
        <h5 class="text-monospace text-muted mb-0">N-05</h5>
      </div>
      <div class="col border-left pl-3 py-2 pr-1">
        <p class="font-weight-normal text-muted mb-0">El resultado que aparece es el documento referenciado dentro del esquema
          del usuario. Este documento no es otro que una instancia del modelo Vehiculo, que contiene la información
          relacionada a este (su estado).
          <router-link :to="{ name: 'ayuda', params: { topic: 'nota-al-pie', hash: 'n-05' }}">
            mas <i class="fa fa-angle-double-right" aria-hidden="true"></i>
          </router-link></p>
      </div>
    </div>

    <!-- <div class="row justify-content-center">
      <div class="col-9 text-center">
        <p class="font-weight-normal mb-0">El resultado que aparece es el primer documento
          en al coleccion Vehicles cuya propiedad esta realicionada al nickname del usuario.</p>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'VehiculoAlquilado',
  data () {
    return {
      showComponent: false,
      message: undefined
    }
  },
  created () {
    axios.defaults.headers.common['Authorization'] = this.getToken
    console.log('marca de peticion a /profile/vehicle')
    axios({
      method:'get',
      url:'/profile/vehicle',
      responseType:'json'
    })
    .then(response => {
      if (response.data.success) {
        console.log('Recuperamos los datos del vehicle a traves de nuestra API: ' + JSON.stringify(response.data));
        this.$store.commit('setVehicle', response.data.vehicle)
        this.message = response.data.msg
        this.showComponent = true
      } else {
        console.log(response.data.msg);
        this.message = response.data.msg
      }
    })
    .catch(e => {
      console.error(e);
    })
  },
  components: {

  },
  props: {

  },
  computed: {
    vehicle () {
      console.log({vehicle: this.$store.state.vehicle});
      return this.$store.state.vehicle
    },
    getToken (token) {
      if (window.localStorage.getItem('authUser'))
        return JSON.parse(window.localStorage.getItem('authUser')).jwtToken
      else
        return 'none'
    },
    stateVehicle() {
      let reserva = this.vehicle && this.vehicle.reserva
      if(reserva) {
        return 'Reservado'
      } else {
        return 'Alquilado'
      }
    }
  },
  methods: {
    date(date) {
      date = new Date(date)
      return date.toLocaleDateString() + ' a las ' + date.toLocaleTimeString()
    },
    searchVehicle() {
      this.$router.push({
        name: 'busqueda'
      })
    },
  }
}
</script>
<style lang="css">
</style>
