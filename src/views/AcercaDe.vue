<template>
  <div class="page">
    <section class="section-cover section-shaped my-0 bg-gradient-default">
      <div class="container px-0 py-5">
        <div class="row">
          <div class="col-12 pt-md-4 pt-0 mb-4 mb-md-0">
            <div class="profiling-header px-0 pt-5 text-center">
              <h2 class="font-weight-light text-center text-secondary">
                Acerca de mi
              </h2>
              <p class="lead text-secondary text-center">Esta pagina me permite darme a conocer como autor de esta pagina.
                Ademas, da información que posiblemente sea del interes del lector de este proyecto.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-secundario border-top-success">
      <div class="container px-0 pb-0 pb-sm-5 mt-5 mt-sm-0">
        <card shadow class="card-page-regular border-0 p-4" no-body>
          <div class="row">
            <div class="col-12 d-flex justify-content-center mb-2">
                <div class="card-image">
                    <a href="#">
                        <img width="250" :src="autor.image" class="rounded-circle shadow">
                    </a>
                </div>
            </div>

            <div class="col-12">
              <h4 class="font-weight-light text-center mb-4">
                Antonio J. Domene
                <small class="text-muted d-block">Ingeniero informatico</small>
                <i class="fa fa-github mx-1 text-muted" style="font-size:1.4rem" aria-hidden="true"></i>
                <i class="fa fa-twitter-square mx-1 text-muted" style="font-size:1.4rem" aria-hidden="true"></i>
              </h4>
              <span>

              </span>
            </div>

            <div class="col-12">
              <p>Este es el resultado de mi Trabajo de fin de grado (<strong>TFG</strong>) en ingenieria
                informartica en la <strong>UNED</strong>. Un poco de Bio... Ehmmm... podria decir, que desde
                siempre me gustó la informatica y la tecnologia en general.</p>
              <p>Si eres desarrollador y estas interesado en este proyecto publicaré el
              codigo (junto a información relacionada) en <strong>GitHub</strong> una vez superada la evaluación.
              Iré actualizando, en la medida de lo posible, la pagina a medida que adquiera mas conocimientos.</p>
            </div>

            <div class="col-12">
              <p class="font-weight-bold">Las tecnologias que me han permitido desarrollar esta web app son
                las siguientes:</p>
              <ol>
                <li>Vuejs junto a su herramienta de linea de comandos, Vue CLI, para la interfaz de usuario.</li>
                <li>Nodejs.</li>
                <li>El framework Express para contruir la API en el lado del servidor.</li>
                <li>Bootstrap para un diseño responsive.</li>
              </ol>
            </div>

            <div class="col-12">
              <p class="font-weight-bold">Otros proyectos o codigo de terceros que he usado:</p>
              <ol>
                <li>Tema de Tim implementado sobre Bootstrap.</li>
              </ol>

            </div>

            <div class="col-12">
              <p class="font-weight-bold">Última actualización: <span class="text-primary">2 de Noviembre de 2018</span></p>
            </div>

          </div>
        </card>
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Vehicle',
  components: {

  },
  data () {
    return {
      autor : {
        "image": "/img/autor/0641934c4a1911e2a1c622000a1fbcae_7.jpg"
      }
    }

  },
  props: {
    topic: String
  },
  created () {

  },
  computed: {

  },
  methods: {

  }
}
</script>
<style>
</style>
