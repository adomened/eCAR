<template lang="html">
  <div class="content" style="margin-bottom:18px">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-12 px-1 mb-2">
        <card shadow style="min-height:200px">
          <div class="row border-bottom mb-2">
            <div class="col">
              <h4>Alta de usuarios</h4>
              <p>representa el numero exacto de usuarios en base al momento en cual se crea el registro del mismo</p>
            </div>
            <div class="col-auto">
              <base-button icon-only icon="fa fa-refresh" outline type="default" @click="updateAltaUsuarios"></base-button>
            </div>
          </div>
          <line-chart ref="lineChart" :chart-data="datacollection" :options="options"></line-chart>
        </card>
      </div>
      <div class="col-lg-4 col-12 px-1 mb-2">
        <card shadow style="min-height:200px">
          <div class="row border-bottom mb-2">
            <div class="col">
              <h4>Vehiculos por clase</h4>
              <p>representa el numero exacto de vehiculos en base a su clase</p>
            </div>
          </div>
          <bar-chart ref="barChart" :chart-data="datacollectionBar" :options="options"></bar-chart>
          <!-- <base-button block class="mt-2" @click="fillDataBar()">Randomize</base-button> -->
        </card>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-4 col-12 px-1 mb-2">
        <card shadow style="min-height:200px">
          <div class="row border-bottom mb-2">
            <div class="col">
              <h4>Vehiculos por su estado</h4>
              <p>representa el numero exacto de vehiculos en base a su estado</p>
            </div>
          </div>
          <doughnut-chart ref="DoughnutChart" :chart-data="datacollectionDoughnut" :options="options"></doughnut-chart>
        </card>
      </div>
      <div class="col-lg-8 col-12 px-1 mb-2">
        <card shadow style="min-height:200px">
          <div class="row border-bottom mb-2">
            <div class="col">
              <h4>Ingresos anuales</h4>
              <p>representa los ingresos totales exactos por los vehiculos en base a su uso</p>
            </div>
            <div class="col-auto">
              <base-button icon-only icon="fa fa-refresh" outline type="default" @click="updateIngresos"></base-button>
            </div>
          </div>
          <div v-for="ingresos in ingresosAnuales" class="row">
            <div class="col-12">
              <small class="text-muted">{{ingresos.year}}</small>
            </div>
            <div class="col text-center">
              <h1 class="text-primary">{{ingresos.travels}}</h1>
              <p><small class="text-muted">Viajes</small></p>
            </div>
            <div class="col text-center">
              <h1 class="text-primary">{{toFormat(ingresos.total)}}</h1>
              <p><small class="text-muted">Ingresos</small></p>
            </div>
            <div class="col text-center">
              <h1 class="text-primary">{{toFormat(ingresos.kilometres)}}</h1>
              <p><small class="text-muted">Kilometros</small></p>
            </div>
          </div>
        </card>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-6 col-12 px-1 mb-2">
        <card shadow style="min-height:200px">
          <div class="row border-bottom mb-2">
            <div class="col">
              <h4>Proporción de alquiler por clase</h4>
              <p>representa la proporción en concreto dentro de los alquileres realizados que le corresponde a cada clse de vehiculo (2017)</p>
            </div>
            <div class="col-auto">
              <base-button icon-only icon="fa fa-refresh" outline type="default" @click="update('tendencia-clase-2017')"></base-button>
            </div>
          </div>
          <doughnut-chart ref="DoughnutChart" :chart-data="datacollection_tendencia2017" :options="options"></doughnut-chart>
        </card>
      </div>
      <div class="col-lg-6 col-12 px-1 mb-2">
        <card shadow style="min-height:200px">
          <div class="row border-bottom mb-2">
            <div class="col">
              <h4>Proporción de alquiler por clase</h4>
              <p>representa la proporción en concreto dentro de los alquileres realizados que le corresponde a cada clse de vehiculo (2018)</p>
            </div>
            <div class="col-auto">
              <base-button icon-only icon="fa fa-refresh" outline type="default" @click="update('tendencia-clase-2018')"></base-button>
            </div>
          </div>
          <doughnut-chart ref="DoughnutChart" :chart-data="datacollection_tendencia2018" :options="options"></doughnut-chart>
        </card>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-6 col-12 px-1 mb-2">
        <card shadow style="min-height:200px">
          <div class="row border-bottom mb-2">
            <div class="col">
              <h4>Mejor tasa de alquiler</h4>
              <p>representa las 3 mejores tasas de alquiler en el correpodiente mes (2017) para las clases de vehiculos A, S, X repectivamente</p>
            </div>
            <div class="col-auto">
              <base-button icon-only icon="fa fa-refresh" outline type="default" @click="update('tasa-alquiler-2017')"></base-button>
            </div>
          </div>
          <bar-chart ref="barChart" :chart-data="datacollection_tasa2017" :options="options"></bar-chart>
          <p class="mb-0">
            <small class="text-muted"><strong>Tasa como coeficiente</strong>, relación entre la cantidad y la frecuencia de un fenómeno
              o un grupo de fenómenos</small>
          </p>
        </card>
      </div>
      <div class="col-lg-6 col-12 px-1 mb-2">
        <card shadow style="min-height:200px">
          <div class="row border-bottom mb-2">
            <div class="col">
              <h4>Mejor tasa de alquiler</h4>
              <p>representa las 3 mejores tasas de alquiler en el correpodiente mes (2018) para las clases de vehiculos A, S, X repectivamente</p>
            </div>
            <div class="col-auto">
              <base-button icon-only icon="fa fa-refresh" outline type="default" @click="update('tasa-alquiler-2018')"></base-button>
            </div>
          </div>
          <bar-chart ref="barChart" :chart-data="datacollection_tasa2018" :options="options"></bar-chart>
        </card>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12 px-1 mb-2">
        <card shadow style="min-height:200px">
          <div class="row border-bottom mb-2">
            <div class="col">
              <h4>Medias y desviaciones</h4>
              <p>se indican las medias y desviaciones de las mismas para usuarios y vehiculos</p>
            </div>
          </div>
          <div v-for="md in mediasDesviaciones" class="row">
            <div class="col-12">
              <small class="text-muted">{{md.label}}</small>
            </div>
            <div class="col text-center">
              <h1 class="text-primary">{{toFormat(md.payload[0])}}</h1>
              <p><small class="text-muted">2017</small></p>
            </div>
            <div class="col text-center">
              <h1 class="text-primary">{{toFormat(md.payload[1])}}</h1>
              <p><small class="text-muted">2018</small></p>
            </div>
            <div class="col text-center">
              <h1 class="text-primary">{{toFormat(md.payload[2])}}</h1>
              <p><small class="text-muted">2019</small></p>
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import LineChart from './JavascriptComponents/LineChart.js'
import BarChart from './JavascriptComponents/BarChart.js'
import DoughnutChart from './JavascriptComponents/DoughnutChart.js'

export default {
  name: 'AdminMain-Dashboard',
  data () {
    return {
      altaUsuarios2018: [0,0,0,0,0,0,0,0,0,0,0,0],
      altaUsuarios2019: [0,0,0,0,0,0,0,0,0,0,0,0],
      mediasDesviaciones: undefined,
      datacollection: undefined,
      numeroVehiculos: [0,0,0],
      ingresosAnuales: undefined,
      numeroVehiculosClase: [0,0,0],
      datacollectionBar: undefined,
      datacollectionDoughnut: undefined,
      datacollection_tendencia2017: undefined,
      datacollection_tendencia2018: undefined,
      datacollection_tasa2017: undefined,
      datacollection_tasa2018: undefined,
      options: { responsive: true, maintainAspectRatio: false }
    }
  },
  created () {
    axios.defaults.headers.common['Authorization'] = this.getToken
    console.log('marca de peticion a /api/admin/get-stats');
    axios({
      method:'get',
      url:'/api/admin/get-stats',
      responseType:'json'
    })
    .then(response => {
      console.log({ data: response.data })
      let gs = response.data.generalStats
      let vs = response.data.vehiclesStats
      this.$store.commit('setGeneralStats', gs)
      this.ingresosAnuales = gs.ingresosAnuales
      this.formatAltaUsuarios(gs.alta_usuarios)
      this.formatNVehiculos(vs)
      this.formatEstadoVehiculos(vs)
      this.fillDataDoughnutGeneric(['Clase A', 'Clase S', 'Clase X'],
        [gs.tendenciaClaseVehiculo2017[0].tendeciaCA, gs.tendenciaClaseVehiculo2017[1].tendeciaCS, gs.tendenciaClaseVehiculo2017[2].tendeciaCX],
        'datacollection_tendencia2017')
      this.fillDataDoughnutGeneric(['Clase A', 'Clase S', 'Clase X'],
        [gs.tendenciaClaseVehiculo2018[0].tendeciaCA, gs.tendenciaClaseVehiculo2018[1].tendeciaCS, gs.tendenciaClaseVehiculo2018[2].tendeciaCX],
        'datacollection_tendencia2018')
      this.fillDataBarGeneric([this.month(gs.mejorTasaAlquiler2017[0].mes), this.month(gs.mejorTasaAlquiler2017[1].mes), this.month(gs.mejorTasaAlquiler2017[2].mes)],
        'Nº de alquileres',
        [gs.mejorTasaAlquiler2017[0].tasaAlquilerCA, gs.mejorTasaAlquiler2017[1].tasaAlquilerCS, gs.mejorTasaAlquiler2017[2].tasaAlquilerCX],
        'datacollection_tasa2017')
      this.fillDataBarGeneric([this.month(gs.mejorTasaAlquiler2018[0].mes), this.month(gs.mejorTasaAlquiler2018[1].mes), this.month(gs.mejorTasaAlquiler2018[2].mes)],
        'Nº de alquileres',
        [gs.mejorTasaAlquiler2018[0].tasaAlquilerCA, gs.mejorTasaAlquiler2018[1].tasaAlquilerCS, gs.mejorTasaAlquiler2018[2].tasaAlquilerCX],
        'datacollection_tasa2018')
      this.mediasDesviaciones = [
        {
          label: 'Media anual de usuario en estado activo',
          payload: response.data.m_activoUsuarios
        },
        {
          label: 'Media anual de bajas de usuario',
          payload: response.data.mv_bajaUsuarios.m_bajaUsuarios
        },
        {
          label: 'Desviación estandar entorno a la media de bajas',
          payload: response.data.mv_bajaUsuarios.v_bajaUsuarios
        }
      ]
      this.$emit('load-data')
    })
    .catch(e => console.error(e))
  },
  components: {
    LineChart,
    BarChart,
    DoughnutChart
  },
  computed: {
    getToken (token) {
      if (window.localStorage.getItem('authUser'))
        return JSON.parse(window.localStorage.getItem('authUser')).jwtToken
      else
        return 'none'
    }
  },
  methods: {
    month(index){
      let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
       'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
      return months[index]
    },
    update(slug) {
      console.log('marca de peticion a /api/admin/update-ingresos-anuales');
      axios({
        method:'get',
        url:`/api/admin/${slug}`,
        responseType:'json'
      })
      .then(response => {
        console.log({ data: response.data })
        // this.ingresosAnuales = response.data.ingresosAnuales
      })
      .catch(e => console.error(e))
    },
    toFormat(payload) {
      let string_payload = payload.toLocaleString('es', {maximumFractionDigits : 1})
      return string_payload
    },
    updateIngresos() {
      console.log('marca de peticion a /api/admin/update-ingresos-anuales');
      axios({
        method:'get',
        url:'/api/admin/update-ingresos-anuales',
        responseType:'json'
      })
      .then(response => {
        console.log({ data: response.data })
        this.ingresosAnuales = response.data.ingresosAnuales
      })
      .catch(e => console.error(e))
    },
    updateAltaUsuarios() {
      console.log('marca de peticion a /api/admin/update-alta-usuarios');
      axios({
        method:'get',
        url:'/api/admin/update-alta-usuarios',
        responseType:'json'
      })
      .then(response => {
        this.formatAltaUsuarios(response.data.altaUsuarios)
      })
      .catch(e => console.error(e))
    },
    formatAltaUsuarios(payload){
      for (var i = 0; i < payload.length; i++) {
        if (payload[i].year === 2018) {
          this.altaUsuarios2018[payload[i].month - 1] = payload[i].users
        }else if (payload[i].year === 2019) {
          this.altaUsuarios2019[payload[i].month - 1] = payload[i].users
        }
      }
      this.fillData()
    },
    formatNVehiculos(payload) {
      for (var i = 0; i < payload.length; i++) {
        if (payload[i].disponible) {
          this.numeroVehiculosClase[0] += payload[i].vehicles
        }else if (payload[i].reserva) {
          this.numeroVehiculosClase[1] += payload[i].vehicles
        } else {
          this.numeroVehiculosClase[2] += payload[i].vehicles
        }
      }
      this.fillDataDoughnut()
    },
    formatEstadoVehiculos(payload) {
      for (var i = 0; i < payload.length; i++) {
        if (payload[i].clase === 'Clase A') {
          this.numeroVehiculos[0] += payload[i].vehicles
        }else if (payload[i].clase === 'Clase S') {
          this.numeroVehiculos[1] += payload[i].vehicles
        } else {
          this.numeroVehiculos[2] += payload[i].vehicles
        }
      }
      this.fillDataBar()
    },
    fillData () {
      let gradient = this.$refs.lineChart.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 750)
      let gradient2 = this.$refs.lineChart.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 750)

      gradient.addColorStop(0, 'rgba(23, 43, 77, 1)')
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0)');
      gradient2.addColorStop(0, 'rgba(45, 206, 137, 1)')
      gradient2.addColorStop(0.7, 'rgba(255, 255, 255, 0)');

      this.datacollection = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
          {
            label: 'Alta usuarios 2018',
            backgroundColor: gradient,
            borderColor: 'rgba(23, 43, 77, 1)',
            borderWidth: 0.5,
            data: [...this.altaUsuarios2018]
          }, {
            label: 'Alta usuarios 2019',
            backgroundColor: gradient2,
            borderColor: 'rgba(45, 206, 137, 1)',
            borderWidth: 0.5,
            data: [...this.altaUsuarios2019]
          }
        ]
      }
    },
    fillDataBar () {
      let gradient = this.$refs.barChart.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 750)

      gradient.addColorStop(0, 'rgba(23, 43, 77, 1)')
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0)');

      this.datacollectionBar = {
        labels: ['Clase A', 'Clase S', 'Clase X'],
        datasets: [
          {
            label: 'Numero de vehiculos',
            backgroundColor: gradient,
            borderColor: 'rgba(23, 43, 77, 1)',
            borderWidth: 0.5,
            data: [...this.numeroVehiculos]
          }
        ]
      }
    },
    fillDataBarGeneric (labels, label, payload, datacollection) {
      let gradient = this.$refs.barChart.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 750)

      gradient.addColorStop(0, 'rgba(23, 43, 77, 1)')
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0)');

      this[datacollection] = {
        labels: [...labels],
        datasets: [
          {
            label: label,
            backgroundColor: gradient,
            borderColor: 'rgba(23, 43, 77, 1)',
            borderWidth: 0.5,
            data: [...payload]
          }
        ]
      }
    },
    fillDataDoughnut () {
      let gradient = this.$refs.lineChart.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 750)
      let gradient2 = this.$refs.lineChart.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 750)
      let gradient3 = this.$refs.lineChart.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 750)

      gradient.addColorStop(0, 'rgba(23, 43, 77, 1)')
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0)');
      gradient2.addColorStop(0, 'rgba(45, 206, 137, 1)')
      gradient2.addColorStop(0.8, 'rgba(255, 255, 255, 0)');
      gradient3.addColorStop(0, 'rgba(251, 99, 64, 1)')
      gradient3.addColorStop(0.9, 'rgba(255, 255, 255, 0)');

      this.datacollectionDoughnut = {
        labels: ['Disponibles', 'Reservados', 'No disponibles'],
        datasets: [
          {
            backgroundColor: [gradient2,gradient3,gradient],
            borderColor: 'rgba(23, 43, 77, 1)',
            borderWidth: 0.5,
            data: [...this.numeroVehiculosClase]
          }
        ]
      }
    },
    fillDataDoughnutGeneric (labels, payload, datacollection) {
      let gradient = this.$refs.lineChart.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 750)
      let gradient2 = this.$refs.lineChart.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 750)
      let gradient3 = this.$refs.lineChart.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 750)

      gradient.addColorStop(0, 'rgba(23, 43, 77, 1)')
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0)');
      gradient2.addColorStop(0, 'rgba(45, 206, 137, 1)')
      gradient2.addColorStop(0.8, 'rgba(255, 255, 255, 0)');
      gradient3.addColorStop(0, 'rgba(251, 99, 64, 1)')
      gradient3.addColorStop(0.9, 'rgba(255, 255, 255, 0)');

      this[datacollection] = {
        labels: [...labels],
        datasets: [
          {
            backgroundColor: [gradient2,gradient3,gradient],
            borderColor: 'rgba(23, 43, 77, 1)',
            borderWidth: 0.5,
            data: [...payload]
          }
        ]
      }
    }
  }
}
</script>

<style>
</style>
