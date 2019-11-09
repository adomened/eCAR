// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.title('eCAR - Alquiler de vehiculos electricos')
      .assert.elementPresent('.bg-amarillo-huevo')
      .assert.containsText('h4', 'Bienvenido')
      .assert.elementCount('img', 8)
      .end()
  }
}
