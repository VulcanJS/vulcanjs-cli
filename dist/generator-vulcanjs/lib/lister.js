'use strict';

var fs = require('fs');
var path = require('path');
var pathFinder = require('./path-finder');

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

  return {
    listModules: listModules,
    listPackages: listPackages,
    listPackagesWithNbModules: listPackagesWithNbModules
  };
}

module.exports = { setup: setup };
