<template lang="html">
  <div class="content" style="margin-bottom:18px">
    <div class="row justify-content-center">
      <div class="col-12">
        <card shadow class="mb-2">
          <div class="row">
            <h2 class="col-12 font-weight-light">Busqueda de Pagos</h2>
            <p class="col-12">Puede realizar la busqueda de los pagos atendiendo al <i>nickname</i> adjunto al registro del usuario.</p>
          </div>
          <div class="row border-top pt-3">
            <div class="col-12">
              <form role="form">
                <div class="row justify-content-left text-left">
                  <div class="col-lg-12">
                    <base-input v-model="query"
                                placeholder="nickname"
                                addon-left-icon="fa fa-search">
                    </base-input>
                  </div>
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

    <admin-list @first="showModalPayment($event)" :show="[false,false]" :per-page="4" :filter="filterRow" :payload="travels" :query="query" :menu-icons="['ni ni-money-coins']" :menu-titles="['Pagar']">
      <template slot="cabecera-img" slot-scope="customerSlot">
        <div class="icon icon-shape d-flex align-items-center bg-default rounded-circle text-white ml-2">
          <i class="ni ni-money-coins" aria-hidden="true"></i>
        </div>
      </template>
      <template slot="cabecera-a" slot-scope="customerSlot">
        @<span v-html="highlight(customerSlot.item.usuario)"></span>
      </template>
      <template v-if="customerSlot.item.importe !== undefined" slot="cabecera-b" slot-scope="customerSlot">
        <div class="d-block align-items-center">
          {{customerSlot.item.importe.cuantia}} <span class="text-muted ml-1 mr-3">{{customerSlot.item.importe.moneda}}</span>
          <base-button :disabled="customerSlot.item.importe.estado" class="d-sm-inline d-none" size="sm" type="default" nativeType="submit" @click.prevent="setPayment(customerSlot.item._id)">
            Pagar
          </base-button>
        </div>
      </template>
      <template slot="cuerpo" slot-scope="customerSlot">
        <div class="row justify-content-between text-muted mb-3">
          <span class="col-6 px-0"><small>iniciado</small></span>
          <span class="col-6 text-right px-0"><small>finalizado</small></span>
          <span class="col-6 px-0"><small>{{date(customerSlot.item.fechaInicio)[0]}}</small></span>
          <span class="col-6 text-right px-0"><small>{{date(customerSlot.item.fechaFinal)[0]}}</small></span>
        </div>
        <div v-if="customerSlot.item.localizacionGeoInicio" class="row mb-3">
          <div class="col-12 mb-2">
            <div class="row justify-content-between">
              <span class="font-weight-bold">Localizacion geografica (inicio)</span>
              <base-button size="sm" type="default" class="py-0 px-1" nativeType="button" @click.prevent="">
                geocodificar
              </base-button>
            </div>
          </div>
          <div class="col bg-secondary text-center rounded mr-2">
            <div class="row justify-content-center">
              <div class="col-11 bg-white radius my-2 px-0">latitud</div>
              <p class="col-12 mb-0">{{customerSlot.item.localizacionGeoInicio.lat}}</p>
            </div>
          </div>
          <div class="col bg-secondary text-center rounded">
            <div class="row justify-content-center">
              <div class="col-11 bg-white radius my-2 px-0">longitud</div>
              <p class="col-12 mb-0">{{customerSlot.item.localizacionGeoInicio.long}}</p>
            </div>
          </div>
        </div>
        <div v-if="customerSlot.item.localizacionGeoFinal" class="row mb-3">
          <div class="col-12 mb-2">
            <div class="row justify-content-between">
              <span class="font-weight-bold">Localizacion geografica (final)</span>
              <base-button size="sm" type="default" class="py-0 px-1" nativeType="button" @click.prevent="">
                geocodificar
              </base-button>
            </div>
          </div>
          <div class="col bg-secondary text-center rounded mr-2">
            <div class="row justify-content-center">
              <div class="col-11 bg-white radius my-2 px-0">latitud</div>
              <p class="col-12 mb-0">{{customerSlot.item.localizacionGeoFinal.lat}}</p>
            </div>
          </div>
          <div class="col bg-secondary text-center rounded">
            <div class="row justify-content-center">
              <div class="col-11 bg-white radius my-2 px-0">longitud</div>
              <p class="col-12 mb-0">{{customerSlot.item.localizacionGeoFinal.long}}</p>
            </div>
          </div>
        </div>
        <div class="row">
          <p class="col-lg-4 col-12 font-weight-bold pl-0 mb-1">Distancia recorrida</p><p class="col-lg-8 col-12 bg-secondary radius">{{customerSlot.item.distanciaRecorrida}} km</p>
        </div>
        <div class="row">
          <p class="col-lg-4 col-12 font-weight-bold pl-0 mb-1">Estado</p><p class="col-lg-8 col-12 bg-secondary radius">
            <span class="text-success" v-if="customerSlot.item.importe.estado">Pagado</span>
            <span class="text-danger" v-else>No pagado</span>
          </p>
        </div>
        <div class="row">
          <p class="col-lg-4 col-12 font-weight-bold pl-0 mb-1">Viaje</p><p class="col-lg-8 col-12 bg-secondary radius">{{customerSlot.item.estado}}</p>
        </div>
        <div class="row">
          <p class="col-lg-4 col-12 font-weight-bold pl-0 mb-1">Vehiculo</p><p class="col-lg-8 col-12 bg-secondary radius">vhcl-{{customerSlot.item.vehiculo}}</p>
        </div>
      </template>
    </admin-list>

    <modal :show.sync="modalPayment"
           gradient="success"
           modal-classes="modal-success">
        <h6 slot="header" class="modal-title" id="modal-title-notification">El pago va a ser realizado</h6>
        <div class="py-3 text-center">
            <i class="ni ni-bell-55 ni-3x"></i>
            <h4 class="heading mt-4">Esta operación es permanente</h4>
            <p>Asegurese de estar procediendo como debe antes de continuar con el procedimiento.</p>
        </div>
        <template slot="footer">
            <base-button type="white" @click.prevent="setPayment(paymentID)">Pagar</base-button>
            <base-button type="link"
                         text-color="white"
                         class="ml-auto"
                         @click="modalPayment = false">
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
  name: 'AdminMain-Payments',
  data () {
    return {
      query: '',
      modalPayment: false,
      paymentID: undefined
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
    travels () {
      return this.$store.state.travels
    }
  },
  methods: {
    onSearch () {
      console.log('marca de peticion a /api/admin/search-payments');
      axios({
        method:'get',
        url:'/api/admin/search-payments',
        params: {
          q: this.query
        },
        responseType:'json'
      })
      .then(response => {
        console.log({travels: response.data.travels});
        this.$store.commit('setTravels', response.data.travels)
      })
      .catch(e => {
        console.error(e);
      })
    },
    setPayment (payload) {
      console.log('marca de peticion a /api/admin/search-payments');
      axios({
        method:'post',
        url:'/api/admin/pay-travel',
        data: { id: payload },
        responseType:'json'
      })
      .then(response => {
        console.log({data: response.data});
      })
      .catch(e => {
        console.error(e);
      })
    },
    showModalPayment(payload) {
      this.modalPayment = true
      this.paymentID = payload._id
    },
    filterRow () {
      if(!this.query) {
        return this.travels;
      }
      return this.travels.filter(travel => {
        let field = travel.usuario.toLowerCase()
        return field.includes(this.query.toLowerCase()) && travel.estado === 'finalizado';
      });
    },
    highlight(payload) {
      if(!this.query) {
        return payload;
      }
      return payload.replace(new RegExp(this.query, "gi"), match => {
        return '<span class="font-weight-bold text-primary">' + match + '</span>';
      });
    },
    date (date) {
      date = new Date(date)
      return [date.toLocaleDateString() + ', ' + date.toLocaleTimeString(), date.toLocaleDateString()]
    }
  }
}
</script>

<style lang="css" scoped>
</style>
