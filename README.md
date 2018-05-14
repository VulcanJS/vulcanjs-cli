<h1 align="center">
  <br>
    <img src="media/logo-plain.png" alt="vulcanjs-banner" width="200">
  <br>
  VulcanJS-cli
  <br>
</h1>

<h4 align="center">The official CLI scaffolding tool for <a href="http://vulcanjs.org/" target="_blank_" >VulcanJS</a>.</h4>


## Warning

This tool is not maintained anymore, and does not work with the later versions of VulcanJS.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Background
<a href="http://vulcanjs.org/" target="_blank_" >VulcanJS</a> is a full stack javascript framework, built on Meteor, React and GraphQL. If you aren't familiar with VulcanJS, we highly recommend that you check out the website and read the docs.

With this cli, you'll be able to easily generate `packages`, `models`, `components`, and `routes` for your VulcanJS project.

## Install

Npm:
```sh
$ npm install -g vulcanjs-cli
```

Yarn:
```sh
$ yarn global add vulcanjs-cli
```


## Usage
### Create
Creates a new project with the given app name:
```sh
$ vulcan create <appName>
```

### Generate
Generates a project component

- Generate Package
```sh
$ vulcan g package <packageName>
```

- Generate Model
```sh
$ vulcan g model <packageName> <modelName>
```

- Generate Component
```sh
$ vulcan g component <packageName> <modelName> <componentName>
```

- Generate Route
```sh
$ vulcan g route <packageName> <routeName> <routePath>
```

### Remove

- Remove Package
```sh
$ vulcan remove package <packageName>
```

- Remove Model
```sh
$ vulcan remove model <packageName> <modelName>
```

### List

- List Packages
```sh
$ vulcan list packages
```

- List Routes
```sh
$ vulcan list routes
```


## Maintainers

[@mechanical-turk](https://github.com/mechanical-turk)

[@albancrommer](https://github.com/albancrommer)

[@SachaG](https://github.com/SachaG)

## Contribute

See [CONTRIBUTE.md](./CONTRIBUTE.md)!

PRs are always welcome.

## License

MIT © 2017 Kerem Kazan
