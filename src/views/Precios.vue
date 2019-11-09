<template>
  <div class="prices-page">
    <section class="bg-gradient-default">
      <div class="container pt-5 pb-2">
        <div class="row">
          <div class="col-12 pt-md-4 pt-0">
            <div class="pricing-header px-2 py-5 text-center">
                <h1 class="font-weight-light text-center text-secondary">
                  Precios
                </h1>
                <p class="lead text-secondary">Obtén de un rapido vistazo una paronamica de nuestros
                  precios y los diferentes planes en los que estan incluidos los distintos vehiculos.</p>
                <!-- <img src="img/vehicles/model-a.png" width="650" alt="tesla model s"> -->
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="pb-4">
        <div class="container px-0">
          <div class="row justify-content-center">
            <div class="col-auto py-3">
              <base-button class="no-translate-y py-1 px-1 border-0" type="primary" @click="cambiarPrecios">
                <strong class="d-inline-flex justify-content-center">
                  <span :class="[{'bg-secondary rounded text-primary': togglePrices === true}]"
                    class="p-1" style="min-width:90px">
                    Hora
                  </span>
                  <span :class="[{'bg-secondary rounded text-primary': togglePrices !== true}]"
                    class="p-1" style="min-width:90px">
                    Minutos
                  </span>
                </strong>
              </base-button>
            </div>
          </div>

          <div class="parent container-fluid contenedor text-center">
            <vue-scroll>
              <!-- :ops="ops" -->
              <card gradient="secondary" shadow class="bloque card-prices" style="max-width:240px">
                <h4 slot="header" class="my-0 font-weight-normal">Modelos S</h4>
                <h1 class="card-title pricing-card-title">{{precioS}} € <small class="text-muted">/ {{timePrices}}</small></h1>
                <ul class="list-unstyled mt-3 mb-3">
                  <li>Baja autonomia</li>
                  <li>Asistencia en viaje</li>
                  <li>Seguro a terceros</li>
                  <li>Consultoria telematica 24h</li>
                </ul>
                <router-link class="btn btn-lg btn-block btn-primary text-white" to="/precios/food#model-B">
                  Mas info
                </router-link>
              </card>
              <card gradient="secondary" shadow class="card-prices bloque" style="max-width:240px">
                <h4 slot="header" class="my-0 font-weight-normal">Modelos A</h4>
                <h1 class="card-title pricing-card-title">{{precioA}} € <small class="text-muted">/ {{timePrices}}</small></h1>
                <ul class="list-unstyled mt-3 mb-3">
                  <li>Autonomia intermedia</li>
                  <li>Asistencia en viaje</li>
                  <li>Seguro a terceros</li>
                  <li>Consultoria telematica 24h</li>
                  <!-- Centro de ayuda 24h -->
                </ul>
                <router-link class="btn btn-lg btn-block btn-primary text-white" to="/precios/contact#model-A">
                  Mas info
                </router-link>
              </card>
              <card gradient="secondary" shadow class="card-prices bloque" style="max-width:240px">
                <h4 slot="header" class="my-0 font-weight-normal">Modelos X</h4>
                <h1 class="card-title pricing-card-title">{{precioX}} € <small class="text-muted">/ {{timePrices}}</small></h1>
                <ul class="list-unstyled mt-3 mb-3">
                  <li><strong>Alta</strong> autonomia</li>
                  <li>Asistencia en viaje</li>
                  <li>Seguro a terceros</li>
                  <li>Consultoria telematica 24h</li>
                </ul>
                <router-link class="btn btn-lg btn-block btn-primary text-white" to="/precios/food#model-B">
                  Mas info
                </router-link>
              </card>
            </vue-scroll>
          </div>

          <div class="row no-gutters">
            <div class="col-12">
              <p class="text-default px-3">
                <i>Observe que la unica diferencia en cuando prestaciones de los distintos paquetes es la autonomia del
                  vehiculo. Mayor autonomia te permitira hacer mas kilometros entre recargas.</i>
              </p>
            </div>
          </div>

          <div class="row bg-white rounded py-4 mx-5">
            <div class="col-12 text-center mb-3">
              <i class="fa fa-paypal px-3" aria-hidden="true" style="font-size:3.4rem"></i>
              <i class="ni ni-money-coins px-3" aria-hidden="true" style="font-size:3.4rem"></i>
            </div>
            <div class="col-12 text-center px-5">
              El pago de los respectivos viajes se podrá realizar a través de la plataforma de Paypal® o realizar el pago
              en nuestras oficinas.
            </div>
          </div>
        </div>
      </section>
      <section>
        <SlideXLeftTransition origin="center" mode="out-in" :duration="350">
          <router-view></router-view>
        </SlideXLeftTransition>
      </section>
    </div>
</template>


<script>

import {SlideXLeftTransition} from 'vue2-transitions'

export default {
  components: {
    SlideXLeftTransition
  },
  data() {
    return {
      precioS:'0,18',
      precioA:'0,22',
      precioX:'0,32',
      togglePrices:false,
      timePrices: 'min',
      // ops: {
      //   bar: {
      //     background: '#cccccc',
      //     showDelay: 500,
      //     opacity: 0.6
      //   },
      //   vuescroll: {
      //     snapping: {
      //       enable: true,
      //       width: 280,
      //       height: 100
      //     },
      //     mode: 'slide'
      //   },
      //   scrollPanel: {
      //     scrollingX: true,
      //     scrollingY: false
      //   }
      // }
    }
  },
  methods: {
    cambiarPrecios () {
      this.togglePrices = !this.togglePrices
      if (this.togglePrices) {
        this.precioS = '10,8'
        this.precioA = '13,2'
        this.precioX = '19,2'
        this.timePrices = 'h'
      } else {
        this.precioS = '0,18'
        this.precioA = '0,22'
        this.precioX = '0,32'
        this.timePrices = 'min'
      }
    }
  }

}
</script>

<style>
.parent{
  height: 370px !important;
  white-space: nowrap;
  overflow: auto;
}
.contenedor{
  padding-right: 0px !important;
  padding-left: 0px !important;
}
.bloque{
  display: inline-block !important;
  display: flex;
  margin-left: 20px !important;
  margin-right: 20px !important;
  max-height: 350px !important;
}
.shadow {
  box-shadow: 0 7px 15px rgba(50, 50, 93, 0.21), 0 5px 15px rgba(255, 255, 255, 0.3) !important;
  -webkit-box-shadow: 0 7px 15px rgba(50, 50, 93, 0.21), 0 5px 15px rgba(255, 255, 255, 0.3) !important;
}
/* .bg-primary{
  background: linear-gradient(150deg, #281483 15%, #8f6ed5 70%, #d782d9 94%) !important;
} */
/*Native transitions*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity .8s
}
.fade-enter{
  background-color: red;
  opacity: 0.1;
}
.fade-leave-to {
  background-color: green;
  opacity: 0.2;
}
.fade-leave{
  background-color: orange;
  opacity: 0.8;
}
.fade-enter-to {
  background-color: blue;
  opacity: 0.8;
}

</style>
