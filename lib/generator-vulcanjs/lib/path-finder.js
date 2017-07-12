const path = require('path');

let generator;

function setup(generatorSetup) {
  generator = generatorSetup;
}

function get(wrappedOptions, pathType, ...wrappedArgs) {
  function getPath(options, ...args) {
    const relativeToProjectRootPath = path.join(...args);
    const absolutePath = generator.destinationPath(relativeToProjectRootPath);
    if (options.relativeTo) return path.relative(options.relativeTo, absolutePath);
    return options.isAbsolute ? absolutePath : relativeToProjectRootPath;
  }

  function rootStoriesPath(options, ...args) {
    return getPath(options, '.stories', ...args);
  }

  function packagePath(options, ...args) {
    return getPath(options, 'packages', generator.props.packageName, ...args);
  }

  function libPath(options, ...args) {
    return packagePath(options, 'lib', ...args);
  }

  function modelsPath(options, ...args) {
    return libPath(options, 'models', ...args);
  }

  function modelsIndexPath(options) {
    return modelsPath(options, 'index.js');
  }

  function routesPath(options) {
    return modelsPath(options, 'routes.js');
  }

  function modelPath(options, ...args) {
    return modelsPath(options, generator.props.modelName, ...args);
  }

  function componentsPath(options, ...args) {
    return libPath(options, 'components', ...args);
  }

  function modelTestPath(options, ...args) {
    return modelPath(options, 'test', ...args);
  }

  function packageStoriesPath(options, ...args) {
    return componentsPath(options, '.stories.js', ...args);
  }

  function modelInComponentsPath(options, ...args) {
    return componentsPath(options, generator.props.modelName, ...args);
  }

  function modelStoriesPath(options) {
    return modelInComponentsPath(options, '.stories.js');
  }

  function clientPath(options, ...args) {
    return libPath(options, 'client', ...args);
  }

  function serverPath(options, ...args) {
    return libPath(options, 'server', ...args);
  }

  switch (pathType) {
    case 'rootStories':
      return rootStoriesPath(wrappedOptions, ...wrappedArgs);
    case 'package':
      return packagePath(wrappedOptions, ...wrappedArgs);
    case 'lib':
      return libPath(wrappedOptions, ...wrappedArgs);
    case 'models':
      return modelsPath(wrappedOptions, ...wrappedArgs);
    case 'modelsIndex':
      return modelsIndexPath(wrappedOptions, ...wrappedArgs);
    case 'model':
      return modelPath(wrappedOptions, ...wrappedArgs);
    case 'components':
      return componentsPath(wrappedOptions, ...wrappedArgs);
    case 'modelTest':
      return modelTestPath(wrappedOptions, ...wrappedArgs);
    case 'packageStories':
      return packageStoriesPath(wrappedOptions, ...wrappedArgs);
    case 'modelInComponents':
      return modelInComponentsPath(wrappedOptions, ...wrappedArgs);
    case 'modelStories':
      return modelStoriesPath(wrappedOptions, ...wrappedArgs);
    case 'client':
      return clientPath(wrappedOptions, ...wrappedArgs);
    case 'server':
      return serverPath(wrappedOptions, ...wrappedArgs);
    case 'routes':
      return routesPath(wrappedOptions, ...wrappedArgs);
    default:
      return undefined;
  }
}

module.exports = {
  get: get,
  setup: setup
};
