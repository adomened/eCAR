<template>
  <BloqueCentrado :height="height">
    <template slot="redes-sociales">
        <div class="text-muted text-center mb-1">
            <small class="font-weight-bold">Registrese con</small>
        </div>
        <div class="btn-wrapper text-center my-2 mb-2">
            <base-button type="neutral">
                <img slot="icon" src="img/icons/common/github.svg">
                Github
            </base-button>
            <base-button type="neutral">
                <img slot="icon" src="img/icons/common/google.svg">
                Google
            </base-button>
        </div>
    </template>

    <template slot="credenciales">
        <div class="text-center mb-2">
          <div class="row mt-3">
            <div class="col d-flex justify-content-center">
              <svg class="d-block" xmlns="http://www.w3.org/2000/svg" width="80px" height="100%" viewBox="0 0 160 160"><path d="M73.956 157.433c-26.266-1.809-49.127-15.911-62.358-38.469-1.62-2.762-4.85-9.416-4.845-9.984 0-.063.177-.217.391-.342.215-.126 1.287-.804 2.382-1.507 1.095-.703 4.967-3.166 8.605-5.474 57.956-36.774 99.532-63.197 99.703-63.363.188-.184.123-.291-.57-.932-6.578-6.092-15.598-10.901-24.747-13.193-4.894-1.226-8.468-1.637-14.152-1.629-4.633.007-6.666.184-10.667.93-17.063 3.178-32.12 14.333-40.188 29.773-4.211 8.058-6.39 16.486-6.615 25.597l-.067 2.687-9.205 5.67c-5.062 3.117-9.249 5.668-9.303 5.668-.146 0-.224-.334-.464-1.99-.544-3.762-.707-6.302-.703-10.953.004-5.936.404-10.047 1.492-15.36 3.575-17.456 12.78-32.849 26.481-44.285 7.096-5.924 15.656-10.703 24.64-13.757 24.001-8.16 50.602-4.01 71.037 11.08 7.013 5.178 13.48 11.954 18.353 19.227 1.005 1.5 2.962 4.747 3.62 6.007l.427.815-.354.251c-.357.254-5.118 3.283-36.838 23.435-58.277 37.024-64.123 40.737-70.973 45.081-2.933 1.86-5.39 3.436-5.46 3.5-.187.172.093.543 2.116 2.81 12.146 13.615 30.556 20.661 48.923 18.726 16.821-1.772 32.055-10.887 41.595-24.888 4.378-6.425 7.561-14.104 8.962-21.619.738-3.964.92-6.04.928-10.596.008-4.615-.114-6.275-.726-9.814a183.368 183.368 0 0 1-.38-2.248c-.014-.106 3.712-2.422 8.645-5.373 4.768-2.853 8.783-5.29 8.922-5.415.234-.213.263-.2.41.181.339.881 1.563 5.988 1.978 8.257 3.924 21.425-1.289 43.457-14.38 60.779-12.283 16.254-30.508 27.07-50.543 29.995-4.901.716-11.715 1.022-16.072.722z" fill="#2dce89" stroke-miterlimit="5" stroke-dasharray="0,1.56452271"/></svg>
            </div>
            <div class="col-12">
              <h3 class="font-weight-light text-success">Registrese</h3>
              <!-- Registrese con credenciales -->
            </div>
          </div>
        </div>
        <form role="form">
            <base-input alternative
                        class="mb-1"
                        type="email"
                        placeholder="Correo electronico"
                        autocomplete="username email"
                        v-model.trim="register.email"
                        addon-left-icon="ni ni-email-83">
            </base-input>
            <base-input alternative
                        class="mb-1"
                        type="password"
                        placeholder="Contraseña"
                        autocomplete="new-password"
                        :valid="samePassword"
                        v-model.trim="register.password"
                        addon-left-icon="ni ni-lock-circle-open">
            </base-input>
            <base-input alternative
                        class="mb-1"
                        type="password"
                        :valid="samePassword"
                        placeholder="Repita contraseña"
                        autocomplete="new-password"
                        v-on:blur="comparaPassword"
                        v-model.trim="register.confirmPassword"
                        addon-left-icon="ni ni-lock-circle-open">
            </base-input>
            <base-checkbox v-model="register.privacidad" @input="register.privacidad=$event">
                <span>Acepto la
                    <router-link :to="{ name: 'politicas', params: { politica: 'privacidad' }}">Politica de privacidad</router-link>
                </span>
            </base-checkbox>
            <div class="text-center">
                <base-button block type="success" nativeType="submit" class="my-3" @click.prevent="onSubmit">
                  <!-- prevent evita la actuación predeterminada en submit button, junto al chequeo de email -->
                  Crear cuenta
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
  </BloqueCentrado>
</template>
<script>
/*
Al crear una cuenta estás aceptando el Acepto los términos y condiciones de AliExpress.com y Política de Privacidad
*/

import BloqueCentrado from './components/BloqueCentrado'
import axios from 'axios'

export default {
  name: 'Register',
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
      register: {
        privacidad: false
      },
      samePassword: undefined,
      height: 625
    }
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
      if(Object.keys(this.register).length !== 4){
        this.showMessage(false, 'Información ', 'default', undefined, 'Debe completar todos los campos', 'ni ni-notification-70')
      } else {
        axios({
          method:'post',
          url:'/api/auth/register',
          responseType:'json',
          data: this.register
        })
        .then(response => {
          if(response.data.success === true){
            this.showMessage(false, '¡Gracias! ', 'success', undefined, response.data.msg, 'ni ni-like-2')
          } else {
            this.height += 100
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
          this.height += 150
          this.showMessage(false, 'Atención ', 'danger', this.messageAlert.errors, undefined, 'ni ni-notification-70')
        })
      }
    },
    quitAlert () {
      this.error = undefined
    },
    comparaPassword () {
      if (this.register.password !== this.register.confirmPassword || !(this.register.password || this.register.confirmPassword))
        this.samePassword = false
      else
        this.samePassword = true
    }
  }
}
</script>
<style>
</style>
