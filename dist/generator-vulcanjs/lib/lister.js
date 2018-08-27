'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * List and count elements of the application (packages, modules, routes etc.)
 */
var fs = require('fs');
var path = require('path');
var pathFinder = require('./path-finder');
var chalk = require('chalk');

function isDirectory(dirPath) {
  return fs.lstatSync(dirPath).isDirectory();
}
function isNotPrivate(dirName) {
  return !/^_/.test(dirName);
}
function listFolders(dirPath) {
  try {
    var folderContent = fs.readdirSync(dirPath);
    var folders = folderContent.filter(function (folderName) {
      return isDirectory(path.join(dirPath, folderName));
    });
    var validFolders = folders.filter(isNotPrivate);
    return validFolders;
  } catch (err) {
    console.log(chalk.red('Could not find or open folder ' + dirPath));
    console.log(err);
    return [];
  }
}

function setup(generatorSetup) {
  var getPath = pathFinder.setup(generatorSetup);

  function listPackages() {
    var appPackagesPath = getPath({ isAbsolute: true }, 'packages');
    var folders = listFolders(appPackagesPath);
    return folders;
  }
  function listModules(pkgName) {
    var packageModulesPath = pathFinder.findModules(generatorSetup, { isAbsolute: true }, pkgName);
    return listFolders(packageModulesPath);
  }
  function listAllModules() {
    var packageNames = listPackages();
    return packageNames.reduce(function (allModules, packageName) {
      return [].concat(_toConsumableArray(allModules), _toConsumableArray(listModules(packageName)));
    }, []);
  }
  function listPackagesWithNbModules() {
    var packages = listPackages();
    return packages.map(function (pkgName) {
      return {
        name: pkgName,
        numModules: listFolders(pathFinder.findModules(generatorSetup, { isAbsolute: true }, pkgName))
      };
    });
  }

  function countRoutes(pkgName) {
    var packageRoutesPath = pathFinder.findRoutes(generatorSetup, { isAbsolute: true }, pkgName);
    // TODO: handle errors if the filename has been modified
    try {
      var fileContent = fs.readFileSync(packageRoutesPath, { encoding: 'utf-8' });
      var routesCount = (fileContent.match(/addRoute\(/g) || []).length;
      return routesCount;
    } catch (err) {
      console.log(chalk.red('Could not find or open routes definition for package ' + pkgName));
      console.log(err);
      return -1;
    }
  }
  function countModules(pkgName) {
    return listModules(pkgName).length;
  }

  function packageExists(pkgName) {
    var packageNames = listPackages();
    return packageNames.includes(pkgName);
  }

  function moduleExists(pkgName, moduleName) {
    var moduleNames = listModules(pkgName);
    return moduleNames.includes(moduleName);
  }

  return {
    listModules: listModules,
    listAllModules: listAllModules,
    listPackages: listPackages,
    listPackagesWithNbModules: listPackagesWithNbModules,
    countRoutes: countRoutes,
    countModules: countModules,
    packageExists: packageExists,
    moduleExists: moduleExists
  };
}

module.exports = { setup: setup };
