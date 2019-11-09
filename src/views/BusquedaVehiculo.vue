<template lang="html">
  <div class="starter-page">
    <section class="bg-gradient-pordefecto">
      <div class="container">
        <div class="row align-items-end" style="min-height:300px;padding-top:100px;">
          <div class="col-12">
            <h1 class="font-weight-light text-center mt-0 mb-3 text-secondary">
              Busqueda del vehiculo
            </h1>
          </div>
          <div class="col-12">
            <p class="lead text-secondary text-center mb-5">Aqui podrás encontrar el vehiculo que se ajuste a tus intereses, descartar
              aquellos que no te interesen y reservar aquel que si. Estas reservas se realizan de manera individualizada y como maximo
              una por usuario.</p>
          </div>

          <div class="col-12 col-lg-8">
            <card class="card-search mb-3 p-2 bg-secondary" no-body>
              <form role="form">
                <div class="row justify-content-left text-left">
                  <div class="col-md-4">
                    <base-input alternative
                                class="mb-1"
                                v-model.trim="vehicle.marca"
                                placeholder="Marca"
                                addon-left-icon="fa fa-filter">
                    </base-input>
                  </div>
                  <div class="col-md-4">
                    <base-input alternative
                                :select="['Clase A','Clase S','Clase X']"
                                v-on:toggle="toggleValue(vehicle, 'clase', $event)"
                                class="mb-1" buttonLeft="fa fa-angle-down"
                                v-model.trim="vehicle.clase" disabled
                                placeholder="Clase"
                                addon-left-icon="fa fa-filter">
                    </base-input>
                  </div>
                  <div class="col-md-4">
                    <base-input alternative
                                :select="['Coche', 'Motocicleta', 'Furgoneta']"
                                v-on:toggle="toggleValue(vehicle, 'tipo', $event)"
                                class="mb-1" buttonLeft="fa fa-angle-down"
                                v-model.trim="vehicle.tipo" disabled
                                placeholder="Tipo"
                                addon-left-icon="fa fa-filter">
                    </base-input>
                  </div>
                </div>
                <div class="row justify-content-left text-left">
                  <div class="col-md-6">
                    <base-input alternative
                                :select="['Almeria', 'Madrid', 'Galicia']"
                                v-on:toggle="toggleValue(vehicle, 'localizacion', $event)"
                                class="mb-1" buttonLeft="fa fa-angle-down"
                                v-model.trim="vehicle.localizacion" disabled
                                placeholder="Oficina de recogida"
                                addon-left-icon="fa fa-building-o">
                    </base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input alternative
                                class="mb-1"
                                :select="['mayor a', 'igual a', 'menor a']"
                                v-model.trim="vehicle.autonomia"
                                v-on:toggle="toggleValue(vehicle, 'selectAutonomia', $event)"
                                :textButtonLeft="vehicle.selectAutonomia"
                                placeholder="Autonomia (Km)"
                                addon-left-icon="fa fa-battery-quarter">
                    </base-input>
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div class="col-12">
                    <div class="text-center">
                        <base-button size="lg" type="default" nativeType="submit" class="my-2 w-100" @click.prevent="getVehicles">
                          <!-- type="dark" -->
                          <i slot="icon" class="fa fa-search"></i>
                          Buscar
                        </base-button>
                    </div>
                    <div v-show="showCountVehicles" class="text-right no-gutters">
                      <badge type="secondary" style="font-size:.8rem;">Se han encontrado <strong>{{vehicles.length}}</strong> vehiculos</badge>
                    </div>
                  </div>
                </div>
              </form>
            </card>
          </div>

          <div class="col-12 col-lg-4">
            <card class="card-search bg-default mb-3" no-body>
              <!-- bg-dark -->
              <div class="row justify-content-left text-left px-2 my-2">
                <div class="col-md-12">
                  <p class="text-center text-monospace rounded text-white">
                    <i class="fa fa-terminal" aria-hidden="true"></i>
                    Filtrar resultados
                  </p>
                </div>
                <div class="col-md-12">
                  <div class="row justify-content-between px-3">
                    <div class="col-auto px-0">
                      <span class="text-monospace text-secondary" style="font-size:.85rem;">
                        Mostrar solo disponibles
                      </span>
                    </div>
                    <div class="col-auto px-0">
                      <base-button type="default"
                                  nativeType="button"
                                  class="mr-0 p-0 btn-no-shadow no-translate-y font-weight-light text-monospace"
                                  @click.prevent="toggleValue(switchs,'disponible',!switchs.disponible)">
                        <span style="color:#f4f5f742" :class="[{'text-secondary': switchs.disponible === false}]">[n]</span>
                        <span>/</span>
                        <span style="color:#f4f5f742" :class="[{'text-secondary': switchs.disponible === true}]">[y]</span>
                      </base-button>
                    </div>
                  </div>
                  <div class="row justify-content-between px-3">
                    <div class="col-auto px-0">
                      <span class="text-monospace text-secondary" style="font-size:.85rem;">
                        Mostrar reservas
                      </span>
                    </div>
                    <div class="col-auto px-0">
                      <base-button type="default"
                                  nativeType="button"
                                  class="mr-0 p-0 btn-no-shadow no-translate-y font-weight-light text-monospace"
                                  @click.prevent="toggleValue(switchs,'reserva',!switchs.reserva)">
                        <span style="color:#f4f5f742" :class="[{'text-secondary': switchs.reserva === false}]">[n]</span>
                        <span>/</span>
                        <span style="color:#f4f5f742" :class="[{'text-secondary': switchs.reserva === true}]">[y]</span>
                      </base-button>
                    </div>
                  </div>
                  <!-- <base-switch v-model="switchs.disponible" class="mb-1">
                    <span class="text-monospace text-secondary" style="font-size:.8rem;">
                      Mostrar solo disponibles
                    </span>
                  </base-switch>
                  <span class="clearfix"></span>
                  <base-switch v-model="switchs.reserva">
                    <span class="text-monospace text-secondary" style="font-size:.8rem;">
                      Mostrar reservas
                    </span>
                  </base-switch> -->
                </div>
              </div>
            </card>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-secundario border-top-success">
      <div class="container py-3">
        <div class="row">
          <div class="col-12 px-0">
            <!-- he quitado mb-5 del atributo class de arriba -->
            <card shadowSize="sm" class="card-search p-2 border-0" no-body>
              <div v-if="vehicles.length!==0" v-show="showCountVehicles" class="row no-gutters align-items-end justify-content-between mb-3">
                <base-button class="p-2" type="default" @click="getPerPage">
                  <strong>{{perPage}} Vehiculos <small class="font-weight-bold">x</small></strong>
                  <i class="fa fa-file-o" size="sm" aria-hidden="true"></i>
                </base-button>
                <badge type="secondary" v-show="pagination.totalPages > 1" style="font-size:.8rem;">Pagina {{ currentPage }} de {{ pagination.totalPages }}</badge>
              </div>

              <!-- <base-alert type="secondary" style="background-color:#ffe839a6;border-left: 6px solid rgb(119, 109, 27);;border-radius: 0rem .25rem .25rem 0rem;">
                <span class="alert-inner--icon text-center d-block">
                  <i class="fa fa-bolt" style="font-size:1.5rem; color:rgb(119, 109, 27);"></i>
                </span>
                <span class="alert-inner--text" style="color:rgb(119, 109, 27);">
                  <strong>NOTA IMPORTANTE:</strong> Los vehiculos que aparecen inicialmente son <strong>datos estaticos</strong>,
                  presentes en el codigo del lado del cliente (puede jugar con ellos). Si quiere recuperar <strong>contenido dinamico</strong>
                  procedente del lado del servidor debera realizar una busqueda.
                </span>
              </base-alert> -->

              <!-- <MensajeFlash :dismissible="true" messageStrong="Exito" typeAlert="success" error="esto eh una prueba" icono="ni ni-like-2"></MensajeFlash> -->

              <transition-group v-if="vehicles.length!==0" name="list-complete" tag="div" class="mb-3" appear>
                <div v-for="vehicle, index of paginate()"
                      :key="vehicle.idPublic"
                      v-show="show"
                      class="container-fluid mt-2 border rounded-right list-complete-item"
                      no-body>
                  <div v-if="!vehicle.showConfirm" class="row">
                    <div class="d-sm-block d-lg-none col-12 align-self-center" style="width:auto; height:auto; border-radius: .25rem 0rem 0rem .25rem;">
                      <img :src="vehicle.picture" alt="imagen del vehiculo" class="img-fluid mi-imagen">
                    </div>
                    <div class="d-none d-lg-inline col-3 align-self-center" style="width:auto; height:auto; border-radius: .25rem 0rem 0rem .25rem;">
                      <img :src="vehicle.picture" alt="imagen del vehiculo" class="img-fluid mi-imagen">
                    </div>
                    <div class="col-sm-12 col-lg-9 px-2 pb-2 pt-2 bg-secondary">
                      <div class="row justify-content-start text-center text-lg-left">
                        <div class="col-sm-12 col-lg-6 mb-2">
                          <base-button size="sm" class="no-translate-y shadow-none less-padding" type="primary" v-on:click="showConfirmReserve(vehicle, true)">Reservar</base-button>
                          <!-- <base-button size="sm" class="no-translate-y shadow-none less-padding" type="danger" v-on:click.prevent="remove((currentPage - 1) * perPage + index)">descartar</base-button> -->
                          <base-button size="sm" class="no-translate-y shadow-none less-padding" type="danger" v-on:click.prevent="remove(vehicle.matricula)">descartar</base-button>
                          <router-link class="btn btn-default btn-sm no-translate-y shadow-none less-padding" :to="{ name: 'vehiculo', params: { id: vehicle.idPublic }}">+ info</router-link>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12 col-lg-6 mb-0">
                          <span class="text-default">Marca: <span class="font-weight-bold">{{vehicle.marca}}</span></span>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-6 mb-0">
                          <span class="text-default">
                            <span class="font-weight-bold">
                              <i class="fa fa-building-o" size="sm" aria-hidden="true"></i> {{vehicle.localizacion}}
                            </span>
                          </span>
                        </div>
                        <div class="col-6 mb-0">
                          <span class="text-default">Clase: <span class="font-weight-bold">{{vehicle.clase }}</span></span>
                        </div>
                        <!-- <div class="col-6 mb-0">
                          <span>Matricula: <span class="font-weight-bold">{{vehicle.matricula}}</span></span>
                        </div> -->
                      </div>
                      <div class="row">
                        <div class="col-6 mb-0">
                          <span class="text-default">
                            <span class="font-weight-bold">
                              <i class="fa fa-battery-quarter" size="sm" aria-hidden="true"></i> {{vehicle.autonomia}}km
                            </span>
                          </span>
                        </div>
                        <div class="col-6 mb-0">
                          <span class="text-default">Tipo: <span class="font-weight-bold">{{vehicle.tipo}}</span></span>
                        </div>
                      </div>
                      <div class="row justify-content-between">
                        <div class="col mt-1">
                          <badge v-if="vehicle.disponible" type="success">Disponible</badge>
                          <badge v-else-if="vehicle.reserva" type="secondary">Reservado</badge>
                          <badge v-else type="danger">No disponible</badge>
                        </div>
                        <div class="col text-right mt-1">
                          <badge type="secondary">vhcl-{{vehicle.idPublic}}</badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="vehicle.showConfirm" class="row justify-content-center py-4 bg-secondary">
                    <div class="col-12">
                      <p class="font-weight-normal text-center">Va a realizar la reserva de este vehiculo</p>
                    </div>
                    <div class="col-auto">
                      <base-button size="lg" class="no-translate-y shadow-none" type="success" v-on:click="reserveVehicle(vehicle)">Aceptar</base-button>
                      <base-button size="lg" class="no-translate-y shadow-none" type="primary" v-on:click="showConfirmReserve(vehicle, undefined, true)">Cancelar</base-button>
                    </div>
                    <div v-if="message" class="col-12">
                      <span class="d-flex align-items-center justify-content-center my-2" style="color:#8798ab">
                        <i class="fa fa-exclamation-circle mr-2" aria-hidden="true" style="font-size:1.4rem"></i> {{ message }}
                      </span>
                    </div>
                  </div>
                </div>
              </transition-group>

              <div v-if="vehicles.length===0" style="min-height: 750px;" class="col-12 d-flex align-items-center justify-content-center text-center px-0 mb-4">
                <div class="row py-4 rounded bg-secondary w-100">
                  <span class="col-12 mb-2"><i class="fa fa-exclamation-circle text-muted mr-4" aria-hidden="true" style="font-size:2rem"></i></span>
                  <h2 class="col-12 text-muted pb-3 border-bottom">Los resultados aparecerán aquí</h2>
                  <span class="col-12 text-left text-muted">
                    <p>La busqueda la puede efectuar atendiendo a los diferentes atributos adheridos al modelo de vehiculo que se recoge
                      en nuestra base datos. Estos son (NO ES NECESARIO QUE COMPLETE TODOS LOS CAMPOS):</p>
                    <ul class="list-style">
                      <li>Clase
                        <p class="d-inline">El atributo clase es en el plan en que esta recogido el vehiculo atendiendo a su autonomia. Esta
                          puede ser: <badge type="primary">clase A</badge>, <badge type="warning">clase S</badge> y <badge type="danger">clase X</badge></p>
                      </li>
                      <li>Marca
                        <p class="d-inline">El atributo marca atiende al fabricante del vehiculo.</p>
                        <p class="mb-0"><i class="font-weight-bold">EJEMPLO:</i> Con una simple <span class="font-weight-bold">C</span> arrojaria datos de vehiculos de
                          <span class="font-weight-bold">C</span>itroën, <span class="font-weight-bold">C</span>adillac y
                          <span class="font-weight-bold">C</span>hrysler. Asi como una entrada <span class="font-weight-bold">Ch</span>
                          daria como resultado vehiculos de <span class="font-weight-bold">Ch</span>rysler y <span class="font-weight-bold">Ch</span>evrolet</p>
                      </li>
                      <li>Tipo y Oficina de recogida
                        <p class="d-inline">El atributo tipo viene siendo si se trata de un Coche, Motocicleta o Fugoneta. La oficina de recogida es donde
                        tenemos situadas nuestras instalaciones y donde estarán nuestro vehiculos a su disposición (Almeria, Madrid y Galicia).</p>
                      </li>
                      <li>Autonomia
                        <p class="d-inline">El atributo autonomia atiende a como de atonomo es el vehiculo. Cuantos kilometros puede hacer entre recargas.</p>
                        <p><i class="font-weight-bold">EJEMPLO:</i> Asi, con una entrada de 250 y con el indicador situado en <i>MENOR A</i> (o igual inclusive) los resultados serán
                          vehiculos que van desde 0 a 250 kilomeros de autonomia.</p>
                      </li>
                    </ul>
                  </span>
                  <span class="col-12 text-left text-muted">
                    <small>NOTA: Los anteriores ejemplos, son solo eso, ejemplos practicos de uso de la aplicación. <strong>No</strong> significa
                      que introduciendo dichos datos la salida corresponda con los ejemplos dados.</small>
                  </span>
                </div>
              </div>

              <div>
                <base-pagination color="blue" v-show="pagination.totalPages > 1" :value="currentPage" @input="currentPage = $event" :page-count="pagination.totalPages" :per-page="perPage" align="center" size="lg"></base-pagination>
              </div>

              <base-alert class="mb-0" type="secondary" style="border-left: 6px solid #8898aa;border-radius: 0rem .25rem .25rem 0rem;">
                <span class="alert-inner--icon text-center d-block">
                  <i class="fa fa-info-circle" style="font-size:1.5rem; color:#8898aa;"></i>
                </span>
                <span class="alert-inner--text text-muted">
                  <strong>INFORMACIÓN: </strong>Los vehiculos que aparecen con una etiqueta de <strong>reservado</strong> son aquellos que se encuentran en reserva pero
                  que aun no han sido recogidos de nuestras instalaciones. Esta reserva estará activa durante <strong>30 minutos</strong>
                  desde el momento que se ha hecho la reserva. Aquellos vehiculos que excedan estos 30 minutos sin ser confirmada su reserva
                  pasarán a estar disponibles tan pronto como el sistema lo detecte.
                </span>
              </base-alert>

            </card>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-12 mt-3 px-0">
            <card shadow no-body class="border-0">
              <div class="text-center bg-success text-monospace rounded-top text-white mb-0">
                <i class="fa fa-terminal pr-2" aria-hidden="true"></i>
                <small>Consola</small>
              </div>
              <div id="parent" class="bg-dark text-secondary text-monospace rounded-bottom mb-0 pl-2" style="min-height:190px">
                <vue-scroll :ops="ops">
                  <small id="child">
                    <span class="font-weight-bold d-block">[lagarto@lomo ~]$ ...</span>
                    <ul v-if="noStandartOutput.length" class="list-unstyled">
                      <li v-for="output in noStandartOutput">
                        <span v-if="output.unique">
                          <span class="font-weight-bold">[lagarto@lomo ~]$</span> {{output.msg}}
                        </span>
                        <span v-else>
                          <span class="font-weight-bold">[lagarto@lomo ~]$</span>
                          el vehiculo identificado por {{output}} a cambiado su estado a disponible
                        </span>
                      </li>
                    </ul>
                  </small>
                </vue-scroll>
              </div>
            </card>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import MensajeFlash from './components/MensajeFlash'

export default {
  components: {
    MensajeFlash
  },
  data () {
    return {
      ops: {
        vuescroll: {
          mode: 'native'
        },
        bar: {
          background: '#2dce89',
          showDelay: 250,
          opacity: 40
        },
        scrollPanel: {
          scrollingX: false,
          scrollingY: true,
          padding: false
        }
      },
      noStandartOutput: [],
      showDialogReserve: false,
      perPage: 5,
      currentPage: 1,
      vehicle: {
        selectAutonomia: 'menor a'
      },
      switchs: {
        disponible: false,
        reserva: true
      },
      showCountVehicles: true,
      message: false,
      show: true
    }
  },
  watch: {
    '$route'(to) {
      this.currentPage = parseInt(to.query.page) || 1;
    },
    perPage() {
      if(this.currentPage > this.pagination.totalPages) {
        this.$router.push({
          query: Object.assign({}, this.$route.query, {
            page: this.pagination.totalPages
          })
        })
      }
    }
  },
  created() {
    if(this.$route.query.page <= this.pagination.totalPages) {
      this.currentPage = parseInt(this.$route.query.page);
    } else {
      this.currentPage = 1;
    }
  },
  mounted () {
    console.log('mounted search a vehicle');
    axios.defaults.headers.common['Authorization'] = this.getToken
  },
  computed: {
    vehicles () {
      return this.$store.state.vehicles
    },
    filtrarVehiculos () {
      if (this.switchs.disponible && this.switchs.reserva)
        return this.vehicles.filter(vehicle => vehicle.disponible === true || vehicle.reserva === true);
      else if (this.switchs.disponible)
        return this.vehicles.filter(vehicle => vehicle.disponible === true);
      else if (!this.switchs.reserva)
        return this.vehicles.filter(vehicle => vehicle.reserva === false);
      else return this.vehicles
    },
    pagination() {
      if(this.vehicles) {
        let totalProducts = this.filtrarVehiculos.length,
          pageFrom = (this.currentPage * this.perPage) - this.perPage,
          totalPages = Math.ceil(totalProducts / this.perPage);

        return {
          totalProducts: totalProducts,
          totalPages: Math.ceil(totalProducts / this.perPage),
          range: {
            from: pageFrom,
            to: pageFrom + this.perPage
          }
        }
      }
    },
    getToken (token) {
      if (window.localStorage.getItem('authUser'))
        return JSON.parse(window.localStorage.getItem('authUser')).jwtToken
      else
        return 'none'
    }
  },
  methods: {
    reserveVehicle (vehicle) {
      console.log('Objeto vehicle: ' + JSON.stringify(this.vehicle))
      axios({
        method:'post',
        url:'/vehicles/reserve',
        responseType:'json',
        data: {idPublic: vehicle.idPublic}
      })
      .then(response => {
        console.log(JSON.stringify(response.data));
        this.message = response.data.msg
      })
      .catch(e => {
        if (e.response) {
          console.log(JSON.stringify(e.response.data.msg));
          this.message = e.response.data.msg
        }
        else console.error(e);
      })
    },
    showConfirmReserve(vehicle, bool, message) {
      if (message) this.message = false
      vehicle.showConfirm = bool
      let i
      for (i = 0; i < this.vehicles.length; i++) {
        if (this.vehicles[i].matricula === vehicle.matricula)
          break
      }
      this.$set(this.vehicles,i,vehicle)
    },
    getPerPage() {
      this.perPage *= 2
      if (this.perPage > 20) this.perPage = 5
      return this.perPage
    },
    toggleValue (obj, field, e) {
      if (obj === null) return this.$set(this, field, e)
      this.$set(obj, field, e)
    },
    paginate() {
      return this.filtrarVehiculos.slice(
        this.pagination.range.from,
        this.pagination.range.to
      );
    },
    remove (matricula) {
      for (var i = 0; i < this.vehicles.length; i++) {
        if(this.vehicles[i].matricula === matricula)
          this.vehicles.splice(i, 1)
      }
    },
    getVehicles () {
      this.noStandartOutput = [{ unique: true, msg: `search vehicle -json ${JSON.stringify(this.vehicle)}`}]
      axios({
        method:'post',
        url:'/vehicles',
        responseType:'json',
        data: this.vehicle
      })
      .then(response => {
        this.showCountVehicles = true
        this.$store.commit('setVehicles', response.data.vehicles);
        this.noStandartOutput.push({ unique: true, msg: response.data.msg }, ...response.data.noStandartOutput)
      })
      .catch(e => {
        this.noStandartOutput.push({ unique: true, msg: e.response.data.msg }, ...e.response.data.noStandartOutput)
      })
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
  height: 200px;
  display: inline-block;
}
</style>
