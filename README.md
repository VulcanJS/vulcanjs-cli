<h1 align="center">
  <br>
    <img src="pics/logo-plain.png" alt="vulcanjs-banner" width="200">
  <br>
  VulcanJS-cli
  <br>
</h1>

<h4 align="center">The official CLI scaffolding tool for <a href="http://vulcanjs.org/" target="_blank_" >VulcanJS</a>.</h4>


## Warning

This tool is very new and is still under development. Use with caution. Always commit your code before using any program that modifies your code.

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
Create new app:

```sh
$ vulcanjs create <appName>
```

Generate new package:

```sh
$ vulcanjs g package <packageName>
```

Generate new model:

```sh
$ vulcanjs g model <packageName> <moduleName>
```

Generate new component:

```sh
$ vulcanjs g component <packageName> <moduleName> <componentName>
```

Generate new route:

```sh
$ vulcanjs g route <packageName> <routeName> <routePath>
```

Remove anything:
```sh
$ vulcanjs r package <packageName>
```

```sh
$ vulcanjs r module <packageName> <moduleName>
```

```sh
$ vulcanjs r route <packageName> <routeName> <routePath>
```

## Maintainers

[@mechanical-turk](https://github.com/mechanical-turk)

[@albancrommer](https://github.com/albancrommer)

[@SachaG](https://github.com/SachaG)

## Contribute

See [generator-vulcanjs](https://github.com/mechanical-turk/generator-vulcanjs)!

PRs are always welcome.

## License

MIT © 2017 Kerem Kazan
