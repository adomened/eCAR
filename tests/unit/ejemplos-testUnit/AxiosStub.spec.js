import chai from 'chai'
import sinon from 'sinon'
// import indexPage from './app.controller.js'
import chaiAsPromised from 'chai-as-promised'
import { shallowMount } from '@vue/test-utils'
import Test from '@/views/Test.vue'
import Axios from 'axios'

chai.use(chaiAsPromised)

const expect = chai.expect

// const Axios = {
//   get: function(){}
// }

afterEach(() => {
  // Restore the default sandbox here
  sinon.restore()
})

describe('Foo', () => {
  // it('fetches async when a button is clicked - 01', (done) => {
  //
  //   // let axiosGetStub = sinon.stub(Axios, 'get').returns(Promise.resolve({ data: 'value' }))
  //   let axiosGetStub = sinon.stub(Axios, 'get').callsFake(function () { return Promise.resolve({ data: 'value' }) })
  //
  //   let wrapper = shallowMount(Test, { stubs: ['router-link', 'router-view'] })
  //
  //   wrapper.find('button.butt').trigger('click')
  //   wrapper.vm.$nextTick(() => {
  //     expect(axiosGetStub.calledOnce).to.be.true
  //     expect(wrapper.vm.value).to.equal('value')
  //     // console.log(axiosGetStub)
  //     done()
  //   })
  // })

  it('fetches async when a button is clicked - 02', () => {
    let axiosGetStub = sinon.stub(Axios, 'get').returns(Promise.resolve({ data: 'value' }))

    let wrapper = shallowMount(Test, { stubs: ['router-link', 'router-view'] })

    wrapper.find('button.butt').trigger('click')

    // return expect(axiosGetStub.firstCall.returnValue).to.eventually.equal({data: 'value'})

    // Error: Resolution method is overspecified. Specify a callback *or* return a Promise; not both.
    // return expect(axiosGetStub.firstCall.returnValue).to.become({data: 'value'}).notify(done)

    // return expect(axiosGetStub.firstCall.returnValue).to.become({ data: 'value' })
    // Lo de arriba es exactamente igual que lo abajo ( https://github.com/domenic/chai-as-promised )
    return expect(axiosGetStub.firstCall.returnValue).to.eventually.deep.equal({ data: 'value' })
  })
})

/*
HACER ESTO MISMO CON MOCKS (SINONJS)

La API de chai en la interfaz expect (Chai as promised extiende esta interfaz para el manejo de promesas).
La API de sinon: spies, stubs y mocks
*/
