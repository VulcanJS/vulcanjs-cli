<h1 align="center">
  <br>
    <img src="media/logo-plain.png" alt="vulcanjs-banner" width="200">
  <br>
  VulcanJS-cli
  <br>
</h1>

<h4 align="center">The official CLI scaffolding tool for <a href="http://vulcanjs.org/" target="_blank_" >VulcanJS</a>.</h4>

## Warning

This project is young. Use with caution. Always commit your code before using any program that modifies it.

Last tested on [Vulcan 1.14] (except for custom mutations and resolvers)

## Table of Contents

- [Warning](#warning)
- [Table of Contents](#table-of-contents)
- [Background](#background)
- [Install](#install)
- [Usage](#usage)
  - [Create](#create)
  - [Generate](#generate)
  - [Remove](#remove)
  - [List](#list)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Background

<a href="http://vulcanjs.org/" target="_blank_" >VulcanJS</a> is a full stack javascript framework, built on Meteor, React and GraphQL. If you aren't familiar with VulcanJS, we highly recommend that you check out the website and read the docs.

With this cli, you'll be able to easily generate `packages`, `modules`, `components`, and `routes` for your VulcanJS project.

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

- Generate Module

```sh
$ vulcan g module <packageName> <moduleName>
```

- Generate Component

```sh
$ vulcan g component <packageName> <moduleName> <componentName>
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

- Remove Module

```sh
$ vulcan remove module <packageName> <moduleName>
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

[@eric-burel](https://github.com/eric-burel)

## Contribute

See [CONTRIBUTE.md](./CONTRIBUTE.md)!

This package is in very low maintenance mode. If you encounter a bug or have a suggestion, feel free to open an issue, but we won't guarantee any fix.

PRs are always welcome however, even if incomplete or just a draft.

## License

MIT © 2017 Kerem Kazan
