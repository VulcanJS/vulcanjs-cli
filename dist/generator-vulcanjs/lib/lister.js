'use strict';

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
  var folderContent = fs.readdirSync(dirPath);
  var folders = folderContent.filter(function (folderName) {
    return isDirectory(path.join(dirPath, folderName));
  });
  var validFolders = folders.filter(isNotPrivate);
  return validFolders;
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
  function listPackagesWithNbModules() {
    var packages = listPackages();
    return packages.map(function (pkgName) {
      return {
        name: pkgName,
        numModels: listFolders(pathFinder.findModules(generatorSetup, { isAbsolute: true }, pkgName))
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

  return {
    listModules: listModules,
    listPackages: listPackages,
    listPackagesWithNbModules: listPackagesWithNbModules,
    countRoutes: countRoutes,
    countModules: countModules
  };
}

module.exports = { setup: setup };
