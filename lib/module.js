const {resolve} = require('path')
const caslDjango = require(resolve(__dirname, './casl-django'))

module.exports = async function module (moduleOptions) {
  const _options = Object.assign({}, this.options.caslDjango, moduleOptions)

  const options = Object.assign({
    initialPK: 1,
    model: 'authentication.Rule',
    subject: ['navigation']
  }, _options)

  let rules = ''

  this.nuxt.hook('build:extendRoutes', async (routes, resolve) => {
    const parser = new caslDjango.default({ // eslint-disable-line
      routes: routes,
      ...options
    })
    rules = parser.parse()
  })

  this.options.build.plugins.push({
    apply (compiler) {
      // Hello
      compiler.hooks.emit.tap('emit', (compilation) => {
        compilation.assets['rules.json'] = {source: () => rules, size: () => rules.length}
      })
    }
  })
}
