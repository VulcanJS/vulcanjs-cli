const path = require('path');

function setup (generatorSetup) {
  const generator = generatorSetup;
  function get (wrappedOptions, pathType, ...wrappedArgs) {
    function getPath (options, ...args) {
      const relativeToProjectRootPath = path.join(...args);
      const absolutePath = generator.destinationPath(relativeToProjectRootPath);
      console.log('getPath aboslutePath', absolutePath);
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

    function packagesPath (options, ...args) {
      return getPath(
        options,
        'packages',
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

    // module = module in Vulcan
    function modulesPath (options, ...args) {
      return modulesPath(
        options,
        'modules',
        ...args
      );
    }

    function modulesIndexPath (options, ...args) {
      return modulesPath(
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

    function modulePath (options, ...args) {
      return modulesPath(
        options,
        generator.props.moduleName,
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

    function moduleTestsPath (options, ...args) {
      return packageTestsPath(
        options,
        'modules',
        ...args
      );
    }

    function moduleTestPath (options, ...args) {
      return moduleTestsPath(
        options,
        generator.props.moduleName,
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

    function moduleInComponentsPath (options, ...args) {
      return componentsPath(
        options,
        generator.props.moduleName,
        ...args
      );
    }

    function moduleStoriesPath (options) {
      return moduleInComponentsPath(
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
      case 'packages': return packagesPath(wrappedOptions, ...wrappedArgs);
      case 'package': return packagePath(wrappedOptions, ...wrappedArgs);
      case 'lib': return libPath(wrappedOptions, ...wrappedArgs);
      case 'modules': return modulesPath(wrappedOptions, ...wrappedArgs);
      case 'modules': return modulesPath(wrappedOptions, ...wrappedArgs);
      case 'packageTests': return packageTestsPath(wrappedOptions, ...wrappedArgs);
      case 'modulesIndex': return modulesIndexPath(wrappedOptions, ...wrappedArgs);
      case 'modulesIndex': return modulesIndexPath(wrappedOptions, ...wrappedArgs);
      case 'componentsIndex': return componentsIndexPath(wrappedOptions, ...wrappedArgs);
      case 'module': return modulePath(wrappedOptions, ...wrappedArgs);
      case 'components': return componentsPath(wrappedOptions, ...wrappedArgs);
      case 'moduleTest': return moduleTestPath(wrappedOptions, ...wrappedArgs);
      case 'packageStories': return packageStoriesPath(wrappedOptions, ...wrappedArgs);
      case 'moduleInComponents': return moduleInComponentsPath(wrappedOptions, ...wrappedArgs);
      case 'moduleStories': return moduleStoriesPath(wrappedOptions, ...wrappedArgs);
      case 'client': return clientPath(wrappedOptions, ...wrappedArgs);
      case 'server': return serverPath(wrappedOptions, ...wrappedArgs);
      case 'routes': return routesPath(wrappedOptions, ...wrappedArgs);
      default: return undefined;
    }
  }
  return get;
}

function makeGetPath (generator) {
  function getPath (options, ...args) {
    const relativeToProjectRootPath = path.join(...args);
    const absolutePath = generator.destinationPath(relativeToProjectRootPath);
    if (options.relativeTo) return path.relative(options.relativeTo, absolutePath);
    return options.isAbsolute ? absolutePath : relativeToProjectRootPath;
  }
  return getPath;
}
function findModules (generator, options, packageName, ...args) {
  const getPath = makeGetPath(generator);
  return getPath(
    options,
    'packages',
    packageName,
    'lib',
    'modules',
    ...args
  );
}

// TODO: we should also tolerate a .jsx extension
function findRoutes (generator, options, packageName) {
  return findModules(generator, options, packageName, 'routes.js');
}

module.exports = {
  setup,
  findModules,
  findRoutes,
};
