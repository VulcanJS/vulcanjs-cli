'use strict';

var path = require('path');

function setup(generatorSetup) {
  var generator = generatorSetup;
  function get(wrappedOptions, pathType) {
    function getPath(options) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var relativeToProjectRootPath = path.join.apply(path, args);
      var absolutePath = generator.destinationPath(relativeToProjectRootPath);
      if (options.relativeTo) return path.relative(options.relativeTo, absolutePath);
      return options.isAbsolute ? absolutePath : relativeToProjectRootPath;
    }

    function rootStoriesPath(options) {
      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      return getPath.apply(undefined, [options, '.stories'].concat(args));
    }

    function packagePath(options) {
      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      return getPath.apply(undefined, [options, 'packages', generator.props.packageName].concat(args));
    }

    function libPath(options) {
      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      return packagePath.apply(undefined, [options, 'lib'].concat(args));
    }

    function modulesPath(options) {
      for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        args[_key6 - 1] = arguments[_key6];
      }

      return libPath.apply(undefined, [options, 'modules'].concat(args));
    }

    // model = module in Vulcan
    function modelsPath(options) {
      for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        args[_key7 - 1] = arguments[_key7];
      }

      return modulesPath.apply(undefined, [options, 'models'].concat(args));
    }

    function modelsIndexPath(options) {
      for (var _len8 = arguments.length, args = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        args[_key8 - 1] = arguments[_key8];
      }

      return modelsPath.apply(undefined, [options, 'index.js'].concat(args));
    }

    function modulesIndexPath(options) {
      return modulesPath(options, 'index.js');
    }

    function routesPath(options) {
      return modulesPath(options, 'routes.js');
    }

    function modelPath(options) {
      for (var _len9 = arguments.length, args = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
        args[_key9 - 1] = arguments[_key9];
      }

      return modulesPath.apply(undefined, [options, generator.props.modelName].concat(args));
    }

    function componentsPath(options) {
      for (var _len10 = arguments.length, args = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
        args[_key10 - 1] = arguments[_key10];
      }

      return libPath.apply(undefined, [options, 'components'].concat(args));
    }

    function componentsIndexPath(options) {
      return modulesPath(options, 'components.js');
    }

    function packageTestsPath(options) {
      for (var _len11 = arguments.length, args = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
        args[_key11 - 1] = arguments[_key11];
      }

      return packagePath.apply(undefined, [options, 'tests'].concat(args));
    }

    function modelTestsPath(options) {
      for (var _len12 = arguments.length, args = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
        args[_key12 - 1] = arguments[_key12];
      }

      return packageTestsPath.apply(undefined, [options, 'models'].concat(args));
    }

    function modelTestPath(options) {
      for (var _len13 = arguments.length, args = Array(_len13 > 1 ? _len13 - 1 : 0), _key13 = 1; _key13 < _len13; _key13++) {
        args[_key13 - 1] = arguments[_key13];
      }

      return modelTestsPath.apply(undefined, [options, generator.props.modelName].concat(args));
    }

    function packageStoriesPath(options) {
      for (var _len14 = arguments.length, args = Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
        args[_key14 - 1] = arguments[_key14];
      }

      return componentsPath.apply(undefined, [options, '.stories.js'].concat(args));
    }

    function modelInComponentsPath(options) {
      for (var _len15 = arguments.length, args = Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
        args[_key15 - 1] = arguments[_key15];
      }

      return componentsPath.apply(undefined, [options, generator.props.modelName].concat(args));
    }

    function modelStoriesPath(options) {
      return modelInComponentsPath(options, '.stories.js');
    }

    function clientPath(options) {
      for (var _len16 = arguments.length, args = Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
        args[_key16 - 1] = arguments[_key16];
      }

      return libPath.apply(undefined, [options, 'client'].concat(args));
    }

    function serverPath(options) {
      for (var _len17 = arguments.length, args = Array(_len17 > 1 ? _len17 - 1 : 0), _key17 = 1; _key17 < _len17; _key17++) {
        args[_key17 - 1] = arguments[_key17];
      }

      return libPath.apply(undefined, [options, 'server'].concat(args));
    }

    for (var _len = arguments.length, wrappedArgs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      wrappedArgs[_key - 2] = arguments[_key];
    }

    switch (pathType) {
      case 'rootStories':
        return rootStoriesPath.apply(undefined, [wrappedOptions].concat(wrappedArgs));
      case 'package':
        return packagePath.apply(undefined, [wrappedOptions].concat(wrappedArgs));
      case 'lib':
        return libPath.apply(undefined, [wrappedOptions].concat(wrappedArgs));
      case 'models':
        return modelsPath.apply(undefined, [wrappedOptions].concat(wrappedArgs));
      case 'modules':
        return modulesPath.apply(undefined, [wrappedOptions].concat(wrappedArgs));
      case 'packageTests':
        return packageTestsPath.apply(undefined, [wrappedOptions].concat(wrappedArgs));
      case 'modulesIndex':
        return modulesIndexPath.apply(undefined, [wrappedOptions].concat(wrappedArgs));
      case 'modelsIndex':
        return modelsIndexPath.apply(undefined, [wrappedOptions].concat(wrappedArgs));
      case 'componentsIndex':
        return componentsIndexPath.apply(undefined, [wrappedOptions].concat(wrappedArgs));
      case 'model':
        return modelPath.apply(undefined, [wrappedOptions].concat(wrappedArgs));
      case 'components':
        return componentsPath.apply(undefined, [wrappedOptions].concat(wrappedArgs));
      case 'modelTest':
        return modelTestPath.apply(undefined, [wrappedOptions].concat(wrappedArgs));
      case 'packageStories':
        return packageStoriesPath.apply(undefined, [wrappedOptions].concat(wrappedArgs));
      case 'modelInComponents':
        return modelInComponentsPath.apply(undefined, [wrappedOptions].concat(wrappedArgs));
      case 'modelStories':
        return modelStoriesPath.apply(undefined, [wrappedOptions].concat(wrappedArgs));
      case 'client':
        return clientPath.apply(undefined, [wrappedOptions].concat(wrappedArgs));
      case 'server':
        return serverPath.apply(undefined, [wrappedOptions].concat(wrappedArgs));
      case 'routes':
        return routesPath.apply(undefined, [wrappedOptions].concat(wrappedArgs));
      default:
        return undefined;
    }
  }
  return get;
}

module.exports = {
  setup: setup
};
