import chai from 'chai'
import sinon from 'sinon'
import chaiAsPromised from 'chai-as-promised'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Test from '@/views/Test.vue'
import Axios from 'axios'

chai.use(chaiAsPromised)

const expect = chai.expect

afterEach(() => {
  // Restore the default sandbox here
  sinon.restore()
})

describe('Foo', () => {
  // it('fetches async when a button is clicked - 01 (mocks)', (done) => {
  //   let axios = {
  //     get: function () { return Promise.resolve({ data: 'value' }) }
  //   }
  //   // const localVue = createLocalVue()
  //   // localVue.use(axios)
  //   // let wrapper = shallowMount(Test, { stubs: ['router-link', 'router-view'], localVue })
  //   // console.log(Axios);
  //   let mock = sinon.mock(Axios)
  //   // console.log(mock);
  //   let expectation = mock.expects('get')
  //   expectation.once().withExactArgs('mock/service')
  //       .callsFake(function () { return Promise.resolve({ data: 'value' }) })
  //   // console.log(expectation);
  //   let wrapper = shallowMount(Test, { stubs: ['router-link', 'router-view'] })
  //   wrapper.find('button.butt').trigger('click')
  //   // wrapper.vm.fetchResults()
  //   wrapper.vm.$nextTick(function () {
  //     expect(wrapper.vm.value).to.equal('value')
  //     mock.verify()
  //     done()
  //   })
  // })

  it('should send hey when user is logged in 02', function () {
    let wrapper = shallowMount(Test, { stubs: ['router-link', 'router-view'] })

    let user = {
      isLoggedIn: function () {}
    }

    const isLoggedInStub = sinon.stub(user, 'isLoggedIn').returns(true)

    let req = {
      user: user
    }

    let res = {
      send: function () {}
    }

    // mock res
    let mock = sinon.mock(res)
    // build how we expect it work
    mock.expects('send').once().withExactArgs('Yay')
    wrapper.vm.req = req
    wrapper.vm.res = res
    wrapper.vm.getMessages()
    expect(isLoggedInStub.calledOnce).to.be.true

    // verify that mock works as expected
    mock.verify()
  })
})

/*
HACER ESTO MISMO CON MOCKS (SINONJS)

La API de chai en la interfaz expect (Chai as promised extiende esta interfaz para el manejo de promesas).
La API de sinon: spies, stubs y mocks
*/
