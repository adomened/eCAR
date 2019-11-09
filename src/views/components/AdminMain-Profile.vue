<template lang="html">
  <div class="content" style="margin-bottom:18px">
    <div class="row justify-content-center mb-4">
      <div class="col-lg-8 col-12">
        <card v-if="perfilCount > 2" shadow style="min-height:200px" class="mb-3">
          <div class="row mb-4">
            <div class="col-12 d-flex justify-content-center mb-2">
                <div class="card-image" style="margin-top:-95px">
                    <a href="#">
                        <img width="150" :src="perfil.userImage" class="rounded-circle shadow">
                    </a>
                </div>
            </div>
            <div class="col-12 text-center">
              <p class="d-flex align-items-center justify-content-center bg-secondary radius py-1 mb-0">
                <i class="ni ni-single-02 mr-2"></i>{{userRol}}
              </p>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-lg-4 col-12">
              <p class="font-weight-normal text-center mb-0">Nombre</p>
              <p class="radius bg-secondary mb-0 px-3 py-1">
                <span>{{perfil.userName}}</span>
              </p>
            </div>
            <div class="col-lg-8 col-12">
              <p class="font-weight-normal text-center mb-0">Apellidos</p>
              <p class="radius bg-secondary mb-0 px-3 py-1">
                <span>{{perfil.userSurname}}</span>
              </p>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-lg col-12">
              <p class="font-weight-normal text-center mb-0">Fecha de nacimiento</p>
              <p class="radius bg-secondary mb-0 px-3 py-1">
                <span>{{userBirth}}</span>
              </p>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-lg-4 col-12">
              <p class="font-weight-normal text-center mb-0">Apodo</p>
              <p class="radius bg-secondary mb-0 px-3 py-1">
                <span>{{perfil.userNickname}}</span>
              </p>
            </div>
            <div class="col-lg-8 col-12">
              <p class="font-weight-normal text-center mb-0">Correo electronico</p>
              <p class="radius bg-secondary mb-0 px-3 py-1">
                <span>{{perfil.userEmail}}</span>
              </p>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-lg col-12">
              <p class="font-weight-normal text-center mb-0">Domicilio</p>
              <p class="radius bg-secondary mb-0 px-3 py-1">
                <span>{{perfil.userDomicilio}}</span>
              </p>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-lg-auto col-12">
              <p class="font-weight-normal text-center mb-0">CP</p>
              <p class="radius bg-secondary mb-0 px-3 py-1">
                <span>{{perfil.userCP}}</span>
              </p>
            </div>
            <div class="col-lg col-12">
              <p class="font-weight-normal text-center mb-0">Localidad</p>
              <p class="radius bg-secondary mb-0 px-3 py-1">
                <span>{{perfil.userLocalidad}}</span>
              </p>
            </div>
            <div class="col-lg col-12">
              <p class="font-weight-normal text-center mb-0">Provincia</p>
              <p class="radius bg-secondary mb-0 px-3 py-1">
                <span>{{perfil.userProvincia}}</span>
              </p>
            </div>
          </div>
          <div v-if="perfil.planta" class="row mb-2">
            <div class="col-lg col-12">
              <p class="font-weight-normal text-center mb-0">Planta</p>
              <p class="radius bg-secondary mb-0 px-3 py-1">
                <span>{{perfil.planta}}</span>
              </p>
            </div>
            <div class="col-lg col-12">
              <p class="font-weight-normal text-center mb-0">Puerta</p>
              <p class="radius bg-secondary mb-0 px-3 py-1">
                <span>{{perfil.puerta}}</span>
              </p>
            </div>
          </div>
        </card>
      </div>
      <div class="col-lg col-12">
        <card type="transparent" class="border-0 mt-lg-4 mt-0 mb-2">
          <div class="row justify-content-center mb-2">
            <div class="icon icon-shape d-flex align-items-center bg-default rounded-circle text-white">
              <i class="fa fa-quote-right" aria-hidden="true"></i>
            </div>
          </div>
          <blockquote class="blockquote text-center">
            <h6>En el terreno de juego como en la vida siempre hay que dar el 120%</h6>
            <footer class="blockquote-footer">Sergio Ramos</footer>
          </blockquote>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminMain-Profile',
  computed: {
    userRol(){
      return this.perfil.userRol
    },
    userBirth() {
      let date = new Date(this.perfil.userBirth)
      return date.toLocaleDateString()
    },
    perfil(){
      return this.$store.state.perfil
    },
    perfilCount(){
      console.log('-> ' + Object.keys(this.perfil).length);
      return Object.keys(this.perfil).length
    }
  }
}
</script>

<style lang="css">
</style>
