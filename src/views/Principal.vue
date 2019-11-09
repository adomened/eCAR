<template>
  <div class="starter-page page">

    <!-- <PortadaTrafico></PortadaTrafico> -->

    <portada></portada>

    <section class="bg-secundario border-top-default">
      <div class="container py-3 px-0">
        <div class="row mx-min">
          <div class="col-12 px-0">
            <h1 class="d-flex align-items-center justify-content-center mb-3" >
              <i class="ni ni-compass-04 mr-3"></i>
              Itinerario web
            </h1>
          </div>
          <card class="col-12 shadow-itinerario border-0 px-0 mb-1">
             <!-- ml-lg-5 -->
            <div class="row align-items-center">
              <div class="col-lg-3 col-5 d-none d-lg-flex align-items-center justify-content-center p-lg-4 p-0 border-right border-light">
                <img class="img-fluid" src="img/nuevo_usuario_ver7.svg" alt="user image svg">
              </div>
              <div class="col-12 d-sm-block d-lg-none">
                <div class="row align-items-center justify-content-center">
                  <div class="col-lg-3 col-md-4 col-6 order-lg-2 order-1 p-lg-4 p-0">
                    <img class="img-fluid" src="img/nuevo_usuario_ver7.svg" alt="user image svg">
                  </div>
                </div>
              </div>
              <div class="col-lg-9 col-12">
                <h4 class="font-weight-normal mt-4">Lo primero será crearte un perfil de usuario</h4>
                <p>Para usar nuestro servicio debes tener una cuenta activa. Para ello dirigase a la pagina
                  de <router-link :to="{ name: 'registro' }">registro <i class="fa fa-external-link text-primary" aria-hidden="true"></i></router-link>
                  donde podrá iniciar el proceso de creación de una cuenta.<strong> Tendrá maximo una hora desde el momento
                  que inicie el proceso de registro y active su cuenta mediante el correo electronico que recibirá</strong>.
                  Está medida es para evitar colisiones y que se pueda usar el servicio de manera abusiva.</p>
              </div>
            </div>
          </card>
          <card class="col-12 shadow-itinerario border-0 px-0 my-1">
            <div class="row align-items-center">
              <div class="col-lg-9 col-12 text-right order-lg-1 order-2">
                <h4 class="font-weight-normal mt-4">Estaremos en contacto siempre que sea necesario</h4>
                <p>Se le mantedrá informado, a través de correo electronico, de cualquier cambio que sufra su perfil,
                  para permitirle que audite los mismos. No será necesario que responda a los correos electronicos, son automaticos.
                  Si quiere ponerse en contacto con nosotros puede utilizar una de las diferentes vias disponibles.
                  <strong>En estas comunicaciones nunca se te pedirá tus datos de acceso, como la contraseña</strong>.</p>
              </div>
              <div class="col-lg-3 col-5 d-none d-lg-flex align-items-center justify-content-center order-lg-2 order-1 p-lg-4 p-0 border-left border-light">
                <img class="img-fluid" src="img/sobre_email_ver6.svg" alt="user image svg">
              </div>
              <div class="col-12 d-sm-block d-lg-none">
                <div class="row align-items-center justify-content-center">
                  <div class="col-lg-3 col-md-4 col-6 order-lg-2 order-1 p-lg-4 p-0">
                    <img class="img-fluid" src="img/sobre_email_ver6.svg" alt="user image svg">
                  </div>
                </div>
              </div>
            </div>
          </card>
          <card class="col-12 shadow-itinerario border-0 px-0 my-1">
            <div class="row align-items-center">
              <div class="col-lg-3 d-none d-lg-flex align-items-center justify-content-center p-lg-4 p-0 border-right border-light">
                <img class="img-fluid" src="img/complete_user_data_v3.svg" alt="user image svg">
              </div>
              <div class="col-12 d-sm-block d-lg-none">
                <div class="row align-items-center justify-content-center">
                  <div class="col-lg-3 col-md-4 col-6 order-lg-2 order-1 p-lg-4 p-0">
                    <img class="img-fluid" src="img/complete_user_data_v3.svg" alt="user image svg">
                  </div>
                </div>
              </div>
              <div class="col-lg-9 col-12">
                <h4 class="font-weight-normal mt-4">Le pediremos sus datos personales</h4>
                <p>Para ofrecerle nuestro servicio será necesario que nos facilite sus datos. Siempre hacemos un uso responsable
                  de los mismos; atendiendo al marco normativo al respecto. Puede dirigirse a nuestra politica de privacidad para
                  obtener mas información al respecto. <strong>Sus datos nunca serán moneda de cambio</strong>.</p>
              </div>
            </div>
          </card>
          <card class="col-12 shadow-itinerario border-0 px-0 mt-1 mb-3">
            <div class="row align-items-center">
              <div class="col-lg-9 col-12 text-right order-lg-1 order-2">
                <h4 class="font-weight-normal mt-4">Empiece a usar nuestro servicio</h4>
                <p>Usar nuestro servicio de alquiler de vehiculos es sencillo. Solo tendrá que iniciar un viaje, una vez
                  recogido el vehiculo de nuestras instalaciones. <strong>Antes de poder iniciar un viaje se le requerira
                  el documento nacional que acredite que puede conducir un vehiculo de las caracteristica que
                  requiere</strong>.<small class="font-weight-light"> Este tramite podrá realizarlo tanto telematicamente como de forma presencial</small></p>
              </div>
              <div class="col-lg-3 d-none d-lg-flex align-items-center justify-content-center order-lg-2 order-1 p-lg-4 p-0 border-left border-light">
                <img class="img-fluid" src="img/start_finish_ver2_2.svg" alt="user image svg">
              </div>
              <div class="col-12 d-sm-block d-lg-none">
                <div class="row align-items-center justify-content-center">
                  <div class="col-lg-3 col-md-5 col-7 order-lg-2 order-1 p-lg-4 p-0">
                    <img class="img-fluid" src="img/start_finish_ver2_2.svg" alt="user image svg">
                  </div>
                </div>
              </div>
            </div>
          </card>

          <div class="col-12 px-0">
            <base-alert type="secondary" class="mb-0" style="background-color:#ffe839a6;border-left: 6px solid rgb(119, 109, 27);;border-radius: 0rem .25rem .25rem 0rem;">
              <span class="alert-inner--icon text-center d-block">
                <i class="fa fa-bolt" style="font-size:1.5rem; color:rgb(119, 109, 27);"></i>
              </span>
              <span class="alert-inner--text" style="color:rgb(119, 109, 27);">
                <strong>NOTA IMPORTANTE:</strong> Esta pagina <strong>no tiene un fin comercial</strong>. Es el resultado del trabajo personal de un
                alumno de la <strong>UNED</strong> (Universidad Nacional de Educación a Distancia) como <strong>TFG</strong>
                (Trabajo Final de Grado).
              </span>
            </base-alert>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container-fluid" style="background: linear-gradient(#f5365c,#f56036)!important;">
        <div class="container px-0">
          <div class="row no-gutters align-items-center">
            <div class="col-md-6 col-12  my-3 bg-white rounded">
              <h4 class="font-weight-light d-flex align-items-center justify-content-center text-secondary bg-default rounded-top py-2 mb-0" >
                <i class="fa fa-newspaper-o pr-3" style="font-size:1.6rem"></i>
                <span class="pb-1">Newsletter</span>
              </h4>
              <p class="text-justify border-bottom border-light px-3 py-3">Manténgase informado de nuestras ultimas novedades subcribiendose a nuestro boletin
                informativo o newsletter. Somos una empresa concienciada con el envio abusivo de correos electronicos
                (o spam). Podrá darse de baja cuando lo considere oportuno.</p>
              <p class="font-weight-normal text-center text-muted px-3">
                <i class="fa fa-calendar-check-o mr-2" aria-hidden="true"></i>
                No recibirá mas de un correo a la semana
              </p>
            </div>
            <div class="col-md-6 col-12">
              <form role="form">
                <base-input alternative
                            class="col-12 px-lg-3 px-0"
                            color-input="blue"
                            placeholder="Correo electronico"
                            autocomplete="email"
                            type="email"
                            @click-button="subsNewsletter"
                            v-model.trim="newsletter"
                            textButtonLeft="suscribirse"
                            addon-left-icon="fa fa-envelope-open-o">
                </base-input>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
<script>
import Portada from './components/Portada'

export default {
  name: 'Stater',
  components: {
    Portada
  },
  data () {
    return {
      newsletter: undefined
    }
  },
  computed: {

  },
  methods: {
    subsNewsletter () {
      console.log('Vamos a suscribirnos al newsletter');
    }
  }
}
</script>
<style>

</style>
