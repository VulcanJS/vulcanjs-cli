const path = require('path');

function setup (generatorSetup) {
  const generator = generatorSetup;
  function get (wrappedOptions, pathType, ...wrappedArgs) {
    function getPath (options, ...args) {
      const relativeToProjectRootPath = path.join(...args);
      const absolutePath = generator.destinationPath(relativeToProjectRootPath);
      if (options.relativeTo) return path.relative(options.relativeTo, absolutePath);
      return options.isAbsolute ? absolutePath : relativeToProjectRootPath;
    }

    function rootStoriesPath (options, ...args) {
      return getPath(
        options,
        '.stories',
        ...args
      );
    }

    function packagePath (options, ...args) {
      return getPath(
        options,
        'packages',
        generator.props.packageName,
        ...args
      );
    }

    function libPath (options, ...args) {
      return packagePath(
        options,
        'lib',
        ...args
      );
    }

    function modulesPath (options, ...args) {
      return libPath(
        options,
        'modules',
        ...args
      );
    }

    // model = module in Vulcan
    function modelsPath (options, ...args) {
      return modulesPath(
        options,
        'models',
        ...args
      );
    }

    function modelsIndexPath (options, ...args) {
      return modelsPath(
        options,
        'index.js',
        ...args
      );
    }

    function modulesIndexPath (options) {
      return modulesPath(
        options,
        'index.js'
      );
    }

    function routesPath (options) {
      return modulesPath(
        options,
        'routes.js'
      );
    }

    function modelPath (options, ...args) {
      return modulesPath(
        options,
        generator.props.modelName,
        ...args
      );
    }

    function componentsPath (options, ...args) {
      return libPath(
        options,
        'components',
        ...args
      );
    }

    function componentsIndexPath (options) {
      return modulesPath(
        options,
        'components.js'
      );
    }

    function packageTestsPath (options, ...args) {
      return packagePath(
        options,
        'tests',
        ...args
      );
    }

    function modelTestsPath (options, ...args) {
      return packageTestsPath(
        options,
        'models',
        ...args
      );
    }

    function modelTestPath (options, ...args) {
      return modelTestsPath(
        options,
        generator.props.modelName,
        ...args
      );
    }

    function packageStoriesPath (options, ...args) {
      return componentsPath(
        options,
        '.stories.js',
        ...args
      );
    }

    function modelInComponentsPath (options, ...args) {
      return componentsPath(
        options,
        generator.props.modelName,
        ...args
      );
    }

    function modelStoriesPath (options) {
      return modelInComponentsPath(
        options,
        '.stories.js'
      );
    }

    function clientPath (options, ...args) {
      return libPath(
        options,
        'client',
        ...args
      );
    }

    function serverPath (options, ...args) {
      return libPath(
        options,
        'server',
        ...args
      );
    }

    switch (pathType) {
      case 'rootStories': return rootStoriesPath(wrappedOptions, ...wrappedArgs);
      case 'package': return packagePath(wrappedOptions, ...wrappedArgs);
      case 'lib': return libPath(wrappedOptions, ...wrappedArgs);
      case 'models': return modelsPath(wrappedOptions, ...wrappedArgs);
      case 'modules': return modulesPath(wrappedOptions, ...wrappedArgs);
      case 'packageTests': return packageTestsPath(wrappedOptions, ...wrappedArgs);
      case 'modulesIndex': return modulesIndexPath(wrappedOptions, ...wrappedArgs);
      case 'modelsIndex': return modelsIndexPath(wrappedOptions, ...wrappedArgs);
      case 'componentsIndex': return componentsIndexPath(wrappedOptions, ...wrappedArgs);
      case 'model': return modelPath(wrappedOptions, ...wrappedArgs);
      case 'components': return componentsPath(wrappedOptions, ...wrappedArgs);
      case 'modelTest': return modelTestPath(wrappedOptions, ...wrappedArgs);
      case 'packageStories': return packageStoriesPath(wrappedOptions, ...wrappedArgs);
      case 'modelInComponents': return modelInComponentsPath(wrappedOptions, ...wrappedArgs);
      case 'modelStories': return modelStoriesPath(wrappedOptions, ...wrappedArgs);
      case 'client': return clientPath(wrappedOptions, ...wrappedArgs);
      case 'server': return serverPath(wrappedOptions, ...wrappedArgs);
      case 'routes': return routesPath(wrappedOptions, ...wrappedArgs);
      default: return undefined;
    }
  }
  return get;
}

module.exports = {
  setup,
};
