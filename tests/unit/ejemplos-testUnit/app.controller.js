exports.getIndexPage = function (req, res) {
  res.send("Hey");
}

// A func that takes in two parameters `req` and `res` [request, response]
exports.getLema = function (req, res) {
  if (req.user.isLoggedIn()) {
    return res.send("Yay");
  }
  res.send("Ooops. You need to log in to access this page");
}

// exports.get = function () {
//   Promise.resolve({ data: 'value'})
// }
