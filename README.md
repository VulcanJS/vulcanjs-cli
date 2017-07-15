<h1 align="center">
  <br>
    <img src="media/logo-plain.png" alt="vulcanjs-banner" width="200">
  <br>
  VulcanJS-cli
  <br>
</h1>

<h4 align="center">The official CLI scaffolding tool for <a href="http://vulcanjs.org/" target="_blank_" >VulcanJS</a>.</h4>


## Warning

This tool is very new and is still under development. Use with caution. Always commit your code before using any program that modifies it.

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
$ vulcanjs create <appName>
```
![create app](./media/usage/create.gif)

### Generate
Generates a project component

- Generate Package
```sh
$ vulcanjs g package <packageName>
```
![generate package](./media/usage/generate-package.gif)

- Generate Model
```sh
$ vulcanjs g model <packageName> <modelName>
```
![generate model](./media/usage/generate-custom-model.gif)


- Generate Component
```sh
$ vulcanjs g component <packageName> <modelName> <componentName>
```
![generate component](./media/usage/generate-component.gif)

- Generate Route
```sh
$ vulcanjs g route <packageName> <routeName> <routePath>
```
![generate route](./media/usage/generate-route.gif)

### Remove

- Remove Package
```sh
$ vulcanjs remove package <packageName>
```
![remove package](./media/usage/remove-package.gif)

- Remove Model
```sh
$ vulcanjs remove model <packageName> <modelName>
```
![remove model](./media/usage/remove-model.gif)

### List

- List Packages
```sh
$ vulcanjs list packages
```
![list package](./media/usage/list-packages.gif)

- List Routes
```sh
$ vulcanjs list routes
```
![list routes](./media/usage/list-routes.gif)


## Maintainers

[@mechanical-turk](https://github.com/mechanical-turk)

[@albancrommer](https://github.com/albancrommer)

[@SachaG](https://github.com/SachaG)

## Contribute

See [CONTRIBUTE.md](./CONTRIBUTE.md)!

PRs are always welcome.

## License

MIT © 2017 Kerem Kazan
