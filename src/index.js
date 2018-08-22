export default class CASLRouteParser {
  /**
   * Parses current Vue Router routes and generates CASL Rules for use with casl-django
   *
   * @param routes - Vue Router routes
   * @param subject - CASL Subject
   * @param model - Django model, by default is 'casl-django'
   * @param initialPK - Initial PK value
   * @param format {string} - Format of the output string, by default is json
   */
  constructor ({routes = null, subject = 'navigate', model = 'casl_django.CASLPermission', initialPK = 0, format = 'json'}) {
    if (!routes) {
      throw Error('Routes must be specified')
    }
    this.routes = routes
    this.subject = subject
    this.model = model
    this.initialPK = initialPK
    this.format = format
    this.parsedRoutes = []
    this.output = ''
  }

  /**
   * Converts all the Vue Router routes to
   * CASL rule actions
   *
   */
  parse () {
    const cls = this
    const routeNames = []
    cls.routes.map((route) => {
      if (route.hasOwnProperty('children')) {
        return routeNames.push(cls._parseChildren(route))
      }
      routeNames.push(route.name)
    })
    cls.parsedRoutes = routeNames
    if (cls.format === 'json') {
      return cls.jsonFormat()
    }
    return null
  }

  /**
   * Parses the rules and returns a JSON string
   *
   * @return {string} - JSON string
   */
  jsonFormat () {
    const rules = this.ruleFormat(
      this.parsedRoutes,
      this.initialPK
    )
    this.output = JSON.stringify(rules)
    return this.output
  }

  ruleFormat (routes, initialPK) {
    const cls = this
    let rules = []
    let currentIndex = initialPK

    // If the last we receive it's a plain string

    if (!(routes instanceof Array)) {
      rules.push(cls.generateRule(routes, currentIndex))
      return rules
    }

    // If it's an array

    routes.map((route) => {
      if (route instanceof Array) {
        rules = rules.concat(
          cls.ruleFormat(route, currentIndex)
        )
        currentIndex += route.length
        return
      }
      // Generate rule
      rules.push(cls.generateRule(
        route,
        currentIndex
      ))
      currentIndex += 1
    })
    return rules
  }

  /**
   * Generates a rule given the name and current PK value
   *
   * @param name
   * @param pk
   * @return {{model: (string|*), pk: *, fields: {subject: (string|*), action: *}}}
   */
  generateRule (name, pk) {
    return {
      model: this.model,
      pk: pk,
      fields: {
        subject: this.subject,
        action: name
      }
    }
  }

  /**
   * Parses the children routes of Vue Router to
   * obtain all the names
   * @param route
   * @private
   */
  _parseChildren (route) {
    const cls = this
    const subroutes = []

    if (!route.hasOwnProperty('children')) {
      return route.name
    }

    route.children.map((child) => {
      // The child has more children routes
      subroutes.push(cls._parseChildren(child))
    })
    return subroutes
  }
}
