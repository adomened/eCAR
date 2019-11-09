<template lang="html">
  <div class="content" style="margin-bottom:18px">
    <div class="row justify-content-center">
      <div class="col-12">
        <card shadow class="mb-2">
          <div class="row">
            <h2 class="col-12 font-weight-light">Busqueda de Mensajes</h2>
            <p class="col-12">Puede realizar la busqueda de los mensajes atendiendo al <i>nickname</i> adjunto al
              registro del usuario. En un primer momento, sin realizar ninguna busqueda, se le presentarán como
              maximo 35 cuestiones planteadas por clientes pendientes de reponder (ordenadas por fecha de
              realización).</p>
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

    <div class="row justify-content-center">
      <div class="col-lg-7 order-lg-1 order-3">
        <admin-list @first="showModalDelete($event)" :show="[false,false]" :per-page="5" :filter="filterRow" :payload="queries" :query="query" :menu-icons="['fa fa-trash-o']" :menu-titles="['Eliminar consulta']">
          <template slot="cabecera-img" slot-scope="customerSlot">
            <div class="icon icon-shape d-flex align-items-center bg-default rounded-circle text-white">
              <i class="fa fa-comments-o" aria-hidden="true"></i>
            </div>
          </template>
          <template slot="cabecera-a" slot-scope="customerSlot">
            @<span v-html="highlight(customerSlot.item.usuario)"></span>
          </template>
          <template slot="cabecera-b" slot-scope="customerSlot">
            <span class="mr-2" v-if="customerSlot.item.enProcesoRespuesta"><badge type="secondary">En proceso</badge></span>
            <span v-if="customerSlot.item.cerrada"><badge type="success">Resuelta</badge></span>
            <span v-else><badge type="danger">Resuelta</badge></span>
          </template>
          <template slot="cuerpo" slot-scope="customerSlot">
            <div class="row">
              <cabecera-consulta admin @interaction="newInteraction($event)" :query="customerSlot.item">
                <template slot="cuerpo-consulta" v-for="child in customerSlot.item.children">
                  <cuerpo-consulta :nickname="customerSlot.item.usuario" talk-side="admin" :child="child"></cuerpo-consulta>
                </template>
              </cabecera-consulta>
            </div>
          </template>
        </admin-list>
      </div>

      <div class="col-lg-5 order-lg-3 order-1">
        <card shadow class="mb-2">
          <div v-if="!inputOpennewQuery" class="text-center">
            <i class="fa fa-comments-o text-muted mr-2" style="font-size:6.4rem" aria-hidden="true"></i>
            <h4 class="text-muted">Centro de Mensajeria</h4>
          </div>
          <consulta-input admin @click-search="searchNickname($event)" type="default" color="white" :alternative="false" size="sm" @query="newQuery($event)" v-if="inputOpennewQuery">
            <vue-single-select slot="search-user"
              v-model="nickname"
              :options="nicknames"
              :required="true"
              placeholder="nickname">
            </vue-single-select>
          </consulta-input>
          <div class="mt-4">
            <base-button block v-show="!inputOpennewQuery" type="default" class="border-0 no-translate-y mr-0" @click.prevent="showNewQueryInput">
              <i class="fa fa-comments mr-2" aria-hidden="true"></i>
              Nueva consulta
            </base-button>
            <base-button block v-show="inputOpennewQuery" type="warning" class="border-0 no-translate-y mr-0" @click.prevent="showNewQueryInput">
              <i class="fa fa-comments mr-2" aria-hidden="true"></i>
              Cancelar
            </base-button>
          </div>
        </card>

        <card type="transparent" class="mb-2 border-0">
          <div class="row justify-content-center">
            <div class="icon icon-shape d-flex align-items-center bg-default rounded-circle text-white">
              <i class="fa fa-quote-right" aria-hidden="true"></i>
            </div>
          </div>
          <h6 class="text-center text-default mb-0 py-3">Indica en tus comunicaciones que siempre pueden optar por otras vias de comunicaion: Por ejemplo:
            Si tiene mas dudas puede contactar con nosotros a traves del numero telefonico 900 12 56 TANGO.</h6>
          <div class="row justify-content-center">
            <div class="icon icon-shape d-flex align-items-center bg-default rounded-circle text-white">
              <i class="fa fa-question" aria-hidden="true"></i>
            </div>
          </div>
          <h6 class="text-center text-default mb-0 py-3">Siempre que inicies el proceso de un
            <span class="text-primary"><i class="fa fa-comments" aria-hidden="true"></i> NUEVO MENSAJE</span> se marcará la consulta
            como en proceso de respuesta; para evitar respuestas duplicadas.</h6>
        </card>
      </div>
    </div>

    <modal :show.sync="modalDelete"
           gradient="warning"
           modal-classes="modal-warning">
        <h6 slot="header" class="modal-title" id="modal-title-notification">La consulta va a ser borrada</h6>
        <div class="py-3 text-center">
            <i class="ni ni-bell-55 ni-3x"></i>
            <h4 class="heading mt-4">Esta operación es permanente</h4>
            <p>Asegurese de estar procediendo como debe antes de continuar con el procedimiento.</p>
        </div>
        <template slot="footer">
            <base-button type="white" @click.prevent="deleteMessage($event)">Borrar consulta</base-button>
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
import ConsultaInput from './ConsultaInput'
import CuerpoConsulta from './CuerpoConsulta'
import CabeceraConsulta from './CabeceraConsulta'
import Modal from './Modal'
import VueSingleSelect from "vue-single-select"
import axios from 'axios'

export default {
  name: 'AdminMain-Messages',
  data () {
    return {
      nickname: undefined,
      nicknames: [],
      inputOpennewQuery: false,
      modalDelete: false,
      messageID: undefined,
      query: ''
    }
  },
  components: {
    VueSingleSelect,
    ConsultaInput,
    AdminList,
    Modal,
    CuerpoConsulta,
    CabeceraConsulta
  },
  created () {
    axios.defaults.headers.common['Authorization'] = this.getToken
    // Añadir consulta a mensajes con el atributo cerrrada a false. Investigar el tema de cursores, cuando el volumen de resultados en una consulta a la BBDD es extenso
    console.log('marca de peticion a /api/admin/admin-random-messages');
    axios({
      method:'get',
      url:'/api/admin/admin-random-messages',
      responseType:'json'
    })
    .then(response => {
      console.log({data: response.data});
      this.$store.commit('setQueries', response.data.result)
    })
    .catch(e => {
      console.error(e);
    })
  },
  computed: {
    getToken (token) {
      if (window.localStorage.getItem('authUser'))
        return JSON.parse(window.localStorage.getItem('authUser')).jwtToken
      else
        return 'none'
    },
    queries () {
      return this.$store.state.queries
    }
  },
  methods: {
    deleteMessage(payload){
      let id_message = this.messageID
      axios({
        method:'post',
        url:'/api/admin/delete-query',
        responseType:'json',
        data: { id: id_message }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.error(e);
      })
    },
    showModalDelete(payload) {
      this.modalDelete = true
      this.messageID = payload._id
    },
    newInteraction (payload) {
      console.log({payload});
      console.log('marca de peticion a /api/admin/admin-new-interaction');
      axios({
        method:'post',
        url:'/api/admin/admin-new-interaction',
        data: payload,
        responseType:'json'
      })
      .then(response => {
        console.log({data: response.data});
      })
      .catch(e => {
        console.error(e);
      })
    },
    newQuery (payload) {
      console.log('marca de peticion a /api/admin/admin-new-query');
      let nickname = this.nickname
      axios({
        method:'post',
        url:'/api/admin/admin-new-query',
        data: {...payload, nickname},
        responseType:'json'
      })
      .then(response => {
        console.log({data: response.data});
      })
      .catch(e => {
        console.error(e);
      })
    },
    onSearch () {
      console.log('marca de peticion a /api/admin/search-messages');
      axios({
        method:'get',
        url:'/api/admin/search-messages',
        params: {
          q: this.query
        },
        responseType:'json'
      })
      .then(response => {
        console.log({messages: response.data.messages});
        this.$store.commit('setQueries', response.data.messages)
      })
      .catch(e => {
        console.error(e);
      })
    },
    searchNickname (payload) {
      console.log('marca de peticion a /api/admin/search-nicknames');
      console.log('nickname: ' + payload);
      if (!payload) {
        return
      }
      axios({
        method:'get',
        url:'/api/admin/search-nicknames',
        params: {
          nick: payload
        },
        responseType:'json'
      })
      .then(response => {
        console.log({nicknames: response.data.nicknames});
        for (var i = 0; i < response.data.nicknames.length; i++) {
          this.nicknames[i] = response.data.nicknames[i].nickname
        }
        this.nickname = this.nicknames[0]
      })
      .catch(e => {
        console.error(e);
      })
    },
    filterRow () {
      if(!this.query) {
        return this.queries;
      }
      return this.queries.filter(query => {
        let field = query.usuario.toLowerCase()
        return field.includes(this.query.toLowerCase());
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
    showNewQueryInput () {
      return this.inputOpennewQuery = !this.inputOpennewQuery
    }
  }
}
</script>

<style>
</style>
