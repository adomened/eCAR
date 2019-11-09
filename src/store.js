import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged: false,
    toResumeListTravel: 3,
    vehicles: [],
    vehicle: {
      autonomia: undefined,
      expiraReserva: undefined,
      idPublic: undefined,
      lat: undefined,
      long: undefined,
      localizacion: 'Almeria',
      marca: 'Seat',
      matricula: undefined,
      tipo: 'Coche',
      numPlazas: 5,
      numPuertas: 5
    },
    travels: [],
    customers: [],
    employees: [],
    perfil: {
      enProcesoDeValidacion: true,
      validado: true
    },
    queries: [],
    employee: {},
    favorite: false,
    generalStats: {},
    vehiclesStats: []
  },
  getters: {
    resumeListTravels (state, getters) {
      if (!state.travels.length)
        return []
      else if (state.toResumeListTravel >= getters.filterTravels.length)
        return getters.filterTravels
      else
        return getters.filterTravels.slice(0, state.toResumeListTravel)
    },
    userBirth (state) {
      if (Object.keys(state.perfil).length !== 0 && !(state.perfil.userBirth === undefined)) {
        let date = new Date(state.perfil.userBirth)
        return date.toJSON().substring(0,10)
      } else return '1212-12-12'
    },
    user_birth: (state) => (field) => {
      if (Object.keys(state[field]).length !== 0 && !(state[field].userBirth === undefined)) {
        let date = new Date(state[field].userBirth)
        return date.toJSON().substring(0,10)
      } else return '1212-12-12'
    },
    filterTravels: function (state) {
      if (state.favorite) {
        return state.travels.filter( travel => travel.favorito );
      } else {
        return state.travels
      }
    }
  },
  mutations: {
    showMoreItemsListTravel (state, toAdd) {
      state.toResumeListTravel += toAdd
    },
    setPerfil (state, perfil) {
      state.perfil = perfil
    },
    setEmployee (state, employee) {
      state.employee = employee
    },
    setGeneralStats (state, stats) {
      state.generalStats = stats
    },
    setVehiclesStats (state, stats) {
      state.vehiclesStats = stats
    },
    setVehicle (state, vehicle) {
      state.vehicle = vehicle
    },
    setCustomers (state, payload) {
      for (var i = 0; i < payload.customers.length; i++) {
        payload.customers[i].image = payload.images[i]
      }
      state.customers = payload.customers
    },
    setEmployees (state, payload) {
      for (var i = 0; i < payload.employees.length; i++) {
        payload.employees[i].image = payload.images[i]
      }
      state.employees = payload.employees
    },
    setTravels (state, travels) {
      state.travels = travels
    },
    setFavorite (state, favorite) {
      state.favorite = favorite
    },
    setQueries (state, queries) {
      state.queries = queries
    },
    setVehicles (state, vehicles) {
      state.vehicles = vehicles
    },
    userBirth (state, payload) {
      state[payload.field].userBirth = payload.value
    },
    userLogged (state, value) {
      state.logged = value
    }
  },
  actions: {

  }
})
