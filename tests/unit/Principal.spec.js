import { expect } from 'chai'
import Principal from '@/views/Principal.vue'
import { shallowMount } from '@vue/test-utils'

describe.only('Pruebas basicas en Principal.vue', () => {
  const wrapper = shallowMount(Principal, {
    stubs: ['router-link', 'router-view', 'card', 'base-alert', 'base-input']
  })

  it('Se ha renderiza correctamente <section> principal', () => {
    expect(wrapper.html()).contain('<section class="bg-secundario border-top-default">')
  })
})
