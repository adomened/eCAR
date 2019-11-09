<template lang="html">
  <section>
    <div class="section-cover principal section-shaped my-0">
        <!-- <div class="shape bg-gradient-pordefecto shape-skew"> -->
        <div class="shape bg-gradient-pordefecto">
        </div>
    </div>
    <div>
      <div class="container-fluid card-page-principal-page-first px-0">
        <div class="container">
          <div class="row no-gutters" style="min-height: 100px;">
            <h1 class="col-10 display-1 d-flex align-items-center justify-content-left encabezado font--size pl-1 pl-md-4" >
              <i>RAPIDO</i>
            </h1>
          </div>
        </div>
        <div class="row no-gutters" style="min-height: 2px;">
          <div class="col-lg-12 col-md-12 col-12 bg-default sombra-interior d-flex align-items-center justify-content-center px-2 px-lg-5 py-2 py-lg-1" style="z-index:10;">
            <div class="container">
              <p class="font-weight-normal text-center text-monospace text-white mb-0">eCAR nace con un objetivo claro, ofrecerte la oportunidad de alquilar un vehiculo electrico
                de una forma rapida y sencilla. Disfruta desde hoy las ventajas de conducir un vehiculo electrico.</p>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row no-gutters" style="min-height: 100px;">
            <div class="col"></div>
            <h1 class="col-auto d-flex align-items-end encabezado-inferior font--size-inferior font-size-ampersand pr-4 pb-4 pb-sm-1">
              &
            </h1>
            <h1 class="col-auto d-flex font-weight-light align-items-center justify-content-center encabezado-inferior font--size-inferior">
              SENCILLO
            </h1>
          </div>

          <div class="row no-gutters row justify-content-center">
            <div class="col-auto d-flex align-items-start px-3 mb-3" style="min-height: 80px;">
              <i class="fa fa-twitter text-white" style="font-size:1.6rem;" aria-hidden="true"></i>
            </div>
            <div class="col-auto d-flex align-items-start px-3 mb-3" style="min-height: 80px;">
              <i class="fa fa-facebook text-white" style="font-size:1.6rem;" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="container mt-5">
        <div class="row card-page-principal-page-second">
          <div class="col-12 no-gutters">
            <!-- <img src="img/vehicles/chevrolet-3253172_960_720.png" alt="chevrolet" class="img-fluid mi-imagen"> -->
            <!-- <img src="img/vehicles/mercedes-benz-190_1.png" alt="chevrolet" class="img-fluid"> -->
          </div>
        </div>
        <div class="row justify-content-center my-5">
          <div class="col-auto mb-3">
            <router-link to="/geolocation" class="btn btn-primary btn-lg bg-gradient-primary no-translate-y border-0 radius">
              <span class="btn-inner--icon">
                <i class="fa fa-map-marker mr-2"></i>
              </span>
              Alquilar
            </router-link>
            <router-link :to="{ name: 'acerca-de' }" class="btn btn-no-shadow no-translate-y text-body btn-lg" role="button">
              <span class="btn-inner--icon">
                <i class="fa fa-info mr-2"></i>
              </span>
              Aprenda mas
            </router-link>
          </div>

          <p class="text-center">
            <i class="fa fa-map-marker mr-2"></i>
            Para ofrecerte el servicio le pedimos que nos facilite su localización geografica.
            <router-link :to="{ name: 'politicas', params: { politica: 'privacidad' }}">
              Politica de privacidad
              <i class="fa fa-external-link" aria-hidden="true"></i>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
export default {
  name: 'PortadaAlternativa'
}
</script>

<style lang="scss" scoped>
.sombra {
  box-shadow: 0 4px 15px rgba(50, 50, 93, 0.41), 0 5px 15px rgba(0, 0, 0, 0.07);
}
.sombra-interior {
  box-shadow: inset 0px 7px 20px -5px #020106, inset 0px -4px 20px -5px #020106;
}
@media (max-width: 575.98px) {
  .font--size {
    font-size: 5.4rem !important;
  }
  .font--size-inferior{
    font-size: 5rem !important;
    &.font-size-ampersand {
      font-size: 2.4rem !important;
    }
  }
}
@media (min-width: 576px) and (max-width: 767.98px) {
  .font--size {
    font-size: 6.4rem !important;
  }
  .font--size-inferior{
    font-size: 6.4rem !important;
    &.font-size-ampersand {
      font-size: 4.4rem !important;
    }
  }
}
@media (min-width: 768px) {
  .font--size {
    font-size: 7.4rem !important;
  }
  .font--size-inferior{
    font-size: 7.4rem !important;
    &.font-size-ampersand {
      font-size: 5.4rem !important;
    }
  }
}
.encabezado {
  letter-spacing: -9px;
  margin-bottom:-45px;
  color: #bfe6f3;
  font-weight: 800 !important;
  margin-top: 6px;
  transform: scale(1,1.1) !important;
  text-shadow: 11px 0 #3672a3;
}
.encabezado-inferior {
  letter-spacing: -9px;
  color: #ffe5e0;
  margin-top:-44px !important;
  margin-top: 6px;
  transform: scale(1,1.1) !important;
  text-shadow: -4px 0 #05131d, 0 4px #fd654b, 4px 0 #a52c2c, 0 -4px #fb6340;
}
</style>
