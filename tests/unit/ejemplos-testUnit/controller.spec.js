import chai from 'chai'
const expect = chai.expect;
import sinon from 'sinon'
import indexPage from './app.controller.js'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised);

let user = {
  addUser: function (name) {
    return this.name = name;
  }
}

// This is just an async func that takes in a bool
// and calls a callback that returns a some message
// depending on the bool value
function someMadeUpAsyncFunc(boolValue, cb) {
  setTimeout(function() {
    cb(boolValue ? "You get a sweet :)" : "You get nothing!!")
  }, 0);
}

function someMadeUpPromiseAsyncFunc(boolValue, cb) {
  return new Promise(function(resolve){
    setTimeout(function() {
      resolve(boolValue ? "You get a sweet :)" : "You get nothing!!")
    }, 0);
  })
}

afterEach(() => {
  // Restore the default sandbox here
  sinon.restore();
})

// Added the `only` tag to have only this set of tests to run
describe("AsyncTest", function()  {
  it("should return `You get a sweet :)` if `true` is passed in", function(done) {
    someMadeUpAsyncFunc(true, function(sweetCheck){
      expect(sweetCheck).to.equal("You get a sweet :)");
      done();
    });
  });

  it("should return `You get nothing!!` if `false` is passed in", function(done) {
    someMadeUpAsyncFunc(false, function(sweetCheck){
      // Let's fail it on purpose just to see what happens
      expect(sweetCheck).to.equal("You get nothing!!");
      done();
    });
  });

  it("should return `You get a sweet :)` if `true` is passed in (promise)", function() {
    return expect(someMadeUpPromiseAsyncFunc(true)).to.eventually.equal("You get a sweet :)");
  });

  it("should return `You get nothing!!` if `false` is passed in (promise)", function() {
    return expect(someMadeUpPromiseAsyncFunc(false)).to.eventually.equal("You get nothing!!");
  });
});

describe.skip("AppController", function()  {
  describe("getIndexPage", function() {
    it("should send hey", function() {
      let req = {}
      // Have `res` have a send key with a function value coz we use `res.send()` in our func
      let res = {
        // replace empty function with a spy
        send: sinon.spy()
      }

      indexPage.getIndexPage(req, res)
      // let's see what we get on res.send
      // console.log(res.send);
      // `res.send` called once
      expect(res.send.calledOnce).to.be.true
      console.log(res.send.firstCall.args)
      expect(res.send.firstCall.args[0]).to.equal("Hey")
    })
  })

  describe("User", function() {
    describe("addUser", function() {
      it("should add a user", function() {
        sinon.spy(user, "addUser")
        user.addUser("John Doe")

        // lets log `addUser` and see what we get
        // console.log(user.addUser);
        expect(user.addUser.calledOnce).to.be.true
      })
    })
  })

  describe("getIndexPage", function() {
    it("should send hey when user is logged in 01", function() {
      user = {
        isLoggedIn: function(){}
      }

      // Stub isLoggedIn function and make it return true always
      const isLoggedInStub = sinon.stub(user, "isLoggedIn").returns(true);

      // declaracion de bloque req
      let req = {
        user: user
      }

      let res = {
        send: sinon.spy()
      }

      indexPage.getLema(req, res);
      expect(res.send.calledOnce).to.be.true;
      expect(res.send.firstCall.args[0]).to.equal("Yay");
      expect(isLoggedInStub.calledOnce).to.be.true;
    })

    it("should send something else when user is NOT logged in", function() {
      // instantiate a user object with an empty isLoggedIn function
      user = {
        isLoggedIn: function(){}
      }

      const isLoggedInStub = sinon.stub(user, "isLoggedIn").returns(false);

      let req = {
        user: user
      }

      let res = {
        send: sinon.spy()
      }

      indexPage.getLema(req, res);
      expect(res.send.calledOnce).to.be.true;
      expect(res.send.firstCall.args[0]).to.equal("Ooops. You need to log in to access this page");
      expect(isLoggedInStub.calledOnce).to.be.true;
    })

    it("should send hey when user is logged in 02", function() {
       user = {
         isLoggedIn: function(){}
       }

       const isLoggedInStub = sinon.stub(user, "isLoggedIn").returns(true);

       let req = {
         user: user
       }

       let res = {
         send: function(){}
       }

       // mock res
       const mock = sinon.mock(res);
       // build how we expect it work
       mock.expects("send").once().withExactArgs("Yay");

       indexPage.getLema(req, res);
       expect(isLoggedInStub.calledOnce).to.be.true;

       // verify that mock works as expected
       mock.verify();
   })
  })
})
