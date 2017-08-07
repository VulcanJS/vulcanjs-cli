#!/usr/bin/env node
'use strict';

var yeoman = require('yeoman-environment');
var parseArgs = require('minimist');

var argsManager = require('./argsManager');

var appGenerator = require.resolve('./generator-vulcanjs/generators/app');
var packageGenerator = require.resolve('./generator-vulcanjs/generators/package');
var modelGenerator = require.resolve('./generator-vulcanjs/generators/model');
var componentGenerator = require.resolve('./generator-vulcanjs/generators/component');
var routeGenerator = require.resolve('./generator-vulcanjs/generators/route');
var remover = require.resolve('./generator-vulcanjs/generators/remove');
var lister = require.resolve('./generator-vulcanjs/generators/list');
var _init = require.resolve('./generator-vulcanjs/generators/init');
var _unshallow = require.resolve('./generator-vulcanjs/generators/unshallow');

var env = yeoman.createEnv();

function runWithOptions(generator, extraOptions, callback) {
  var optionsForGenerators = parseArgs(process.argv.slice(2));
  var finalOptions = {};
  Object.assign(finalOptions, optionsForGenerators, extraOptions);
  return env.run(generator, finalOptions, callback);
}

var action = argsManager.getAction();

var componentNamesToGeneratorRegisters = {
  package: function _package() {
    env.register(packageGenerator, 'package');
  },
  app: function app() {
    env.register(appGenerator, 'app');
  },
  model: function model() {
    env.register(modelGenerator, 'model');
  },
  component: function component() {
    env.register(componentGenerator, 'component');
  },
  route: function route() {
    env.register(routeGenerator, 'route');
  },
  remove: function remove() {
    env.register(remover, 'remove');
  },
  list: function list() {
    env.register(lister, 'list');
  },
  init: function init() {
    env.register(_init, 'init');
  },
  unshallow: function unshallow() {
    env.register(_unshallow, 'unshallow');
  }
};

function registerGenerator(componentName) {
  var registerFn = componentNamesToGeneratorRegisters[componentName];
  registerFn();
}

function run() {
  if (action.type === 'generate') {
    if (action.component === 'package') {
      registerGenerator('package');
      return runWithOptions('package', {
        packageName: action.args[0]
      });
    } else if (action.component === 'model') {
      registerGenerator('model');
      return runWithOptions('model', {
        packageName: action.args[0],
        modelName: action.args[1]
      });
    } else if (action.component === 'component') {
      registerGenerator('component');
      return runWithOptions('component', {
        packageName: action.args[0],
        modelName: action.args[1],
        componentName: action.args[2]
      });
    } else if (action.component === 'route') {
      registerGenerator('route');
      return runWithOptions('route', {
        packageName: action.args[0],
        routeName: action.args[1],
        routePath: action.args[2],
        componentName: action.args[3],
        layoutName: action.args[4]
      });
    }
  } else if (action.type === 'remove') {
    registerGenerator('remove');
    if (action.component === 'package') {
      return runWithOptions('remove', {
        vulcanjsComponent: 'package',
        packageName: action.args[0]
      });
    } else if (action.component === 'model') {
      return runWithOptions('remove', {
        vulcanjsComponent: 'model',
        packageName: action.args[0],
        modelName: action.args[1]
      });
    } else if (action.component === 'route') {
      return runWithOptions('remove', {
        vulcanjsComponent: 'route',
        packageName: action.args[0],
        routeName: action.args[1]
      });
    }
    return runWithOptions('remove');
  } else if (action.type === 'create') {
    registerGenerator('app');
    return runWithOptions('app', {
      appName: action.args[0]
    });
  } else if (action.type === 'list') {
    registerGenerator('list');
    return runWithOptions('list', {
      vulcanjsComponent: action.component,
      packageName: action.args[0]
    });
  } else if (action.type === 'init') {
    registerGenerator('init');
    return runWithOptions('init', {
      vulcanjsComponent: action.component
    });
  } else if (action.type === 'unshallow') {
    registerGenerator('unshallow');
    return runWithOptions('unshallow', {
      vulcanjsComponent: action.component
    });
  }
}

run();
