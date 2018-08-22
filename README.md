# casl-django-nuxt module
[![npm (scoped with tag)](https://img.shields.io/npm/v/casl-django-nuxt-module/latest.svg?style=flat-square)](https://npmjs.com/package/casl-django-nuxt)
[![npm](https://img.shields.io/npm/dt/casl-django-nuxt.svg?style=flat-square)](https://npmjs.com/package/casl-django-nuxt)
[![CircleCI](https://img.shields.io/circleci/project/github/apexJCL/casl-django-nuxt.svg?style=flat-square)](https://circleci.com/gh/apexJCL/casl-django-nuxt)
[![Codecov](https://img.shields.io/codecov/c/github/apexJCL/casl-django-nuxt.svg?style=flat-square)](https://codecov.io/gh/apexJCL/casl-django-nuxt)
[![Dependencies](https://david-dm.org/apexJCL/casl-django-nuxt/status.svg?style=flat-square)](https://david-dm.org/apexJCL/casl-django-nuxt)
[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)

> Generate CASL rules for navigation based on nuxt routes.
> To be used with casl-django

[📖 **Release Notes**](./CHANGELOG.md)

## Features

The module features autogeneration of default navigation routes, creating a json fixture that you can load
in your django project to get going with default rules you can assign to your users.

## Setup
- Add `casl-django-nuxt` dependency using yarn or npm to your project
- Add `casl-django-nuxt` to `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    'casl-django-nuxt',

    // With options
    ['casl-django-nuxt', { /* module options */ }],
 ]
}
```

## Usage

+ Add `casl-django-nuxt` to your `modules`

```js
{
  modules: [
    'casl-django-nuxt',
    // Or with more options
    [
      'casl-django-nuxt', 
      {
        initialPK: 12,
        model: 'myApp.CustomPermissionModel',
        subject: 'myNavSubject'
      }
    ]
  ]
}
```

## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) José Carlos López <carlos@nopalcreativa.com>
