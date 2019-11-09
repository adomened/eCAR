import { expect } from 'chai'
import InicioSesion from '@/views/InicioSesion.vue'
import { shallowMount } from '@vue/test-utils'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseAlert from '@/components/BaseAlert.vue'
import Card from '@/components/Card.vue'
import moxios from 'moxios'

describe.only('Pruebas basicas en InicioSesion.vue', () => {
  let wrapper
  beforeEach(() => {
    moxios.install()

    wrapper = shallowMount(InicioSesion, {
      stubs: {
        'base-button': BaseButton,
        'base-input': BaseInput,
        'card': Card,
        'base-alert': BaseAlert
      }
    })
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('Fallo en la autenticacion 01', (done) => {
    wrapper.vm.login = {
      email: 'lagarto@lomo.es',
      password: '123456'
    }

    moxios.stubRequest('/api/auth/login', {
      status: 401,
      response: {
        msg: 'error en la autenticacion'
      }
    })

    wrapper.find('#onSubmit').trigger('click')

    moxios.wait(function () {
      expect(wrapper.vm.messageAlert.error).to.equal('error en la autenticacion')
      done()
    })
  })

  it('Fallo en la autenticacion 02', () => {
    wrapper.vm.login = {
      email: 'lagarto@lomo.es'
    }

    wrapper.find('#onSubmit').trigger('click')

    expect(wrapper.vm.messageAlert.error).to.equal('Debe introducir tanto email como contraseña')
  })
})
