const caslDjango = require('./../casl-django')

module.exports = async function module (moduleOptions) {
  const _options = Object.assign({}, this.options.caslDjango, moduleOptions)

  const options = Object.assign({
    initialPK: 0,
    model: 'casl_django.CASLPermission',
    subject: 'navigation'
  }, _options)

  let rules = ''

  this.nuxt.hook('build:extendRoutes', async (routes, resolve) => {
    const parser = new caslDjango.default({
      routes: routes,
      ...options
    })
    rules = parser.parse()
  })

  this.options.build.plugins.push({
    apply (compiler) {
      compiler.plugin('emit', (compilation, cb) => {
        compilation.assets['rules.json'] = {source: () => rules, size: () => rules.length}
        cb()
      })
    }
  })
}
