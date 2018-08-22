# Implementation opinion

## Routing

As it is, this module generates the default rules to allow/restrict user navigation on the app.

You can implement a navigation guard as following:

`plugins/casl.js`
```js
import Vue from 'vue'
import {abilitiesPlugin} from '@casl/vue'
import defaultAbilities from './../casl'

Vue.use(abilitiesPlugin, defaultAbilities)

export default ({app, store}, inject) => {
  app.$can = defaultAbilities.can
  app.$abilities = defaultAbilities

  app.router.beforeEach((to, from, next) => {
    next(defaultAbilities.can(to.name, 'navigate'))
  })
}
```

And in your default definition file:
`casl/index.js`
```js
import {Ability} from '@casl/ability'

let defaultRules = [
  {
    subject: 'navigate',
    actions: ['index', 'login']
  }
]

let _localData = localStorage.getItem('vuex-persistedstate')

if (_localData !== '' && _localData !== null && _localData !== undefined) {
  const parsedData = JSON.parse(_localData)
  defaultRules = parsedData['casl']['rules']
}

const ability = new Ability(defaultRules)

export {
  ability as default
}
```

This way, you have your rules persisted on localStorage and load them when the plugin loads.
