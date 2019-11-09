<template lang="html">
  <div class="content" style="margin-bottom:18px">
    <div class="row justify-content-center">
      <div class="col-12">
        <card shadow class="mb-2">
          <div class="row">
            <h2 class="col-12 font-weight-light">Busqueda del Vehiculo</h2>
            <p class="col-12">Puede realizar la busqueda del cliente atendiendo a los distintos registros adjuntos a este. Estos son:
            <i>nickname</i>, <i>nombre del cliente</i>, <i>email</i>, o si esta <i>validado</i>.</p>
          </div>
          <div class="row border-top pt-3">
            <div class="col-12">
              <span>
                Buscar por
                <base-button style="background-color: white;" class="btn-no-shadow no-translate-y px-0 mr-0" size="sm" type="neutral" nativeType="button" @click.prevent="toggle_Value(['localizacion','matricula','identificador', 'carga', 'marca'], 4, 'field')">
                  {{field}}
                </base-button>
                <span v-if="field === 'carga'">,
                  <base-button style="background-color: white;" class="btn-no-shadow no-translate-y px-0" size="sm" type="neutral" nativeType="button" @click.prevent="toggle_Value(['mayor', 'menor'], 1, 'carga')">
                    {{carga}}
                  </base-button>
                  a
                </span>
                <!-- Apuntar a un Endpoint diferente para las busquedas que se realizan sobre un campo de busqueda diferente -->
              </span>
              <form role="form">
                <div class="row justify-content-left text-left">
                  <div class="col-lg-12">
                    <base-input v-model="query"
                                :placeholder="field"
                                addon-left-icon="fa fa-search">
                    </base-input>
                  </div>
                  <!-- <div class="col-lg-2">
                    <base-input v-model="query"
                                placeholder="Carga"
                                addon-left-icon="fa fa-angle-left">
                    </base-input>
                  </div> -->
                </div>
                <div class="row justify-content-center">
                  <div class="col-12">
                    <base-button block size="lg" type="default" nativeType="submit" @click.prevent="onSearch">
                      <i class="fa fa-search mr-2" aria-hidden="true"></i>
                      Buscar
                    </base-button>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </card>
      </div>
    </div>

    <div v-if="edit" class="row justify-content-center">
      <div class="col-12">
        <card shadow class="mb-2">
          <div class="row">
            <h2 class="col-12 font-weight-light">Editar vehiculo</h2>
            <p class="col-12">Edita la información del vehiculo que consideres que
              es incorrecta o que debe ser rectificada para que se adecue a la realidad actual.</p>
          </div>
          <div class="row border-top pt-4">
            <div class="col-12 px-0">
              <form role="form">
                <div class="row justify-content-left">
                  <div class="col-lg-4">
                    <base-input label="Tipo"
                                :select="['Motocicleta', 'Coche', 'Furgoneta']"
                                v-on:toggle="toggleValue(vehicle, 'tipo', $event)"
                                class="mb-3"
                                buttonLeft="fa fa-angle-down"
                                v-model.trim="vehicle.tipo"
                                placeholder="Tipo"
                                addon-left-icon="fa fa-wrench">
                    </base-input>
                  </div>
                  <div class="col-lg-4">
                    <base-input label="Marca"
                                class="mb-3"
                                v-model="vehicle.marca"
                                placeholder="Ejemplo: Mercedes"
                                addon-left-icon="fa fa-car">
                    </base-input>
                  </div>
                  <div class="col-lg-4">
                    <base-input label="Modelo"
                                class="mb-3"
                                v-model="vehicle.clase"
                                placeholder="Clase (A|S|X)"
                                addon-left-icon="fa fa-car">
                    </base-input>
                  </div>
                </div>
                <div class="row justify-content-left">
                  <div class="col-lg col-md">
                    <base-input label="Localizacion"
                                class="mb-3"
                                v-model="vehicle.localizacion"
                                placeholder="Ejemplo: Almeria"
                                addon-left-icon="fa fa-building-o">
                    </base-input>
                  </div>
                  <div class="col-lg col-md">
                    <base-input label="Matricula"
                                class="mb-3"
                                v-model="vehicle.matricula"
                                placeholder="XXXX-MTR"
                                addon-left-icon="fa fa-car">
                    </base-input>
                  </div>
                  <div v-show="vehicle.tipo === 'Furgoneta'" class="col-lg">
                    <base-input label="Capacidad de carga"
                                class="mb-3"
                                v-model="vehicle.capCarga"
                                placeholder="Ejemplo: 1750 kg"
                                addon-left-icon="fa fa-truck">
                    </base-input>
                  </div>
                </div>
                <div class="row justify-content-left text-left">
                  <div class="col-lg">
                    <base-input class="mb-3"
                                label="Autonomia"
                                v-model="vehicle.autonomia"
                                placeholder="Ejemplo: 200"
                                addon-left-icon="fa fa-battery-quarter">
                    </base-input>
                  </div>
                  <div class="col-lg col-md">
                    <base-input class="mb-3"
                                label="Nº de plazas"
                                v-model="vehicle.numPlazas"
                                placeholder="Ejemplo: 5">
                    </base-input>
                  </div>
                  <div v-show="!(vehicle.tipo === 'Motocicleta')" class="col-lg col-md">
                    <base-input class="mb-3"
                                label="Nº de puertas"
                                v-model.trim="vehicle.numPuertas"
                                placeholder="Ejemplo: 5">
                    </base-input>
                  </div>
                </div>
                <div class="row justify-content-left text-center">
                  <div class="col-lg-12">
                    <span class="font-weight-bold">Descripción del vehiculo</span>
                    <textarea maxlength="450"
                              v-model="vehicle.description"
                              class="form-control mb-3"
                              rows="3"
                              placeholder="Escriba aqui el contenido de la descripción del vehiculo">
                    </textarea>
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div class="col-auto">
                    <base-button size="lg" type="primary" nativeType="submit" class="my-2 bg-gradient-primary radius" @click.prevent="updateVehicleData">
                      <i class="fa fa-check mr-2" aria-hidden="true"></i>
                      cambiar
                    </base-button>
                    <base-button type="default" nativeType="submit" class="my-2 bg-gradient-default radius" @click.prevent="">
                      <i class="fa fa-crosshairs mr-2" aria-hidden="true"></i>
                      geolocalizar
                    </base-button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </card>
      </div>
    </div>

    <admin-list @edit="setVehicle($event)"
                @first="showModalState($event)" @second="showModalIncidence($event)" @third="showModalDelete($event)"
                :per-page="10" :filter="filterRow" edit :payload="vehicles"
                :query="query" :menu-icons="['fa fa-handshake-o','fa fa-flag','fa fa-trash-o']"
                :menu-titles="['Alquilar','Abrir incidencia','Eliminar vehiculo']">
      <template slot="cabecera-img" slot-scope="customerSlot">
        <div class="d-flex align-items-center rounded-circle shadow box-50"><img width="50" :src="image" class=""></div>
      </template>
      <template slot="cabecera-a" slot-scope="customerSlot">
        <span v-if="field === 'marca'">
          <span v-html="highlight(customerSlot.item.marca)"></span>
        </span>
        <span v-else>{{customerSlot.item.marca}}</span>
      </template>
      <template slot="cabecera-b" slot-scope="customerSlot">
        <badge v-if="customerSlot.item.disponible" type="success">Disponible</badge>
        <badge v-else-if="customerSlot.item.reserva" type="warning">Reservado</badge>
        <badge v-else type="danger">disponible</badge>
      </template>
      <template slot="cabecera-c" slot-scope="customerSlot">
        {{customerSlot.item.tipo}} <span class="text-muted">{{customerSlot.item.clase}}</span>
      </template>
      <template slot="cabecera-d" slot-scope="customerSlot">
        {{customerSlot.item.modificadoPor}}
      </template>
      <template slot="cuerpo" slot-scope="customerSlot">
        <div class="row justify-content-between text-muted mb-3">
          <span class="col-6 px-0"><small>Creado</small></span>
          <span class="col-6 text-right px-0"><small>Actualizado</small></span>
          <span class="col-6 px-0"><small>{{date(customerSlot.item.createdAt)[0]}}</small></span>
          <span class="col-6 text-right px-0"><small>{{date(customerSlot.item.updatedAt)[0]}}</small></span>
        </div>
        <div v-if="customerSlot.item.lat" class="row mb-3">
          <div class="col-12 mb-2">
            <div class="row justify-content-between">
              <span class="font-weight-bold">Localización geografica</span>
              <base-button size="sm" type="default" class="py-0 px-1" nativeType="button" @click.prevent="">
                geocodificar
              </base-button>
            </div>
          </div>
          <div class="col bg-secondary text-center rounded mr-2">
            <div class="row justify-content-center">
              <div class="col-11 bg-white radius my-2 px-0">latitud</div>
              <p class="col-12 mb-0">{{customerSlot.item.lat}}</p>
            </div>
          </div>
          <div class="col bg-secondary text-center rounded">
            <div class="row justify-content-center">
              <div class="col-11 bg-white radius my-2 px-0">longitud</div>
              <p class="col-12 mb-0">{{customerSlot.item.long}}</p>
            </div>
          </div>
          <!-- <span class="col-auto pl-0">longitud <p class="mb-0">{{customerSlot.item.long}}</p></span> -->
        </div>
        <div class="row">
          <p class="col-lg-4 col-12 font-weight-bold pl-0 mb-1">Localización</p><p class="col-lg-8 col-12 bg-secondary radius">{{customerSlot.item.localizacion}}</p>
        </div>
        <div class="row">
          <p class="col-lg-4 col-12 font-weight-bold pl-0 mb-1">Modificado por</p><p class="col-lg-8 col-12 bg-secondary radius">{{customerSlot.item.modificadoPor}}</p>
        </div>
        <div class="row">
          <p class="col-lg-4 col-12 font-weight-bold pl-0 mb-1">Identicador publico</p><p class="col-lg-8 col-12 bg-secondary radius">vhcl-{{customerSlot.item.idPublic}}</p>
        </div>
        <div class="row">
          <p class="col-lg-4 col-12 font-weight-bold pl-0 mb-1">Clase</p><p class="col-lg-8 col-12 bg-secondary radius">{{customerSlot.item.clase}}</p>
        </div>
        <div class="row">
          <p class="col-lg-4 col-12 font-weight-bold pl-0 mb-1">Marca</p><p class="col-lg-8 col-12 bg-secondary radius">{{customerSlot.item.marca}}</p>
        </div>
        <div class="row">
          <p class="col-lg-4 col-12 font-weight-bold pl-0 mb-1">Descripción</p><p class="col-lg-8 col-12 bg-secondary radius p-3">{{customerSlot.item.description}}</p>
        </div>
        <div class="row" v-if="customerSlot.item.incidence">
          <p class="col-lg-4 col-12 font-weight-bold pl-0 mb-1">Incidencia</p>
          <div class="col-lg-8 col-12">
            <div class="row">
              <div class="text-right col-12 px-0">
                <base-button size="sm" type="default" class="mb-2" nativeType="button" @click.prevent="closeIncidence(customerSlot.item._id)">
                  Cerrar incidencia
                </base-button>
              </div>
              <p class="col-12 bg-secondary radius p-3">
                {{customerSlot.item.incidence}}
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <p class="col-4 font-weight-bold pl-0 mb-1">Matricula</p><p class="col-8 bg-secondary radius">{{customerSlot.item.matricula}}</p>
        </div>
        <div class="row">
          <p class="col-4 font-weight-bold pl-0 mb-1">Autonomia</p><p class="col-8 bg-secondary radius">{{customerSlot.item.autonomia}} km</p>
        </div>
        <div class="row">
          <p class="col-4 font-weight-bold pl-0 mb-1">Nº plazas</p><p class="col-8 bg-secondary radius">{{customerSlot.item.numPlazas}}</p>
        </div>
        <div class="row" v-if="customerSlot.item.numPuertas">
          <p class="col-4 font-weight-bold pl-0 mb-1">Nº puertas</p><p class="col-8 bg-secondary radius">{{customerSlot.item.numPuertas}}</p>
        </div>
        <div class="row" v-if="customerSlot.item.capCarga">
          <p class="col-4 text-truncate font-weight-bold pl-0 mb-1">Capacidad de carga</p><p class="col-8 bg-secondary radius">{{customerSlot.item.capCarga}} Kg</p>
        </div>
        <div class="row" v-if="customerSlot.item.reservadoPor">
          <p class="col-4 font-weight-bold pl-0 mb-1">Reservado por</p><p class="col-8 bg-secondary radius">{{customerSlot.item.reservadoPor}}</p>
        </div>
        <div class="row" v-if="customerSlot.item.enUsoPor">
          <p class="col-4 font-weight-bold pl-0 mb-1">En uso por</p>
          <div class="col-8">
            <div class="row">
              <div class="text-right col-12 px-0">
                <base-button size="sm" type="default" class="mb-2" nativeType="button" @click.prevent="changeStateVehicle(customerSlot.item._id, 'available')">
                  disponible
                </base-button>
              </div>
              <p class="col-12 bg-secondary radius px-3">
                {{customerSlot.item.enUsoPor}}
              </p>
            </div>
          </div>
        </div>
      </template>
    </admin-list>

    <div class="row justify-content-center">
      <div class="col-12">
        <card shadow class="mb-2">
          <div class="row">
            <h2 class="col-12 font-weight-light">Añadir nuevo vehiculo</h2>
            <p class="col-12">Añada la información perteciente del vehiculo a la BBDD. Tu correo electronico
              será ligado al registro al crearlo o al modificarlo.</p>
          </div>
          <div class="row border-top pt-4">
            <div class="col-12 px-0">
              <form role="form">
                <div class="row justify-content-left">
                  <div class="col-lg-4">
                    <base-input label="Tipo"
                                :select="['Motocicleta', 'Coche', 'Furgoneta']"
                                v-on:toggle="toggleValue(newVehicle, 'tipo', $event)"
                                class="mb-3"
                                buttonLeft="fa fa-angle-down"
                                v-model.trim="newVehicle.tipo"
                                placeholder="Tipo"
                                addon-left-icon="fa fa-wrench">
                    </base-input>
                  </div>
                  <div class="col-lg-4">
                    <base-input label="Marca"
                                class="mb-3"
                                v-model="newVehicle.marca"
                                placeholder="Ejemplo: Mercedes"
                                addon-left-icon="fa fa-car">
                    </base-input>
                  </div>
                  <div class="col-lg-4">
                    <base-input label="Modelo"
                                class="mb-3"
                                v-model="newVehicle.clase"
                                placeholder="Clase (A|S|X)"
                                addon-left-icon="fa fa-car">
                    </base-input>
                  </div>
                </div>
                <div class="row justify-content-left">
                  <div class="col-lg col-md">
                    <base-input label="Localizacion"
                                class="mb-3"
                                v-model="newVehicle.localizacion"
                                placeholder="Ejemplo: Almeria"
                                addon-left-icon="fa fa-building-o">
                    </base-input>
                  </div>
                  <div class="col-lg col-md">
                    <base-input label="Matricula"
                                class="mb-3"
                                v-model="newVehicle.matricula"
                                placeholder="XXXX-MTR"
                                addon-left-icon="fa fa-car">
                    </base-input>
                  </div>
                  <div v-show="newVehicle.tipo === 'Furgoneta'" class="col-lg">
                    <base-input label="Capacidad de carga"
                                class="mb-3"
                                v-model="newVehicle.capCarga"
                                placeholder="Ejemplo: 1750 kg"
                                addon-left-icon="fa fa-truck">
                    </base-input>
                  </div>
                </div>
                <div class="row justify-content-left text-left">
                  <div class="col-lg">
                    <base-input class="mb-3"
                                label="Autonomia"
                                v-model="newVehicle.autonomia"
                                placeholder="Ejemplo: 200 (km)"
                                addon-left-icon="fa fa-battery-quarter">
                    </base-input>
                  </div>
                  <div class="col-lg col-md">
                    <base-input class="mb-3"
                                label="Nº de plazas"
                                v-model="newVehicle.numPlazas"
                                placeholder="Ejemplo: 5">
                    </base-input>
                  </div>
                  <div v-show="!(newVehicle.tipo === 'Motocicleta')" class="col-lg col-md">
                    <base-input class="mb-3"
                                label="Nº de puertas"
                                v-model.trim="newVehicle.numPuertas"
                                placeholder="Ejemplo: 5">
                    </base-input>
                  </div>
                </div>
                <div class="row justify-content-left text-center">
                  <div class="col-lg-12">
                    <span class="font-weight-bold">Descripción del vehiculo</span>
                    <textarea maxlength="450"
                              v-model="newVehicle.descripcion"
                              class="form-control mb-3"
                              rows="3"
                              placeholder="Escriba aqui el contenido de la descripción del vehiculo">
                    </textarea>
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div class="col-auto">
                    <base-button size="lg" type="primary" nativeType="submit" class="my-2 bg-gradient-primary radius" @click.prevent="createNewVehicle">
                      <i class="fa fa-check mr-2" aria-hidden="true"></i>
                      guardar
                    </base-button>
                    <base-button type="default" nativeType="submit" class="my-2 bg-gradient-default radius" @click.prevent="">
                      <i class="fa fa-crosshairs mr-2" aria-hidden="true"></i>
                      geolocalizar
                    </base-button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </card>
      </div>
    </div>

    <modal :show.sync="modalState"
           gradient="success"
           modal-classes="modal-success">
        <h6 slot="header" class="modal-title" id="modal-title-notification">El vehiculo va a ser alquilado</h6>
        <div class="py-3 text-center">
            <i class="ni ni-bell-55 ni-3x"></i>
            <h4 class="heading mt-4">Esta operación es permanente</h4>
            <p>Asegurese de estar procediendo como debe antes de continuar con el procedimiento.</p>
        </div>
        <template slot="footer">
            <base-button type="white" @click.prevent="changeStateVehicle(vehicleID, 'rented')">Alquilar</base-button>
            <base-button type="link"
                         text-color="white"
                         class="ml-auto"
                         @click="modalState = false">
                Cerrar
            </base-button>
        </template>
    </modal>

    <modal :show.sync="modalFormIncidence"
          body-classes="px-3">
        <h6 slot="header" class="modal-title" id="modal-title-notification">Abrir una incidencia para el vehiculo</h6>
        <form class="px-2">
          <textarea maxlength="500" v-model="incidence" class="form-control" rows="4" placeholder="Escriba aqui el contenido de la incidencia"></textarea>
          <div class="pb-2">
            <small>{{incidence.length}}/500</small>
          </div>
          <base-button size="lg" type="default" class="no-translate-y mr-0" @click.prevent="openIncidence(vehicleID)">
            Abrir incidencia
          </base-button>
        </form>
        <div slot="footer" class="text-muted">
            <small><span class="font-weight-bold">IMPORTANTE: </span>El vehiculo pasará a no estar disponible para
              su uso hasta que sea cambiado su estado.</small>
        </div>
    </modal>

    <modal :show.sync="modalDelete"
           gradient="warning"
           modal-classes="modal-warning modal-dialog-centered">
        <h6 slot="header" class="modal-title" id="modal-title-notification">El vehiculo va a ser eliminado</h6>

        <div class="py-3 text-center">
            <i class="ni ni-bell-55 ni-3x"></i>
            <h4 class="heading mt-4">Esta operación es permanente</h4>
            <p>Asegurese de estar procediendo como debe antes de continuar con el procedimiento.</p>
        </div>

        <template slot="footer">
            <base-button type="white" @click.prevent="deleteVehicle(vehicleID)">Borrar vehiculo</base-button>
            <base-button type="link"
                         text-color="white"
                         class="ml-auto"
                         @click="modalDelete = false">
                Cerrar
            </base-button>
        </template>
    </modal>
  </div>
</template>

<script>
import AdminList from './AdminList'
import Modal from './Modal'
import axios from 'axios'

export default {
  name: 'AdminMain-Vehicles',
  data () {
    return {
      carga: 'menor',
      index: 0,
      edit: false,
      modalDelete: false,
      modalFormIncidence: false,
      modalState: false,
      vehicleID: undefined,
      incidence: '',
      vehicle: {},
      newVehicle: {},
      field: 'marca',
      query: '',
      image: "/img/vehicles/mercedes-benz-190-sl-3350197_960_720.png"
    }
  },
  components: {
    AdminList,
    Modal
  },
  created () {
    axios.defaults.headers.common['Authorization'] = this.getToken
  },
  computed: {
    getToken (token) {
      if (window.localStorage.getItem('authUser'))
        return JSON.parse(window.localStorage.getItem('authUser')).jwtToken
      else
        return 'none'
    },
    vehicles () {
      return this.$store.state.vehicles
    }
  },
  methods: {
    onSearch () {
      console.log('marca de peticion a /api/admin/search-vehicles');
      axios({
        method:'get',
        url:`/api/admin/search-vehicles-by${this.field}`,
        params: {
          q: this.query,
          c: (this.field === 'carga') ? this.carga : undefined
        },
        responseType:'json'
      })
      .then(response => {
        this.$store.commit('setVehicles', response.data.vehicles)
      })
      .catch(e => {
        console.error(e);
      })
    },
    updateVehicleData () {
      console.log({new_vehicle: this.vehicle});
      axios({
        method:'post',
        url:'/api/admin/update-vehicle',
        responseType:'json',
        data: this.vehicle
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.error(e);
      })
    },
    createNewVehicle () {
      console.log({new_vehicle: this.newVehicle});
      axios({
        method:'post',
        url:'/api/admin/new-vehicle',
        responseType:'json',
        data: this.newVehicle
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.error(e);
      })
    },
    deleteVehicle(payload){
      axios({
        method:'post',
        url:'/api/admin/delete-vehicle',
        responseType:'json',
        data: { id: payload }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.error(e);
      })
    },
    changeStateVehicle(payload, state) {
      axios({
        method:'post',
        url:`/api/admin/change-${state}`,
        responseType:'json',
        data: { id: payload }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.error(e);
      })
    },
    openIncidence(payload) {
      let incidence = this.incidence
      axios({
        method:'post',
        url:'/api/admin/open-incidence',
        responseType:'json',
        data: { id: payload, incidence: incidence }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.error(e);
      })
    },
    closeIncidence(payload) {
      axios({
        method:'post',
        url:'/api/admin/close-incidence',
        responseType:'json',
        data: { id: payload }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.error(e);
      })
    },
    highlight(payload) {
      if(!this.query) {
        return payload;
      }
      return payload.replace(new RegExp(this.query, "gi"), match => {
        return '<span class="font-weight-bold text-primary">' + match + '</span>';
      });
    },
    setVehicle (payload) {
      console.log({payload});
      this.vehicle = payload
      this.edit = true
    },
    showModalDelete (payload) {
      console.log({payload});
      this.modalDelete = true
      this.vehicleID = payload._id
    },
    showModalState(payload){
      this.modalState = true
      this.vehicleID = payload._id
    },
    showModalIncidence(payload){
      this.modalFormIncidence = true
      this.vehicleID = payload._id
    },
    toggleValue (obj, field, e) {
      if (obj === null) this.$set(this, field, e)
      this.$set(obj, field, e)
    },
    filterRow () {
      if(!this.query) {
        return this.vehicles;
      }
      switch (this.field) {
        case 'localizacion':
          return this.vehicles.filter(vehicle => {
            let field = vehicle.localizacion.toLowerCase()
            return field.includes(this.query.toLowerCase());
          });
        case 'matricula':
          return this.vehicles.filter(vehicle => {
            let field = vehicle.matricula.toLowerCase()
            return field.includes(this.query.toLowerCase());
          });
        case 'identificador':
          return this.vehicles.filter(vehicle => {
            let field = vehicle.idPublic.toLowerCase()
            return field.includes(this.query.toLowerCase());
          });
        case 'marca':
          return this.vehicles.filter(vehicle => {
            let field = vehicle.marca.toLowerCase()
            return field.includes(this.query.toLowerCase());
          });
        default: return this.vehicles;
      }
    },
    date (date) {
      date = new Date(date)
      return [date.toLocaleDateString() + ', ' + date.toLocaleTimeString(), date.toLocaleDateString()]
    },
    toggle_Value(payload, n, field) {
      if (this.index > n)
        this.index = 0
      this[field] = payload[this.index++]
    }
  }
}
</script>

<style lang="css" scoped>
.box-50{
  width: 50px;
  height: 50px;
}
</style>
