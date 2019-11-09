<template>
    <header class="header-global">
        <base-nav class="navbar-main pr-0" transparent type="transparent" effect="light" style="background-color: #0000004a !important;" expand>

          <base-button v-show="showBackButton || showButton"
                      slot="container-pre"
                      class="btn btn-link border-0 py-0 pr-0"
                      @click="$router.back()">
            <i class="fa fa-angle-left text-white" style="font-size:2.2rem;"></i>
          </base-button>

          <router-link slot="brand" class="navbar-brand ml-3 mr-lg-2 mr-0" to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="159.876" height="45.667"><path d="M21.3 45.659c-3.293-.118-6.226-.876-9.134-2.36-3.937-2.011-7.324-5.385-9.46-9.425-.383-.725-1.126-2.366-1.125-2.487 0-.071-.286.123 5.078-3.435 2.557-1.696 4.857-3.222 5.111-3.392.254-.17 1.842-1.223 3.529-2.341l3.924-2.603 5.144-3.416a4012.552 4012.552 0 0 0 6.754-4.486l1.806-1.199-.369-.359c-.548-.533-1.631-1.36-2.453-1.871-3.258-2.029-7.199-2.82-10.882-2.184-4.506.777-8.414 3.402-10.926 7.338a17.774 17.774 0 0 0-2.528 6.675c-.117.718-.245 2.369-.22 2.835l.017.305-2.603 1.678c-1.431.922-2.62 1.677-2.643 1.677-.054 0-.175-.826-.256-1.758-.086-.98-.085-3.1.001-4.068.413-4.632 2.118-8.954 4.966-12.584.701-.894 2.361-2.58 3.244-3.295C11.462 2.324 14.7.87 18.761.195c1.076-.178 3.767-.255 4.951-.141a21.576 21.576 0 0 1 10.318 3.82c2.227 1.557 4.426 3.856 5.918 6.187.511.798 1.139 1.918 1.139 2.032 0 .04-.675.52-1.5 1.068a4377.39 4377.39 0 0 1-10.57 7.022c-.598.395-1.303.863-1.565 1.039-.536.36-.714.477-3.25 2.16l-5.704 3.79c-2.14 1.42-5.079 3.37-6.53 4.33-1.45.96-2.69 1.798-2.755 1.86-.11.107-.082.153.508.835 4.09 4.723 10.166 6.652 16.064 5.1 3.132-.824 6.115-2.732 8.196-5.241 2.42-2.918 3.722-6.22 4.01-10.164.084-1.156.006-2.651-.201-3.868-.065-.38-.114-.695-.109-.7.017-.023 5.002-3.127 5.02-3.127.09 0 .495 1.732.69 2.96.23 1.438.286 2.405.248 4.246-.053 2.584-.356 4.367-1.168 6.877-1.406 4.344-4.212 8.29-7.88 11.08-2.155 1.638-4.851 2.939-7.51 3.623-1.86.478-4.07.737-5.78.676zm89.45-14.705l-2.852-.036-.308-.274c-1.47-1.31-1.971-4.565-1.076-6.991.355-.963 1.11-1.893 1.738-2.143.223-.088 6.331-.099 16.245-.027l6.475.046.053-.27c.101-.515.044-1.817-.105-2.407-.152-.603-.435-1.281-.648-1.551l-.136-.173-10.278-.054c-9.737-.051-10.284-.06-10.396-.177a71.062 71.062 0 0 1-1.294-1.635l-1.175-1.512.7-.037c.72-.038 21.305-.013 22.14.027 1.25.059 2.228 1.314 2.574 3.307.146.838.135 9.266-.013 10.32-.195 1.386-.643 2.438-1.36 3.19l-.443.465-8.494-.016c-4.672-.01-9.778-.032-11.346-.052zm19.73-3.35c.022-.06.04-.696.04-1.412v-1.303l-3.28-.02c-1.806-.012-6.804-.028-11.11-.037l-7.826-.017-.126.19c-.235.357-.313.664-.311 1.225.002.554.16 1.072.388 1.27.062.054 2.933.088 9.808.119 5.346.023 9.733.054 9.748.068.015.014.613.025 1.328.025 1.126 0 1.307-.015 1.341-.109zm-48.238 3.254c-1.126-.39-1.873-1.641-2.146-3.593-.136-.974-.032-9.75.124-10.447.276-1.234.672-2.047 1.325-2.722l.466-.481 10.157.028 11.806.033 1.649.005.02 1.672.02 1.671-11.888.018-11.888.017-.152.31-.151.31-.008 4-.008 4 .177.55c.171.534.502 1.188.654 1.293.04.027 4.867.05 10.725.052 5.859 0 11.075.021 11.592.046l.94.045v.806c0 .443-.02 1.183-.043 1.644l-.044.838-11.548-.007c-8.578-.006-11.608-.028-11.779-.088zm51.198-6.714c.025-6.537.03-6.758.163-7.326.181-.776.427-1.444.71-1.932.234-.403.706-.949.984-1.14.133-.09 1.169-.103 8.422-.102 4.548 0 9.63.022 11.293.047l3.023.047.25.212c.705.6 1.316 1.895 1.516 3.213.219 1.443-.054 3.327-.639 4.413-.437.81-1.223 1.576-1.65 1.607-.156.011-.18-.01-.167-.16.008-.094.094-.87.19-1.723.15-1.328.2-1.601.348-1.896.15-.3.173-.426.17-.966-.002-.652-.118-1.02-.407-1.293-.121-.114-.729-.12-11.23-.103l-11.1.017-.135.19c-.207.29-.233.969-.275 7.223-.02 3.128-.053 5.85-.073 6.05l-.035.362h-1.384zm-78.015 6.543c-.95-.275-1.762-1.457-2.116-3.078-.11-.51-.118-.906-.099-5.275.023-5.072.04-5.367.378-6.471.28-.917.845-1.8 1.44-2.252l.257-.194 11.204.044c12.382.05 11.348.005 11.805.507 1.35 1.484 1.768 4.535.928 6.786-.361.968-1.04 1.852-1.636 2.127l-.315.146-11.265-.019c-9.963-.017-11.27-.007-11.306.084-.022.057-.055.445-.073.862-.051 1.18.196 2.239.729 3.12l.176.293 7.205.01c3.963.006 8.614.029 10.337.052l3.133.042 1.137 1.586c.625.872 1.137 1.606 1.138 1.63.003.129-1.563.145-11.713.12-9.007-.022-11.08-.044-11.344-.12zM77.41 19.58c.562-.552.595-1.866.065-2.566-.08-.106-.944-.118-11.202-.163l-11.115-.05-.14.185c-.482.642-.431 2.075.09 2.527.097.084 1.425.101 9.188.117 4.991.01 9.194.025 9.339.034.145.009 1.02.027 1.946.039 1.634.022 1.686.018 1.83-.123z" fill="#fff"/></svg>
          </router-link>

          <div class="row" slot="content-header" slot-scope="{closeMenu}">
              <div class="col-6 collapse-brand">
                  <router-link :to="{ name: 'principal' }" @click.native="closeMenu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="159.876" height="45.667"><path d="M21.3 45.659c-3.293-.118-6.226-.876-9.134-2.36-3.937-2.011-7.324-5.385-9.46-9.425-.383-.725-1.126-2.366-1.125-2.487 0-.071-.286.123 5.078-3.435 2.557-1.696 4.857-3.222 5.111-3.392.254-.17 1.842-1.223 3.529-2.341l3.924-2.603 5.144-3.416a4012.552 4012.552 0 0 0 6.754-4.486l1.806-1.199-.369-.359c-.548-.533-1.631-1.36-2.453-1.871-3.258-2.029-7.199-2.82-10.882-2.184-4.506.777-8.414 3.402-10.926 7.338a17.774 17.774 0 0 0-2.528 6.675c-.117.718-.245 2.369-.22 2.835l.017.305-2.603 1.678c-1.431.922-2.62 1.677-2.643 1.677-.054 0-.175-.826-.256-1.758-.086-.98-.085-3.1.001-4.068.413-4.632 2.118-8.954 4.966-12.584.701-.894 2.361-2.58 3.244-3.295C11.462 2.324 14.7.87 18.761.195c1.076-.178 3.767-.255 4.951-.141a21.576 21.576 0 0 1 10.318 3.82c2.227 1.557 4.426 3.856 5.918 6.187.511.798 1.139 1.918 1.139 2.032 0 .04-.675.52-1.5 1.068a4377.39 4377.39 0 0 1-10.57 7.022c-.598.395-1.303.863-1.565 1.039-.536.36-.714.477-3.25 2.16l-5.704 3.79c-2.14 1.42-5.079 3.37-6.53 4.33-1.45.96-2.69 1.798-2.755 1.86-.11.107-.082.153.508.835 4.09 4.723 10.166 6.652 16.064 5.1 3.132-.824 6.115-2.732 8.196-5.241 2.42-2.918 3.722-6.22 4.01-10.164.084-1.156.006-2.651-.201-3.868-.065-.38-.114-.695-.109-.7.017-.023 5.002-3.127 5.02-3.127.09 0 .495 1.732.69 2.96.23 1.438.286 2.405.248 4.246-.053 2.584-.356 4.367-1.168 6.877-1.406 4.344-4.212 8.29-7.88 11.08-2.155 1.638-4.851 2.939-7.51 3.623-1.86.478-4.07.737-5.78.676zm89.45-14.705l-2.852-.036-.308-.274c-1.47-1.31-1.971-4.565-1.076-6.991.355-.963 1.11-1.893 1.738-2.143.223-.088 6.331-.099 16.245-.027l6.475.046.053-.27c.101-.515.044-1.817-.105-2.407-.152-.603-.435-1.281-.648-1.551l-.136-.173-10.278-.054c-9.737-.051-10.284-.06-10.396-.177a71.062 71.062 0 0 1-1.294-1.635l-1.175-1.512.7-.037c.72-.038 21.305-.013 22.14.027 1.25.059 2.228 1.314 2.574 3.307.146.838.135 9.266-.013 10.32-.195 1.386-.643 2.438-1.36 3.19l-.443.465-8.494-.016c-4.672-.01-9.778-.032-11.346-.052zm19.73-3.35c.022-.06.04-.696.04-1.412v-1.303l-3.28-.02c-1.806-.012-6.804-.028-11.11-.037l-7.826-.017-.126.19c-.235.357-.313.664-.311 1.225.002.554.16 1.072.388 1.27.062.054 2.933.088 9.808.119 5.346.023 9.733.054 9.748.068.015.014.613.025 1.328.025 1.126 0 1.307-.015 1.341-.109zm-48.238 3.254c-1.126-.39-1.873-1.641-2.146-3.593-.136-.974-.032-9.75.124-10.447.276-1.234.672-2.047 1.325-2.722l.466-.481 10.157.028 11.806.033 1.649.005.02 1.672.02 1.671-11.888.018-11.888.017-.152.31-.151.31-.008 4-.008 4 .177.55c.171.534.502 1.188.654 1.293.04.027 4.867.05 10.725.052 5.859 0 11.075.021 11.592.046l.94.045v.806c0 .443-.02 1.183-.043 1.644l-.044.838-11.548-.007c-8.578-.006-11.608-.028-11.779-.088zm51.198-6.714c.025-6.537.03-6.758.163-7.326.181-.776.427-1.444.71-1.932.234-.403.706-.949.984-1.14.133-.09 1.169-.103 8.422-.102 4.548 0 9.63.022 11.293.047l3.023.047.25.212c.705.6 1.316 1.895 1.516 3.213.219 1.443-.054 3.327-.639 4.413-.437.81-1.223 1.576-1.65 1.607-.156.011-.18-.01-.167-.16.008-.094.094-.87.19-1.723.15-1.328.2-1.601.348-1.896.15-.3.173-.426.17-.966-.002-.652-.118-1.02-.407-1.293-.121-.114-.729-.12-11.23-.103l-11.1.017-.135.19c-.207.29-.233.969-.275 7.223-.02 3.128-.053 5.85-.073 6.05l-.035.362h-1.384zm-78.015 6.543c-.95-.275-1.762-1.457-2.116-3.078-.11-.51-.118-.906-.099-5.275.023-5.072.04-5.367.378-6.471.28-.917.845-1.8 1.44-2.252l.257-.194 11.204.044c12.382.05 11.348.005 11.805.507 1.35 1.484 1.768 4.535.928 6.786-.361.968-1.04 1.852-1.636 2.127l-.315.146-11.265-.019c-9.963-.017-11.27-.007-11.306.084-.022.057-.055.445-.073.862-.051 1.18.196 2.239.729 3.12l.176.293 7.205.01c3.963.006 8.614.029 10.337.052l3.133.042 1.137 1.586c.625.872 1.137 1.606 1.138 1.63.003.129-1.563.145-11.713.12-9.007-.022-11.08-.044-11.344-.12zM77.41 19.58c.562-.552.595-1.866.065-2.566-.08-.106-.944-.118-11.202-.163l-11.115-.05-.14.185c-.482.642-.431 2.075.09 2.527.097.084 1.425.101 9.188.117 4.991.01 9.194.025 9.339.034.145.009 1.02.027 1.946.039 1.634.022 1.686.018 1.83-.123z" fill="#5d6ee7"/></svg>
                  </router-link>
              </div>
              <div class="d-flex align-items-center justify-content-end col-6 collapse-close">
                  <close-button @click="closeMenu"></close-button>
              </div>
          </div>

          <template slot-scope="{closeMenu}">
            <ul class="navbar-nav">
                <li v-if="isClient" class="nav-item">
                    <router-link to="/perfil" class="nav-link font-weight-bold d-flex align-items-center">
                      <span class="d-none d-lg-inline">Perfil</span>
                    </router-link>
                    <router-link to="/perfil" @click.native="closeMenu" class="nav-link d-flex align-items-center bg-secondary radius w-100 d-lg-none" style="margin-top: -20px !important;">
                      <div class="icon icon-shape bg-gradient-primary rounded-circle text-white ml-2">
                        <i class="ni ni-single-02"></i>
                      </div>
                      <div class="media-body ml-3 d-lg-none">
                          <h6 class="heading text-primary mb-0">Perfil</h6>
                          <p class="description d-inline-block mb-0 pr-2">Esta sección esta dedicada a tu perfil de usuario.
                            En ella podrás realizar la gestión del mismo, así como, las acciones que se incluyen en el servicio
                            de alquiler.</p>
                      </div>
                    </router-link>
                </li>
                <li v-else class="nav-item">
                    <router-link to="/admin" class="nav-link font-weight-bold d-flex align-items-center">
                      <span class="d-none d-lg-inline">Admin</span>
                    </router-link>
                    <router-link to="/admin" class="nav-link d-flex align-items-center bg-secondary radius w-100 d-lg-none" style="margin-top: -20px !important;">
                      <div class="icon icon-shape bg-gradient-warning rounded-circle text-white ml-2">
                        <i class="ni ni-app"></i>
                      </div>
                      <div class="media-body ml-3 d-lg-none">
                          <h6 class="heading text-warning mb-0">Admin</h6>
                          <p class="description d-inline-block mb-0 pr-2">Esta sección esta dedicada a los empleados de la
                            compañia eCAR para la realización de tareas administración y gestión de la plataforma.</p>
                      </div>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/precios" class="nav-link font-weight-bold d-flex align-items-center">
                      <span class="d-none d-lg-inline">Precios</span>
                    </router-link>
                    <router-link :to="{ name: 'precios' }" @click.native="closeMenu" class="nav-link d-lg-none d-flex align-items-center bg-secondary radius w-100" style="margin-top: -20px !important;">
                      <div class="icon icon-shape bg-gradient-primary rounded-circle text-white ml-2">
                        <i class="ni ni-money-coins"></i>
                      </div>

                      <div class="media-body ml-3 d-lg-none">
                          <h6 class="heading text-primary mb-0">Precios</h6>
                          <p class="description d-inline-block mb-0 pr-2">Los precios de los distintos planes en los que
                            se incluyen los respectivos vehiculos atendiendo a su autonomia.</p>
                      </div>
                    </router-link>
                </li>
            </ul>

            <ul class="navbar-nav navbar-nav-hover mx-lg-auto">
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link font-weight-bold d-flex align-items-center" data-toggle="dropdown" role="button">
                      <span class="d-none d-lg-inline">Infórmate</span>
                    </a>
                    <router-link :to="{ name: 'ayuda', params: { topic: 'general' }}" @click.native="closeMenu" class="nav-link d-flex align-items-center bg-secondary radius w-100 d-lg-none" style="margin-top: -20px !important;" data-toggle="dropdown" role="button">
                      <div class="icon icon-shape bg-gradient-primary rounded-circle text-white ml-2">
                          <i class="ni ni-book-bookmark"></i>
                      </div>
                      <div class="media-body ml-3 d-lg-none">
                          <h6 class="heading text-primary mb-0">Ayuda</h6>
                          <p class="description d-inline-block mb-0 pr-2">Ofrecemos esta sección como
                              una recopilación de las preguntas frecuentes (FAQs) que puede que te plantees
                              al usar nuesto servicio.</p>
                      </div>
                    </router-link>
                    <div class="dropdown-menu dropdown-menu-xl">
                        <div class="dropdown-menu-inner">
                            <router-link :to="{ name: 'ayuda', params: { topic: 'general' }}"
                               class="media d-flex align-items-center">
                                <div class="icon icon-shape bg-gradient-primary rounded-circle text-white">
                                    <i class="ni ni-book-bookmark"></i>
                                </div>
                                <div class="media-body ml-3">
                                    <h6 class="heading text-primary mb-md-1">Ayuda</h6>
                                    <p class="description d-none d-md-inline-block mb-0">Ofrecemos esta sección como
                                        una recopilación de las preguntas frecuentes (FAQs) que puede que te plantees
                                        al usar nuesto servicio.</p>
                                </div>
                            </router-link>
                            <router-link :to="{ name: 'politicas', params: { politica: 'general' }}"
                               class="media d-flex align-items-center">
                                <div class="icon icon-shape bg-gradient-warning rounded-circle text-white">
                                    <i class="ni ni-ui-04"></i>
                                </div>
                                <div class="media-body ml-3">
                                    <h5 class="heading text-warning mb-md-1">Politica de Privacidad</h5>
                                    <p class="description d-none d-md-inline-block mb-0">Informese aqui de los datos que recogemos, y
                                      la normativa vigente que se aplicará sobre los mismos.</p>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link font-weight-bold d-flex align-items-center" data-toggle="dropdown" role="button">
                      <span class="d-none d-lg-inline">Mas</span>
                    </a>
                    <router-link :to="{ name: 'perfil-tab', params: { tab: 'viajes' } }" @click.native="closeMenu" class="nav-link d-flex align-items-center bg-secondary radius w-100 d-lg-none" style="margin-top: -20px !important;" data-toggle="dropdown" role="button">
                      <div class="icon icon-shape bg-gradient-success rounded-circle text-white ml-2">
                        <i class="ni ni-square-pin"></i>
                      </div>
                      <div class="media-body ml-3 d-lg-none">
                          <h6 class="heading text-success mb-0">Viajes</h6>
                          <p class="description d-inline-block mb-0 pr-2">Aqui puedes ver los viajes realizados, podrás realizar
                            el pago de los mismos, junto a la posibilidad de iniciar uno nuevo.</p>
                      </div>
                    </router-link>
                    <div class="dropdown-menu">
                        <router-link to="/precios" class="dropdown-item">Precios</router-link>
                        <router-link v-if="logged" to="/perfil" class="dropdown-item">Perfil</router-link>
                        <router-link v-if="logged" to="/admin" class="dropdown-item">Admin</router-link>
                        <router-link v-if="logged" to="/perfil/viajes" class="dropdown-item">Viajes</router-link>
                        <router-link v-if="logged" to="/perfil/consultas" class="dropdown-item">Consultas</router-link>
                        <router-link v-if="!logged" to="/inicio-sesion" class="dropdown-item">Inicio Sesion</router-link>
                        <router-link v-if="!logged" to="/registro" class="dropdown-item">Registro</router-link>
                    </div>
                </li>
                <li v-if="logged" class="nav-item">
                    <base-button type="secondary" @click="logout" class="btn-no-shadow nav-link d-flex d-md-none align-items-center radius border-0 no-translate-y w-100" style="margin-top: 10px !important;">
                      <div class="icon icon-shape bg-gradient-danger rounded-circle ml-2">
                        <i class="fa fa-sign-out text-white" style="opacity: 1;"></i>
                      </div>

                      <div class="media-body d-lg-none">
                          <h6 class="heading mb-0">Cerrar Sesión</h6>
                      </div>
                    </base-button>
                </li>
            </ul>
          </template>

          <template v-if="this.$route.path !== '/inicio-sesion'">
            <router-link slot="login-logout"
                         v-if="!logged"
                         :to="{name: 'inicio-sesion'}"
                         class="btn btn-icon bg-white text-default radius border-0 no-translate-y shadow-none d-none d-md-inline-flex d-xl-inline-flex">
              <span class="btn-inner--icon mr-2">
                <i class="fa fa-sign-in"></i>
              </span>
              <span class="nav-link-inner--text">Inicio Sesión</span>
            </router-link>

            <base-button slot="login-logout"
                         v-if="logged"
                         @click="logout"
                         class="btn btn-icon bg-white text-default radius border-0 no-translate-y shadow-none d-none d-md-inline-flex d-xl-inline-flex">
              <span class="btn-inner--icon mr-2">
                <i class="fa fa-sign-out"></i>
              </span>
              <span class="nav-link-inner--text">Cerrar Sesión</span>
            </base-button>
          </template>

          <router-link slot="login-logout"
                       :to="{name: 'perfil'}"
                       class="btn btn-icon border-0 text-white py-0 px-1 radius no-translate-y shadow-none d-inline-flex d-md-none d-xl-none">
            <span class="btn-inner--icon">
              <i class="fa font-size-xl fa-user-circle-o"></i>
            </span>
          </router-link>
        </base-nav>
    </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import CloseButton from "@/components/CloseButton";

export default {
  name: 'StarterHeader',
  components: {
    BaseNav,
    CloseButton
  },
  data () {
    return {
      showBackButton: false
    }
  },
  mounted () {
    if (window.localStorage.getItem('authUser')) {
      this.logged = true
    }
    else {
      this.logged = false
    }
  },
  computed: {
    userImage () {
      return this.$store.state.perfil.userImage
    },
    isClient () {
      let authUser = JSON.parse(window.localStorage.getItem('authUser'))
      if (authUser === null || authUser.role_id === '636c69656e7465') {
        return true
      } else {
        return false
      }
    },
    logged: {
      get: function () {
        return this.$store.state.logged
      },
      set: function (newValue) {
        this.$store.commit('userLogged', newValue)
      }
    },
    showButton () {
      return this.showBackButton = this.$route.path !== '/'
    }
  },
  methods: {
    logout () {
      this.logged = false
      this.$store.commit('setPerfil', {})
      this.$store.commit('setQueries', [])
      this.$store.commit('setTravels', [])
      localStorage.removeItem('authUser')
      this.$router.push({
        name: 'inicio-sesion'
      })
    }
  },
  watch: {
    $route: function() {
      this.showBackButton = this.$route.path !== '/'
      console.log('¿Mostrar el boton atras \'BackButton\'?: ' + this.showBackButton);
    }
  }
};
</script>
<style>
.border-left {
  border-left-width: 1.2rem !important;
}
.btn-link:active {
  background-color: transparent !important;
}
.radius {
  border-radius: 2rem !important;
}
.font-size-xl {
  font-size: 2rem !important;
}
</style>
