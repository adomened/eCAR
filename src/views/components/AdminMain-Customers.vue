<template lang="html">
  <div class="content" style="margin-bottom:18px">
    <div class="row justify-content-center">
      <div class="col-12">
        <card shadow class="mb-2">
          <div class="row">
            <h2 class="col-12 font-weight-light">Busqueda del Cliente</h2>
            <p class="col-12">Puede realizar la busqueda del cliente atendiendo a los distintos registros adjuntos a este. Estos son:
            <i>nickname</i>, <i>nombre del cliente</i>, <i>email</i>, o si esta <i>validado</i>.</p>
          </div>
          <div class="row border-top pt-3">
            <div class="col-12">
              <span>
                Buscar por
                <base-button style="background-color: white;" class="btn-no-shadow no-translate-y px-0" size="sm" type="neutral" nativeType="button" @click.prevent="toggleValue(['email','nickname','nombre'])">
                  {{field}}
                </base-button>
                <!-- Apuntar a un Endpoint diferente para las busquedas que se realizan sobre un campo de busqueda diferente -->
              </span>
              <form role="form">
                <div class="row justify-content-left text-left">
                  <!-- TODO Probar a meter aquí: Buscar por {{field}} -->
                  <div class="col-lg-12">
                    <base-input v-model="query"
                                placeholder="Nombre"
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

    <div v-if="edit" class="row justify-content-center">
      <div class="col-12">
        <card shadow class="mb-2">
          <div class="row">
            <h2 class="col-12 font-weight-light">Editar el perfil</h2>
            <p class="col-12">Editar la información del perfil del usuario</p>
          </div>
          <div class="row border-top pt-4">
            <div class="col-12 px-0">
              <informacion-perfil :payload="perfil"
                                  :alternative="false"
                                  @actulizar-perfil="updateUserData($event)"
                                  :edit="true"
                                  :standard-footer="false"
                                  :standard-header="false">
                <!-- Puede que incluya mas campos de texto aqui (SLOT)  -->
                <div slot="before" class="col-lg">
                  <base-input label="Nickname"
                              class="mb-3"
                              :lock="false"
                              v-model="perfil.nickname"
                              placeholder="Nombre"
                              addon-left-icon="fa fa-user-circle">
                  </base-input>
                </div>
                <base-button slot="button" size="lg" type="danger" nativeType="submit" class="my-2 bg-gradient-danger radius" @click.prevent="edit = false">
                  <i class="fa fa-times mr-2" aria-hidden="true"></i>
                  Cancelar
                </base-button>
              </informacion-perfil>
            </div>
          </div>
        </card>
      </div>
    </div>

    <admin-list @first="showModalValidate($event)" @second="showModalMessage($event)" @third="showModalDelete($event)"
                @edit="setPerfil($event)"
                :filter="filterRow" edit :per-page="8" :payload="customers" :query="query"
                :menu-icons="['fa fa-certificate','fa fa-comment','fa fa-trash-o']"
                :menu-titles="['Validar conductor','Enviar mensaje','Eliminar cuenta']">
      <template slot="cabecera-img" slot-scope="customerSlot">
        <img width="50" :src="customerSlot.item.image" class="rounded-circle shadow">
      </template>
      <template slot="cabecera-a" slot-scope="customerSlot">
        <span v-if="field === 'nickname'">
          @<span v-html="highlight(customerSlot.item.nickname)"></span>
        </span>
        <span v-else>@{{customerSlot.item.nickname}}</span>
      </template>
      <template slot="cabecera-b" slot-scope="customerSlot">
        <span v-if="customerSlot.item.validado"><badge type="success">validado</badge></span>
        <span v-else><badge type="danger">validado</badge></span>
      </template>
      <template slot="cabecera-c" slot-scope="customerSlot">
        <span v-if="field === 'nombre'">
          <span v-html="highlight(customerSlot.item.profile.name)"></span>,
          <span class="text-muted" v-html="highlight(customerSlot.item.profile.surname)"></span>
        </span>
        <span v-else>
          {{customerSlot.item.profile.name}}, <span class="text-muted">{{customerSlot.item.profile.surname}}</span>
        </span>
      </template>
      <template slot="cabecera-d" slot-scope="customerSlot">
        <span v-if="field === 'email'" v-html="highlight(customerSlot.item.email)"></span>
        <span v-else>{{customerSlot.item.email}}</span>
      </template>
      <template slot="cuerpo" slot-scope="customerSlot">
        <div class="row justify-content-between text-muted mb-3">
          <span class="col-6 px-0"><small>Creado</small></span>
          <span class="col-6 text-right px-0"><small>Actualizado</small></span>
          <span class="col-6 px-0"><small>{{date(customerSlot.item.createdAt)[0]}}</small></span>
          <span class="col-6 text-right px-0"><small>{{date(customerSlot.item.updatedAt)[0]}}</small></span>
        </div>
        <div class="row mb-3">
          <div class="col-12 mb-2">
            <div class="row justify-content-between">
              <span class="font-weight-bold">Carnet de conducir</span>
              <base-button size="sm" type="default" class="py-0 px-1" nativeType="button" @click.prevent="">
                Eliminar
              </base-button>
            </div>
          </div>
          <div class="col bg-secondary text-center rounded mr-2">
            <div class="row justify-content-center">
              <div class="col-11 bg-white radius my-2 px-0">Cara 1</div>
              <div class="col-12">
                <a target="_blank" :href="customerSlot.item.carnet[1]">
                  <i class="fa fa-id-card-o" aria-hidden="true"></i>
                  enlace
                </a>
              </div>
            </div>
          </div>
          <div class="col bg-secondary text-center rounded">
            <div class="row justify-content-center">
              <div class="col-11 bg-white radius my-2 px-0">Cara 2</div>
              <div class="col-12">
                <a target="_blank" :href="customerSlot.item.carnet[0]">
                  <i class="fa fa-id-card-o" aria-hidden="true"></i>
                  enlace
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <p class="col-lg-4 col-12 font-weight-bold pl-0 mb-1">Nombre y apellidos</p><p class="col-lg-8 col-12 bg-secondary radius">{{customerSlot.item.profile.name}}, {{customerSlot.item.profile.surname}}</p>
        </div>
        <div class="row">
          <p class="col-lg-4 col-12 font-weight-bold pl-0 mb-1">Correo electronico</p><p class="col-lg-8 col-12 bg-secondary radius">{{customerSlot.item.email}}</p>
        </div>
        <div class="row">
          <p class="col-lg-4 col-12 font-weight-bold pl-0 mb-1">Fecha de nacimiento</p><p class="col-lg-8 col-12 bg-secondary radius">{{date(customerSlot.item.profile.birth)[1]}}</p>
        </div>
        <div class="row">
          <p class="col-lg-4 col-12 font-weight-bold pl-0 mb-1">Domicilio</p><p class="col-lg-8 col-12 bg-secondary radius">{{customerSlot.item.profile.domicilio}}</p>
        </div>
        <div class="row">
          <p class="col-4 font-weight-bold pl-0 mb-1">Provincia</p><p class="col-8 bg-secondary radius">{{customerSlot.item.profile.provincia}}</p>
        </div>
        <div class="row">
          <p class="col-4 font-weight-bold pl-0 mb-1">Localidad</p><p class="col-8 bg-secondary radius">{{customerSlot.item.profile.localidad}}</p>
        </div>
        <div class="row">
          <p class="col-4 font-weight-bold pl-0 mb-1">CP</p><p class="col-8 bg-secondary radius">{{customerSlot.item.profile.cp}}</p>
        </div>
      </template>
    </admin-list>

    <modal :show.sync="modalDelete"
           gradient="warning"
           modal-classes="modal-warning">
        <h6 slot="header" class="modal-title" id="modal-title-notification">La cuenta va a ser borrada</h6>
        <div class="py-3 text-center">
            <i class="ni ni-bell-55 ni-3x"></i>
            <h4 class="heading mt-4">Esta operación es permanente</h4>
            <p>Asegurese de estar procediendo como debe antes de continuar con el procedimiento.</p>
        </div>
        <template slot="footer">
            <base-button type="white" @click.prevent="deleteCustomer($event)">Borrar cuenta</base-button>
            <base-button type="link"
                         text-color="white"
                         class="ml-auto"
                         @click="modalDelete = false">
                Cerrar
            </base-button>
        </template>
    </modal>

    <modal :show.sync="modalForm"
          body-classes="px-3">
        <h6 slot="header" class="modal-title" id="modal-title-notification">Envie un mensaje al usuario @{{nickname}}</h6>
        <consulta-input modal class="px-2" type="default" color="white" :alternative="false" size="sm" @query="newQuery($event, nickname)" v-if="inputOpennewQuery"></consulta-input>
        <div slot="footer" class="text-muted">
            <small><span class="font-weight-bold">IMPORTANTE: </span>No abuse de este medio de comunicacion debido a que puede no ser visto por el cliente. Puede
            indicarle que le facilite un medio secundario a utilizar para una comunicación mas eficaz.</small>
        </div>
    </modal>

    <modal :show.sync="modalValidate"
           gradient="success"
           modal-classes="modal-success">
        <h6 slot="header" class="modal-title" id="modal-title-notification">El conductor va a ser validado</h6>
        <div class="py-3 text-center">
            <i class="ni ni-bell-55 ni-3x"></i>
            <h4 class="heading mt-4">Esta operación es permanente</h4>
            <p>Asegurese de estar procediendo como debe antes de continuar con el procedimiento.</p>
        </div>
        <template slot="footer">
            <base-button type="white" @click.prevent="validate($event)">Validar</base-button>
            <base-button type="link"
                         text-color="white"
                         class="ml-auto"
                         @click="modalValidate = false">
                Cerrar
            </base-button>
        </template>
    </modal>
  </div>
</template>

<script>
import AdminList from './AdminList'
import Modal from './Modal'
import ConsultaInput from './ConsultaInput'
import InformacionPerfil from './InformacionPerfil'
import axios from 'axios'

export default {
  name: 'AdminMain-Customers',
  data () {
    return {
      query: '',
      field: 'nombre',
      index: 0,
      edit: false,
      customerID: undefined,
      modalDelete: false,
      modalForm: false,
      modalValidate: false,
      inputOpennewQuery: true,
      nickname: undefined
    }
  },
  created () {
    let current = this.$router.history.current
    if (current)
      this.query = current.query.busqueda
  },
  watch: {
    '$route'(to) {
      this.query = to.query.busqueda
    },
    query() {
      this.$router.push({
        query: Object.assign({}, this.$route.query, {
          busqueda: this.query
        })
      })
    }
  },
  components: {
    AdminList,
    Modal,
    ConsultaInput,
    InformacionPerfil
  },
  computed: {
    getToken (token) {
      if (window.localStorage.getItem('authUser'))
        return JSON.parse(window.localStorage.getItem('authUser')).jwtToken
      else
        return 'none'
    },
    customers () {
      return this.$store.state.customers
    },
    perfil () {
      return this.$store.state.perfil
    }
  },
  methods: {
    deleteCustomer(){
      let id_customer = this.customerID
      axios({
        method:'post',
        url:'/api/admin/delete-customer',
        responseType:'json',
        data: { id: id_customer }
      })
      .then(response => {
        console.log(response.data);
        this.modalDelete = false
      })
      .catch(e => {
        console.error(e);
      })
    },
    validate(){
      let id_customer = this.customerID
      axios({
        method:'post',
        url:'/api/admin/validate-customer',
        responseType:'json',
        data: { id: id_customer }
      })
      .then(response => {
        console.log(response.data);
        this.modalValidate = false
      })
      .catch(e => {
        console.error(e);
      })
    },
    newQuery(payload, nickname){
      // console.log('label: %o nickname %s', payload, nickname);
      console.log('marca de peticion a /api/admin/admin-new-query');
      axios({
        method:'post',
        url:'/api/admin/admin-new-query',
        data: {...payload, nickname},
        responseType:'json'
      })
      .then(response => {
        console.log({data: response.data});
        this.modalForm = false
      })
      .catch(e => {
        console.error(e);
      })
    },
    setPerfil (payload) {
      let o = {
        nickname: payload.nickname,
        userName: payload.profile.name,
        userSurname: payload.profile.surname,
        userGender: payload.profile.gender,
        userLocalidad: payload.profile.localidad,
        userProvincia: payload.profile.provincia,
        planta: payload.profile.planta,
        puerta: payload.profile.puerta,
        userCP: payload.profile.cp,
        userDomicilio: payload.profile.domicilio,
        userEmail: payload.email,
        userBirth: payload.profile.birth
      }
      this.$store.commit('setPerfil', o)
      this.edit = true
    },
    highlight(payload) {
      if(!this.query) {
        return payload;
      }
      return payload.replace(new RegExp(this.query, "gi"), match => {
        return '<span class="font-weight-bold text-primary">' + match + '</span>';
      });
    },
    updateUserData (payload) {
      console.log({payload});
      axios({
        method:'post',
        url:'/api/admin/update-customer',
        responseType:'json',
        data: payload
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.error(e);
      })
    },
    onSearch () {
      axios.defaults.headers.common['Authorization'] = this.getToken
      console.log('marca de peticion a /api/admin/search-customer');
      axios({
        method:'get',
        url:`/api/admin/search-customer-by${this.field}`,
        params: {
          q: this.query
        },
        responseType:'json'
      })
      .then(response => {
        this.$store.commit('setCustomers', { customers: response.data.customers, images: response.data.images})
      })
      .catch(e => {
        console.error(e);
      })
    },
    showModalValidate (payload) {
      this.modalValidate = true
      this.customerID = payload._id
    },
    showModalDelete (payload) {
      this.modalDelete = true
      this.customerID = payload._id
    },
    showModalMessage (payload) {
      this.modalForm = true
      this.nickname = payload.nickname
    },
    filterRow () {
      if(!this.query) {
        return this.customers;
      }
      switch (this.field) {
        case 'nombre':
          return this.customers.filter(customer => {
            let field = customer.profile.name.toLowerCase() + customer.profile.surname.toLowerCase()
            return field.includes(this.query.toLowerCase());
          });
        case 'nickname':
          return this.customers.filter(customer => {
            let field = customer.nickname.toLowerCase()
            return field.includes(this.query.toLowerCase());
          });
        case 'email':
          return this.customers.filter(customer => {
            let field = customer.email.toLowerCase()
            return field.includes(this.query.toLowerCase());
          });
      }
    },
    date (date) {
      date = new Date(date)
      return [date.toLocaleDateString() + ', ' + date.toLocaleTimeString(), date.toLocaleDateString()]
    },
    toggleValue(payload) {
      if (this.index > 2)
        this.index = 0
      this.field = payload[this.index++]
    }
  }
}
</script>

<style>
</style>
