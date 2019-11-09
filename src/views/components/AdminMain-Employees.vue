<template lang="html">
  <div class="content" style="margin-bottom:18px">
    <div class="row justify-content-center">
      <div class="col-12">
        <card shadow class="mb-2">
          <div class="row">
            <h2 class="col-12 font-weight-light">Busqueda de Empleados</h2>
            <p class="col-12">Puede realizar la busqueda del cliente atendiendo a los distintos registros adjuntos a este. Estos son:
            <i>nickname</i>, <i>nombre del cliente</i>, <i>email</i>, o si esta <i>validado</i>.</p>
          </div>
          <div class="row border-top pt-3">
            <div class="col-12">
              <span>
                Buscar por
                <base-button style="background-color: white;" class="btn-no-shadow no-translate-y px-0" size="sm" type="neutral" nativeType="button" @click.prevent="toggle_value(['email','nickname','nombre'])">
                  {{field}}
                </base-button>
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
            <h2 class="col-12 font-weight-light">Editar perfil</h2>
            <p class="col-12">Editar la información del perfil del empleado</p>
          </div>
          <div class="row border-top pt-4">
            <div class="col-12 px-0">
              <informacion-perfil :payload="employee"
                                  field="employee"
                                  @actulizar-perfil="updateUserData($event)"
                                  :edit="true"
                                  :alternative="false"
                                  :standard-footer="false"
                                  :standard-header="false">
                <!-- Puede que incluya mas campos de texto aqui (SLOT)  -->
                <div slot="before" class="col-lg">
                  <base-input label="Nickname"
                              class="mb-3"
                              :lock="false"
                              v-model="employee.nickname"
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

    <admin-list @first="showModalDelete($event)"
                @edit="setEmployee($event)" :filter="filterRow"
                :payload="employees" :query="query" edit
                :menu-icons="['fa fa-trash-o']"
                :menu-titles="['Eliminar usuario']">
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
        <span v-if="customerSlot.item.profile.rol_id === '7465636e69636f'"><badge type="secondary bg-secondary">tecnico</badge></span>
        <span v-else><badge type="secondary bg-secondary">Admin</badge></span>
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
        <div class="row">
          <p class="col-lg-4 col-12 font-weight-bold pl-0 mb-1">Departamento</p><p class="col-lg-8 col-12 bg-secondary radius">{{customerSlot.item.profile.department}}</p>
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

    <div class="row justify-content-center">
      <div class="col-12">
        <card shadow class="mb-2">
          <div class="row">
            <h2 class="col-12 font-weight-light">Nuevo empleado</h2>
            <p class="col-12">Añada un nuevo usuario con el rol, departamento e información relacionada al mismo</p>
          </div>
          <div class="row border-top pt-4">
            <div class="col-12 px-0">
              <form role="form">
                <div class="row justify-content-left">
                  <div class="col-lg">
                    <base-input label="Nickname"
                                class="mb-3"
                                v-model="newEmployee.userNickname"
                                placeholder="nickname_ecar"
                                addon-left-icon="fa fa-address-card">
                    </base-input>
                  </div>
                  <div class="col-lg">
                    <base-input label="Nombre"
                                class="mb-3"
                                v-model="newEmployee.userName"
                                placeholder="Nombre"
                                addon-left-icon="fa fa-address-card">
                    </base-input>
                  </div>
                  <div class="col-lg">
                    <base-input label="Apellidos"
                                class="mb-3"
                                v-model="newEmployee.userSurname"
                                placeholder="Apellidos"
                                addon-left-icon="fa fa-address-card">
                    </base-input>
                  </div>
                </div>
                <div class="row justify-content-left">
                  <div class="col-lg">
                    <base-input label="Contraseña"
                                class="mb-3"
                                type="password"
                                placeholder="Contraseña"
                                v-model.trim="newEmployee.password"
                                addon-left-icon="ni ni-lock-circle-open">
                    </base-input>
                  </div>
                  <div class="col-lg">
                    <base-input label="Departamento"
                                :select="['Informatica', 'Logistica', 'Ventas & Marketing', 'Dirección']"
                                v-on:toggle="toggleValue(newEmployee, 'department', $event)"
                                class="mb-3"
                                buttonLeft="fa fa-angle-down"
                                v-model.trim="newEmployee.department"
                                placeholder="Departamento"
                                addon-left-icon="fa fa-address-card">
                    </base-input>
                  </div>
                  <div class="col-lg">
                    <base-input label="Rol"
                                :select="['Tecnico', 'Administrador']"
                                v-on:toggle="toggleValue(newEmployee, 'rol', $event)"
                                class="mb-3"
                                buttonLeft="fa fa-angle-down"
                                v-model.trim="newEmployee.rol"
                                placeholder="Rol"
                                addon-left-icon="fa fa-address-card">
                    </base-input>
                  </div>
                </div>
                <div class="row justify-content-left text-left">
                  <div class="col-lg-3 col-md-6">
                    <base-input label="Genero"
                                :select="['Femenino', 'Masculino']"
                                v-on:toggle="toggleValue(newEmployee, 'userGender', $event)"
                                class="mb-3"
                                buttonLeft="fa fa-angle-down"
                                v-model.trim="newEmployee.userGender"
                                placeholder="Genero"
                                addon-left-icon="fa fa-venus-mars">
                    </base-input>
                  </div>
                  <div class="col-lg-3 col-md-6">
                    <base-input class="mb-3"
                                type="date"
                                label="F. de nacimiento"
                                v-model="newEmployee.userBirth"
                                addon-left-icon="fa fa-calendar">
                    </base-input>
                  </div>
                  <div class="col-lg-6 col-12">
                    <base-input label="Correo electronico"
                                class="mb-3"
                                v-model="newEmployee.userEmail"
                                placeholder="Correo electronico"
                                addon-left-icon="fa fa-envelope-open">
                    </base-input>
                  </div>
                </div>
                <div class="row justify-content-left text-left">
                  <div class="col-lg-6">
                    <base-input class="mb-3"
                                label="Domicilio"
                                v-model.trim="newEmployee.userDomicilio"
                                placeholder="Ejemplo: Calle venia, 33"
                                addon-left-icon="fa fa-map-marker">
                    </base-input>
                  </div>
                  <div class="col-lg-3 col-6">
                    <base-input class="mb-3"
                                label="Planta"
                                v-model="newEmployee.planta"
                                placeholder="Ejemplo: 3º"
                                addon-left-icon="fa fa-map-marker">
                    </base-input>
                  </div>
                  <div class="col-lg-3 col-6">
                    <base-input class="mb-3"
                                label="Puerta"
                                v-model.trim="newEmployee.puerta"
                                placeholder="Ejemplo: A"
                                addon-left-icon="fa fa-map-marker">
                    </base-input>
                  </div>
                </div>
                <div class="row justify-content-left text-left">
                  <div class="col-lg-4">
                    <base-input label="Localidad"
                                class="mb-3"
                                v-model.trim="newEmployee.userLocalidad"
                                placeholder="Ejemplo: Fines"
                                addon-left-icon="fa fa-location-arrow">
                    </base-input>
                  </div>
                  <div class="col-lg-4">
                    <base-input label="Provincia"
                                class="mb-3"
                                v-model.trim="newEmployee.userProvincia"
                                placeholder="Ejemplo: Almeria"
                                addon-left-icon="fa fa-location-arrow">
                    </base-input>
                  </div>
                  <div class="col-lg-4">
                    <base-input label="Codigo postal"
                                class="mb-3"
                                v-model.trim="newEmployee.userCP"
                                placeholder="Ejemplo: 04007"
                                addon-left-icon="fa fa-location-arrow">
                    </base-input>
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div class="col-auto">
                    <base-button size="lg" type="primary" nativeType="submit" class="my-2 bg-gradient-primary radius" @click.prevent="createNewEmployee">
                      <i class="fa fa-check mr-2" aria-hidden="true"></i>
                      guardar
                    </base-button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </card>
      </div>
    </div>

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
            <base-button type="white" @click.prevent="deleteUser($event)">Borrar usuario</base-button>
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
import InformacionPerfil from './InformacionPerfil'
import Modal from './Modal'
import axios from 'axios'

export default {
  name: 'AdminMain-Employees',
  data () {
    return {
      index: 0,
      edit: false,
      newEmployee: {},
      modalDelete: false,
      userID: undefined,
      field: 'nombre',
      query: ''
    }
  },
  created () {
    axios.defaults.headers.common['Authorization'] = this.getToken
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
    InformacionPerfil,
    Modal
  },
  computed: {
    getToken (token) {
      if (window.localStorage.getItem('authUser'))
        return JSON.parse(window.localStorage.getItem('authUser')).jwtToken
      else
        return 'none'
    },
    employees () {
      // console.log(this.$store.state.employees);
      return this.$store.state.employees
    },
    employee () {
      return this.$store.state.employee
    }
  },
  methods: {
    toggleValue (obj, field, e) {
      if (obj === null) this.$set(this, field, e)
      this.$set(obj, field, e)
    },
    setEmployee (payload) {
      console.log({payload});
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
      this.$store.commit('setEmployee', o)
      this.edit = true
    },
    createNewEmployee () {
      axios({
        method:'post',
        url:'/api/admin/new-user',
        responseType:'json',
        data: this.newEmployee
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.error(e);
      })
    },
    updateUserData (payload) {
      console.log({payload});
      axios({
        method:'post',
        url:'/api/admin/update-user',
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
      console.log('marca de peticion a /api/admin/search-employee');
      axios({
        method:'get',
        url:`/api/admin/search-employee-by${this.field}`,
        params: {
          q: this.query
        },
        responseType:'json'
      })
      .then(response => {
        this.$store.commit('setEmployees', { employees: response.data.employees, images: response.data.images})
      })
      .catch(e => {
        console.error(e);
      })
    },
    deleteUser(){
      let id_user = this.userID
      axios({
        method:'post',
        url:'/api/admin/delete-user',
        responseType:'json',
        data: { id: id_user }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.error(e);
      })
    },
    showModalDelete (payload) {
      this.modalDelete = true
      this.userID = payload._id
    },
    highlight(payload) {
      if(!this.query) {
        return payload;
      }
      return payload.replace(new RegExp(this.query, "gi"), match => {
        return '<span class="font-weight-bold text-primary">' + match + '</span>';
      });
    },
    filterRow () {
      if(!this.query) {
        return this.employees;
      }
      switch (this.field) {
        case 'nombre':
          return this.employees.filter(employee => {
            let field = employee.profile.name.toLowerCase() + employee.profile.surname.toLowerCase()
            return field.includes(this.query.toLowerCase());
          });
        case 'nickname':
          return this.employees.filter(employee => {
            let field = employee.nickname.toLowerCase()
            return field.includes(this.query.toLowerCase());
          });
        case 'email':
          return this.employees.filter(employee => {
            let field = employee.email.toLowerCase()
            return field.includes(this.query.toLowerCase());
          });
      }
    },
    date (date) {
      date = new Date(date)
      return [date.toLocaleDateString() + ', ' + date.toLocaleTimeString(), date.toLocaleDateString()]
    },
    toggle_value(payload) {
      if (this.index > 2)
        this.index = 0
      this.field = payload[this.index++]
    }
  }
}
</script>

<style>
</style>
