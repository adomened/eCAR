import { expect } from 'chai'
import sinon from 'sinon'

// import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
// import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
// import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import { shallowMount } from '@vue/test-utils'
import Test from '@/views/Test.vue'

// import VueRouter from 'vue-router'
// const localVue = createLocalVue()
// localVue.use(VueRouter)
// const router = new VueRouter()
// const RouterLink = localVue.component('router-link');

/* NOTE: Ver ejemplos de uso de nextTick */

const $route = {
  path: '/',
  hash: '',
  params: { id: '123' },
  query: { q: 'hello' }
}

describe('Estoy aprediendo a usar Mocha, Chai (con sinon) y la integracion con Vue test utils 👴🏿', () => {
  /*
  Now mount the component and you have the wrapper;
  Vue Test Utils allows you to mount a component without rendering its child
   components with the shallowMount method:
  */
  const wrapper = shallowMount(Test, {
    /* Sobrescribe componentes adheridos/registrados globalmente y localmente; Al menos,
    cuando se indican asi, no son copias del componente y por tanto no contienen
    su funcionalidad, solo es un compoenete 'tonto' que va ocupar el lugar del compoente dado
    para que no se note su ausencia */
    stubs: ['router-link', 'router-view'],
    propsData: {
      slug: 'test'
    },
    mocks: {
      // adds mocked `$route` object to the Vue instance
      // before mounting component
      $route
    }
    // localVue,
    // router,
    // stubs: {
    //   RouterLink: RouterLinkStub
    // }
  })

  wrapper.vm.$emit('foo') // Emite un custom event 'foo'
  wrapper.vm.$emit('foo', 123) // Emite un custom event 'foo' con un valor de 123
  wrapper.setData({ count: 10 }) // Manipulating Component State
  // wrapper.setProps({ foo: 'bar' }) // Manipulating Component State (te dice que el compoente no tiene ningun prop definido como foo)

  it('renders the correct markup', () => {
    // console.log(wrapper)
    // console.log(wrapper.html())
    expect(wrapper.html()).contain('<h2 class="mt-5">Goal</h2>')
  })

  // it's also easy to check for the existence of elements
  it('has a router-link', () => {
    // const routerLink = wrapper.find(RouterLink)
    // console.log(wrapper.is('div'))
    // console.log(routerLink);
    // expect(wrapper.is('div')).to.be.true
    // console.log(wrapper.find(RouterLink).text());
    // expect(wrapper.contains(RouterLink)).to.be.true
    // expect(wrapper.contains('router-link')).toBe(true)
    // console.log(wrapper.find(RouterLinkStub).props().to)

    // console.log(wrapper.html())
    // console.log(wrapper.find('router-link-stub').text())
    // console.log(wrapper.find('router-link-stub').props())
    // console.log(wrapper.find('router-link-stub').classes())
    expect(wrapper.find('router-link-stub').text()).to.equal('Alquilar')

    // RouterLinkStub Tiene una implementacion mas completa y por eso props decuelve algo mas que {}
    // console.log(wrapper.find(RouterLinkStub).text())
    // expect(wrapper.find(RouterLinkStub).props().to).to.equal('/geolocation')
  })

  it('probando el metodo Emitted de wrapper 01', function () {
    // assert event has been emitted
    // console.log(wrapper.emitted().foo)
    /* [[], [123]] == true (not strictly equal) */
    expect(wrapper.emitted().foo).to.be.ok
  })

  it('probando el metodo Emitted de wrapper 02', function () {
    // assert event count
    // expect(wrapper.emitted().foo.length).to.equal(2)
    /*
    .equal accepts an optional msg argument which is a custom error message to
    show when the assertion fails. The message can also be given as the second
    argument to expect.
    */
    expect(wrapper.emitted().foo.length).to.equal(2, 'nooo why fail??')
  })

  it('probando el metodo Emitted de wrapper 03', function () {
    // assert event payload
    expect(wrapper.emitted().foo[1]).to.deep.equal([123])
  })

  it('probando el metodo props de wrapper 01', function () {
    expect(wrapper.props().slug).to.equal('test')
  })

  it('probando el metodo props de wrapper 02', function () {
    expect(wrapper.props('slug')).to.equal('test')
  })

  it('probando el metodo props de wrapper 02', function () {
    // console.log(wrapper.vm.count)
    expect(wrapper.vm.count).to.equal(10)
  })

  it('Mounting Options', function () {
    expect(wrapper.vm.$route.params.id).to.equal('123')
  })

  it('button click should increment the count', function () {
    expect(wrapper.vm.count).to.equal(10)
    const button = wrapper.find('button')
    /* The trigger method takes an optional options object. The properties in
    the options object are added to the Event. */
    button.trigger('click', { button: 0 })
    // console.log(wrapper.emitted());
    expect(wrapper.vm.count).to.equal(11)
  })

  it('Quantity is zero by default', () => {
    expect(wrapper.vm.quantity).to.equal(0)
  })

  it('Cursor up sets quantity to 1', () => {
    const input = wrapper.find('input')
    input.trigger('keydown.up')
    expect(wrapper.vm.quantity).to.equal(1)
  })

  it('Magic character "a" sets quantity to 13', () => {
    const input = wrapper.find('input')
    input.trigger('keydown', {
      which: 65
    })
    expect(wrapper.vm.quantity).to.equal(13)
  })

  it('Cursor down reduce quantity by 1', () => {
    const input = wrapper.find('input')
    // input.element.focus()
    input.trigger('focus')
    wrapper.vm.quantity = 5
    input.trigger('keydown.down')
    console.log(wrapper.emitted());
    expect(wrapper.vm.quantity).to.equal(4)
  })

  it('Escape sets quantity to 0', () => {
    const input = wrapper.find('input')
    wrapper.vm.quantity = 5
    input.trigger('keydown.esc')
    expect(wrapper.vm.quantity).to.equal(0)
  })

  it('button click should increment quantity', function () {
    wrapper.vm.quantity = 0
    const button = wrapper.find('button.boton')
    button.trigger('click')
    console.log(wrapper.vm.quantity);
    expect(wrapper.vm.quantity).to.equal(1)
  })
})

// const vm = wrapper.vm
// console.log(wrapper)
// console.log(vm)

// Contenido original de HelloWorld.spec.js

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).to.include(msg)
//   })
// })
