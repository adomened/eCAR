<template lang="html">
  <div class="ecar-admin" :class="{'nav-open': open}">
    <admin-aside :label="label" @push-button="switchPage($event)" :open="open"></admin-aside>
    <div class="main-panel" :class="{lock:open}">
      <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top py-0 pr-0">
        <div class="container-fluid px-0">
          <div class="row align-items-center justify-content-between w-100">
            <div class="col-auto d-inline-flex align-items-center navbar-wrapper mt-3">
              <div class="d-inline-flex navbar-toggle" :class="{toggled:open}">
                <button type="button" v-on:click="openMenu" class="navbar-toggler">
                  <span class="navbar-toggler-bar bar1"></span>
                  <span class="navbar-toggler-bar bar2"></span>
                  <span class="navbar-toggler-bar bar3"></span>
                </button>
              </div>
              <a class="navbar-brand" href="">{{ label }}</a>
            </div>

            <div class="col-auto px-0">
              <base-button type="warning" size="sm" class="col-auto bg-transparent btn-no-shadow no-translate-y border-white mt-3" @click.stop="logout">
                <span class="d-flex align-items-center">
                  <i class="fa fa-sign-out pr-2" aria-hidden="true"></i>
                  Salir
                </span>
              </base-button>
            </div>
          </div>
        </div>
      </nav>

      <div class="panel-header" :class="{'panel-header-sm': label !== 'DASHBOARD'}">
        <div class="container" v-if="label === 'DASHBOARD'">
          <div class="row">
            <div class="col-12 text-right pr-0">
              <base-dropdown>
                <base-button icon="ni ni-sound-wave" size="sm" slot="title" class="dropdown-toggle btn-no-shadow no-translate-y bg-transparent border-0">
                  {{year}}
                </base-button>
                <base-button @click.prevent="getDataCollection(0, '2017')" type="secondary" class="d-flex align-items-center dropdown-item btn-no-shadow no-translate-y border-0 rounded-0">
                  2017
                </base-button>
                <base-button @click.prevent="getDataCollection(1, '2018')" type="secondary" class="d-flex align-items-center dropdown-item btn-no-shadow no-translate-y border-0 rounded-0">
                  2018
                </base-button>
                <base-button @click.prevent="getDataCollection(2, '2019')" type="secondary" class="d-flex align-items-center dropdown-item btn-no-shadow no-translate-y border-0 rounded-0">
                  2019
                </base-button>
              </base-dropdown>
            </div>
            <div class="col-12 text-secondary px-0">
              <user-chart ref="lineChart" height="180" :chart-data="datacollection" :options="options"></user-chart>
            </div>
          </div>
        </div>

      </div>

      <template v-if="label === 'DASHBOARD'">
        <admin-dashboard @load-data="getDataCollection(0, '2017')"></admin-dashboard>
      </template>

      <template v-if="label === 'PERFIL'">
        <admin-profile></admin-profile>
      </template>

      <template v-if="label === 'CLIENTES'">
        <admin-customers></admin-customers>
      </template>

      <template v-if="label === 'EMPLEADOS'">
        <admin-employees></admin-employees>
      </template>

      <template v-if="label === 'VEHICULOS'">
        <admin-vehicles></admin-vehicles>
      </template>

      <template v-if="label === 'MENSAJES'">
        <admin-messages></admin-messages>
      </template>

      <template v-if="label === 'PAGOS'">
        <admin-payments></admin-payments>
      </template>

      <div id="footer" class="container-fluid">
        <div class="row">
          <div style="min-height:105px;" class="col-12 text-right">
            <span style="color: #172b4d"><small>eCAR <i class="fa fa-heart" aria-hidden="true"></i> es un proyecto personal</small></span>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import axios from 'axios'
import AdminAside from './AdminAside'
import AdminDashboard from './components/AdminMain-Dashboard'
import AdminProfile from './components/AdminMain-Profile'
import AdminCustomers from './components/AdminMain-Customers'
import AdminEmployees from './components/AdminMain-Employees'
import AdminVehicles from './components/AdminMain-Vehicles'
import AdminMessages from './components/AdminMain-Messages'
import AdminPayments from './components/AdminMain-Payments'
import UserChart from './components/JavascriptComponents/User-LineChart.js'

export default {
  name: 'mainAdmin',
  data () {
    return {
      datacollection: undefined,
      year: '2017',
      open: false,
      label: "DASHBOARD",
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // title: {
        //     fontColor: 'white',
        //     fontFamily: "'Roboto','Helvetica Neue','Arial','sans-serif'",
        //     fontSize: 22,
        //     display: true,
        //     fontStyle: '200',
        //     text: 'Usuarios registrados en la web app'
        // },
        scales: {
          yAxes: [{
            ticks: {
                fontColor: 'white'
            },
            gridLines: {
              color: '#27517f',
              zeroLineColor: '#27517f',
              zeroLineWidth: 1
            }
          }],
          xAxes: [{
            ticks: {
              color: '#ffffff',
              fontColor: 'white',
            },
            gridLines: {
              color: '#27517f'
            }
          }]
        },
        legend: {
          labels: {
              fontColor: 'white'
            }
        }
      },
    }
  },
  watch: {
    '$route'(to) {
      if (to.name)
        this.showTab('dashboard')
      else
        this.showTab(to.params.tab)
    }
  },
  components: {
    AdminAside,
    AdminDashboard,
    AdminProfile,
    AdminCustomers,
    AdminEmployees,
    AdminVehicles,
    AdminMessages,
    AdminPayments,
    UserChart
  },
  created() {
    if (this.tab)
      this.showTab(this.tab)
    axios.defaults.headers.common['Authorization'] = this.getToken
    console.log('marca de peticion a /api/admin/admin-get-perfil');
    axios({
      method:'get',
      url:'/api/admin/admin-get-perfil',
      responseType:'json'
    })
    .then(response => {
      console.log({data: response.data});
      this.$store.commit('setPerfil', response.data.perfil)
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
    generalStats(){
      return this.$store.state.generalStats
    }
  },
  props: {
    tab: String
  },
  methods: {
    getDataCollection(index, year){
      this.year = year
      let gradient = this.$refs.lineChart.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 750)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0)');

      this.datacollection = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
        'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
          {
            label: 'Usuarios activos',
            backgroundColor: gradient,
            borderColor: 'rgba(255, 255, 255, 0.7)',
            borderWidth: 1,
            data: this.generalStats.activo_usuarios[index]
          },
          {
            label: 'Baja de usuarios',
            backgroundColor: 'transparent',
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 1,
            data: this.generalStats.baja_usuarios[index]
          },
          {
            label: 'Usuarios validados',
            backgroundColor: 'transparent',
            borderColor: 'rgba(45, 206, 137, 1)',
            borderWidth: 1,
            data: this.generalStats.validado_usuarios[index]
          }
        ]
      }
    },
    logout () {
      this.logged = false
      this.$store.commit('setPerfil', {})
      this.$store.commit('setQueries', [])
      this.$store.commit('setTravels', [])
      localStorage.removeItem('authUser')
      this.$router.push({
        name: 'inicio-sesion'
      })
    },
    showTab (payload) {
      this.label = payload.toUpperCase()
    },
    switchPage (event) {
      // console.log('contenido en el evento: ' + event)
      this.label = event
      if (this.open)
        this.openMenu()
    },
    openMenu () {
      this.open = !this.open
    }
  }
}
</script>

<style lang="css">

</style>
