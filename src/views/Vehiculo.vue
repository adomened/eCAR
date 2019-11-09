<template>
  <div class="page">
    <section class="section-cover section-shaped my-0 bg-gradient-default">
      <div class="container px-0 py-5">
        <div class="row">
          <div class="col-12 pt-md-4 pt-0 mb-4 mb-md-0">
            <div class="profiling-header px-0 pt-5 text-center">
              <h2 class="font-weight-light text-center text-secondary">
                Ficha del vehiculo
              </h2>
              <p class="lead text-secondary text-center px-1">Quickly build an effective pricing table for your potential customers
                with this Bootstrap example. Potential customers with this Bootstrap example.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-secundario border-top-success">
      <div v-if="show" class="container px-0 pb-0 pb-sm-5 mt-4 mt-sm-0">
        <!-- <div class="col-12"> -->
          <card shadow class="card-page-regular border-0">
            <div class="row">
              <div class="col-12">
                <div class="row justify-content-center border-bottom">
                  <div class="col-lg-auto col">
                    <img
                      :src="vehiculo.picture.source"
                      :alt="vehiculo.picture.alt || vehicle.marca"
                      class="img-fluid mi-imagen">
                  </div>
                </div>
                <div class="row thumbnails text-right my-2" v-if="vehiculo.pictures.length > 1">
                  <div class="col-lg-2 col-md-3 col-4 px-0" v-for="img in vehiculo.pictures">
                    <img
                      :src="img.source"
                      :alt="img.alt || vehicle.marca"
                      class="rounded border img-fluid"
                      @click="updateImage(img)">
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="row align-items-center">
                  <div class="col">
                    <div class="row">
                      <div class="col-lg-auto col-12 pr-0">
                        <h1 class="mb-0">{{ vehicle.marca }}</h1>
                      </div>
                      <div class="col-lg-auto col">
                        <h1><small class="text-muted">{{ vehicle.clase }}</small></h1>
                      </div>
                    </div>
                  </div>
                  <div class="col-auto text-right">
                    <base-button size="sm"
                      :disabled="vehicle.reserva"
                      class="no-translate-y shadow-none less-padding ml-2"
                      type="primary"
                      v-on:click="">
                        Reservar
                    </base-button>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <badge class="mr-2" v-if="vehicle.disponible" type="success">Disponible</badge>
                <badge class="mr-2" v-else-if="vehicle.reserva" type="primary">Reservado</badge>
                <badge class="mr-2" v-else type="danger">No disponible</badge>
                <badge type="info">vhcl-{{vehicle.idPublic}}</badge>
              </div>

              <div class="col-12 py-3">
                <div class="container">
                  <div v-if="vehicle.description" class="row py-1">
                    <div class="col-lg-2 col-12 px-0 mb-1"><span class="font-weight-bold">Descripción</span></div>
                    <div class="col-lg-10 col-12 bg-secondary radius border py-4">
                      <span>{{ vehicle.description }}</span>
                    </div>
                  </div>
                  <div v-if="vehicle.reserva === true" class="row py-1">
                    <div class="col-lg-3 col-12 px-0 mb-1"><span class="font-weight-bold">Fecha de reserva</span></div>
                    <div class="col-lg-9 col-12 bg-secondary radius border">
                      <span>{{ formatDate }}</span>
                    </div>
                  </div>
                  <div v-if="vehicle.tipo" class="row py-1">
                    <div class="col-lg-3 col-12 px-0 mb-1"><span class="font-weight-bold">Tipo</span></div>
                    <div class="col-lg-9 col-12 bg-secondary radius border">
                      <span>{{ vehicle.tipo }}</span>
                    </div>
                  </div>
                  <div class="row py-1">
                    <div class="col-lg-3 col-12 px-0 mb-1"><span class="font-weight-bold">Matricula</span></div>
                    <div class="col-lg-9 col-12 bg-secondary radius border">
                      <span>{{ vehicle.matricula }}</span>
                    </div>
                  </div>
                  <div v-if="vehicle.autonomia" class="row py-1">
                    <div class="col-lg-3 col-12 px-0 mb-1"><span class="font-weight-bold">Autonomia</span></div>
                    <div class="col-lg-9 col-12 bg-secondary radius border">
                      <span>{{ vehicle.autonomia }} Km</span>
                    </div>
                  </div>
                  <div v-if="vehicle.tipo === 'Furgoneta'" class="row py-1">
                    <div class="col-lg-3 col-12 px-0 mb-1"><span class="font-weight-bold">Capacidad de carga</span></div>
                    <div class="col-lg-9 col-12 bg-secondary radius border">
                      <span>{{ vehicle.capCarga }} Kg</span>
                    </div>
                  </div>
                  <div v-if="vehicle.numPlazas" class="row py-1">
                    <div class="col-lg-3 col-12 px-0 mb-1"><span class="font-weight-bold">Numero de plazas</span></div>
                    <div class="col-lg-9 col-12 bg-secondary radius border">
                      <span>{{ vehicle.numPlazas }}</span>
                    </div>
                  </div>
                  <div v-if="vehicle.localizacion" class="row py-1">
                    <div class="col-lg-3 col-12 px-0 mb-1"><span class="font-weight-bold">Localización</span></div>
                    <div class="col-lg-9 col-12 bg-secondary radius border">
                      <span>{{ vehicle.localizacion }}</span>
                    </div>
                  </div>
                  <div v-if="vehicle.tipo !== 'Motocicleta'" class="row py-1">
                    <div class="col-lg-3 col-12 px-0 mb-1"><span class="font-weight-bold">Numero de puertas</span></div>
                    <div class="col-lg-9 col-12 bg-secondary radius border">
                      <span>{{ vehicle.numPuertas }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </card>
        <!-- </div> -->
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Vehicle',
  components: {

  },
  data () {
    return {
      // vehicle: {
      //   "idPublic": "5bc5fddfb7eb22e64fb95582",
      //   "index": 0,
      //   "reserva": true,
      //   "expiraReserva": "Wed Oct 17 2018 20:44:39",
      //   "disponible": false,
      //   "lat": "30.330361",
      //   "long": "83.754318",
      //   "tipo": "Furgoneta",
      //   "marca": "Opel",
      //   "description": "Magna dolore commodo ut culpa laborum sit cillum ad cillum elit amet proident. Quis officia nisi excepteur laboris do ex non veniam amet mollit. Reprehenderit aliquip magna dolor et culpa labore do exercitation culpa nostrud ex est enim minim. Amet non ea esse deserunt dolore reprehenderit eiusmod proident cupidatat adipisicing duis.\n\nExercitation magna sunt ex fugiat irure excepteur fugiat id incididunt est et ea quis. Officia veniam nulla eiusmod magna aliquip pariatur esse occaecat. Eiusmod laborum mollit amet consectetur. Lorem occaecat mollit exercitation culpa mollit ex nostrud duis ad commodo ea dolor.",
      //   "clase": "Clase A",
      //   "modificadoPor": "conrad.steele@ecar-uned.com",
      //   "localizacion": "Madrid",
      //   "matricula": "61675-MDI",
      //   "autonomia": 200,
      //   "numPlazas": 7,
      //   "numPuertas": 4,
      //   "capCarga": "1.750 kg"
      // }
      vehicle: {}
    }

  },
  props: {
    id: String
  },
  created () {
    axios.defaults.headers.common['Authorization'] = this.getToken
    axios({
      method:'post',
      url:'/vehicles/get-vehicle/' + this.id,
      responseType:'json'
    })
    .then(response => {
      console.log({data: response.data});
      this.vehicle = response.data.vehicle
      // this.message = response.data.msg
    })
    .catch(e => {
      console.error(e);
    })
  },
  computed: {
    formatDate() {
      if (this.vehicle.expiraReserva) {
        let date = new Date(this.vehicle.expiraReserva)
        return date.toLocaleDateString() + ' a las ' + date.toLocaleTimeString()
      }
    },
    vehiculo() {
      return {
        picture: {
          source: "/img/vehicles/van-720.png",
          alt: "imagen del vehiculo"
        },
        pictures: [
          {
            source: "/img/vehicles/vehicle-720_A.png",
            alt: "imagen del vehiculo"
          },
          {
            source: "/img/vehicles/motorbike-720_B.png",
            alt: "imagen del vehiculo"
          },
          {
            source: "/img/vehicles/van-720_C.png",
            alt: "imagen del vehiculo"
          }]
      }
    },
    getToken(token) {
      if (window.localStorage.getItem('authUser'))
        return JSON.parse(window.localStorage.getItem('authUser')).jwtToken
      else
        return 'none'
    },
    show(){
      return Object.keys(this.vehicle).length !== 0
    }
  },
  methods: {
    updateImage(img) {
      this.vehiculo.picture.source = img.source;
    }
  }
}
</script>
<style>
</style>
