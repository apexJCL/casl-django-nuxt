'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var index = 1;

var CASLRouteParser = function () {
  /**
   * Parses current Vue Router routes and generates CASL Rules for use with casl-django
   *
   * @param routes - Vue Router routes
   * @param subject - CASL Subject
   * @param model - Django model, by default is 'casl-django'
   * @param initialPK - Initial PK value
   * @param format {string} - Format of the output string, by default is json
   */
  function CASLRouteParser(_ref) {
    var _ref$routes = _ref.routes,
        routes = _ref$routes === undefined ? null : _ref$routes,
        _ref$subject = _ref.subject,
        subject = _ref$subject === undefined ? ['navigate'] : _ref$subject,
        _ref$model = _ref.model,
        model = _ref$model === undefined ? 'authentication.Rule' : _ref$model,
        _ref$initialPK = _ref.initialPK,
        initialPK = _ref$initialPK === undefined ? 1 : _ref$initialPK,
        _ref$format = _ref.format,
        format = _ref$format === undefined ? 'json' : _ref$format;

    _classCallCheck(this, CASLRouteParser);

    if (!routes) {
      throw Error('Routes must be specified');
    }
    this.routes = routes;
    this.subject = subject;
    this.model = model;
    index = initialPK;
    this.format = format;
    this.parsedRoutes = [];
    this.output = '';
  }

  /**
   * Converts all the Vue Router routes to
   * CASL rule actions
   *
   */


  _createClass(CASLRouteParser, [{
    key: 'parse',
    value: function parse() {
      var cls = this;
      var routeNames = [];
      cls.routes.map(function (route) {
        if (route.hasOwnProperty('children')) {
          return routeNames.push(cls._parseChildren(route));
        }
        routeNames.push(route.name);
      });
      cls.parsedRoutes = routeNames;
      if (cls.format === 'json') {
        return cls.jsonFormat();
      }
      return null;
    }

    /**
     * Parses the rules and returns a JSON string
     *
     * @return {string} - JSON string
     */

  }, {
    key: 'jsonFormat',
    value: function jsonFormat() {
      var rules = this.ruleFormat(this.parsedRoutes);
      this.output = JSON.stringify(rules);
      return this.output;
    }
  }, {
    key: 'ruleFormat',
    value: function ruleFormat(routes) {
      var cls = this;
      var rules = [];

      // If the last we receive it's a plain string
      if (!(routes instanceof Array)) {
        rules.push(cls.generateRule(routes));
        index += 1;
        return rules;
      }

      // If it's an array
      routes.map(function (route) {
        rules = rules.concat(cls.ruleFormat(route));
      });

      return rules;
    }

    /**
     * Generates a rule given the name and current PK value
     *
     * @param name
     * @return {{model: (string|*), pk: *, fields: {subject: (string|*), action: *}}}
     */

  }, {
    key: 'generateRule',
    value: function generateRule(name) {
      return {
        model: this.model,
        pk: index,
        fields: {
          subject: this.subject,
          action: name
        }
      };
    }

    /**
     * Parses the children routes of Vue Router to
     * obtain all the names
     * @param route
     * @private
     */

  }, {
    key: '_parseChildren',
    value: function _parseChildren(route) {
      var cls = this;
      var subRoutes = [];

      if (!route.hasOwnProperty('children')) {
        return route.name;
      }

      route.children.map(function (child) {
        // The child has more children routes
        subRoutes.push(cls._parseChildren(child));
      });
      return subRoutes;
    }
  }]);

  return CASLRouteParser;
}();

exports.default = CASLRouteParser;