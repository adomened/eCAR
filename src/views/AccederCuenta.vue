<template>
  <BloqueCentrado no-body>
    <div slot="acceder" class="col-lg-7 col-md-10 col-12 mt-5">
        <card type="secondary" shadow
              header-classes="bg-white pb-5"
              body-classes="px-3 py-md-2 py-1"
              class="border-0">
            <template>
                <div class="text-center text-muted mb-2">
                  <small class="font-weight-bold">Ingrese su nueva contraseña para acceder a su cuenta</small>
                </div>
                <form role="form">
                    <base-input alternative
                                class="mb-1"
                                type="email"
                                placeholder="Correo electronico"
                                v-model.trim="reset.email"
                                style="display: none;"
                                addon-left-icon="ni ni-email-83">
                    </base-input>
                    <base-input alternative
                                class="mb-1"
                                type="password"
                                placeholder="Contraseña"
                                :valid="samePassword"
                                v-model.trim="reset.password"
                                addon-left-icon="ni ni-lock-circle-open">
                    </base-input>
                    <base-input alternative
                                class="mb-1"
                                type="password"
                                :valid="samePassword"
                                placeholder="Repita contraseña"
                                v-on:blur="comparaPassword"
                                v-model.trim="reset.confirmPassword"
                                addon-left-icon="ni ni-lock-circle-open">
                    </base-input>
                    <div class="text-center">
                        <base-button block type="primary" nativeType="submit" class="my-3" @click.prevent="onSubmit">
                          <!-- prevent evita la actuación predeterminada en submit button, junto al chequeo de email -->
                          Cambiar contraseña
                        </base-button>
                    </div>
                </form>
                <div v-if="messageAlert.errors || messageAlert.error" class="mb-0">
                  <base-alert :type="messageAlert.typeAlert" :dismissible="messageAlert.dismissible" v-on:dismiss-alert="quitAlert">
                      <span class="alert-inner--icon text-center d-block mr-0">
                        <i :class="messageAlert.icono"></i>
                      </span>
                      <span v-if="messageAlert.error" class="alert-inner--text text-center w-100"><strong>{{messageAlert.messageStrong}}</strong> {{messageAlert.error}} </span>
                      <span v-if="messageAlert.errors" class="alert-inner--text w-100">
                        <span class="alert-inner--text">
                          <strong>{{messageAlert.messageStrong}}</strong>
                          Se ha producido un problema en los siguientes campos:
                        </span>
                        <ul style="margin-bottom: 0rem;">
                          <li v-for="error in messageAlert.errors">{{ error }}</li>
                        </ul>
                      </span>
                      <button v-if="messageAlert.dismissible" type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </base-alert>
                </div>
            </template>
        </card>
    </div>
  </BloqueCentrado>
</template>
<script>
import BloqueCentrado from './components/BloqueCentrado'
import axios from 'axios'

export default {
  name: 'AccederCuenta',
  components: {
    BloqueCentrado
  },
  data () {
    return {
      messageAlert:{
        typeAlert: 'default',
        messageStrong: 'Default!',
        dismissible: false,
        icono: 'ni ni-like-2',
        errors : false,
        error: false
      },
      reset: {},
      samePassword: undefined
    }
  },
  props: {
    token: String
  },
  created () {
    axios({
      method:'get',
      url:'/api/auth/resetear/' + this.token,
      responseType:'json',
    })
    .then(response => {
      if(response.data.success === true){
        this.reset.email = response.data.email
        this.showMessage(false, '¡Adelante! ', 'success', undefined, response.data.msg, 'ni ni-like-2')
      } else { // Modificar esto para que sea capturado en el bloque catch no aqui
        this.showMessage(false, 'Lo sentimos ', 'danger', undefined, response.data.msg, 'ni ni-notification-70')
      }
    })
    .catch(e => {
      this.showMessage(false, 'Error ', 'warning', undefined, e.response.statusText, 'ni ni-notification-70')
    })
  },
  methods: {
    showMessage (dismissible, messageStrong, typeAlert, errorMessages, errorMessage, icono) {
      this.messageAlert = Object.assign({}, this.messageAlert, {
        typeAlert: typeAlert,
        messageStrong: messageStrong,
        dismissible: dismissible,
        icono: icono,
        errors : errorMessages,
        error: errorMessage
      })
    },
    onSubmit (evt) {
      if(Object.keys(this.reset).length !== 3){
        this.showMessage(false, 'Sugerencia ', 'default', undefined, 'Debe completar todos los campos', 'ni ni-notification-70')
      } else {
        axios({
          method:'post',
          url:'/api/auth/resetear/' + this.token,
          responseType:'json',
          data: this.reset
        })
        .then(response => {
          if(response.data.success === true){
            this.showMessage(false, 'Exito ', 'success', undefined, response.data.msg, 'ni ni-like-2')
          } else {
            this.showMessage(false, 'Atención ', 'warning', undefined, response.data.msg, 'ni ni-notification-70')
          }
        })
        .catch(e => {
          console.log(JSON.stringify(e));
          this.messageAlert.errors = []
          for(let error of e.response.data.errors) {
            console.log(JSON.stringify(error.msg));
            this.messageAlert.errors.push(error.msg)
          }
          console.log(JSON.stringify(this.messageAlert.errors));
          this.showMessage(false, 'Atención: ', 'danger', this.messageAlert.errors, undefined, 'ni ni-notification-70')
        })
      }
    },
    quitAlert () {
      this.error = undefined
    },
    comparaPassword () {
      if (this.reset.password !== this.reset.confirmPassword || !(this.reset.password || this.reset.confirmPassword))
        this.samePassword = false
      else
        this.samePassword = true
    }
  }
}
</script>
<style>
</style>
