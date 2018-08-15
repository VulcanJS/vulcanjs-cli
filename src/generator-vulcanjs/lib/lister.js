const fs = require('fs');
const path = require('path');
const pathFinder = require('./path-finder');

function isDirectory (dirPath) {
  return fs.lstatSync(dirPath).isDirectory();
}
function isNotPrivate (dirName) {
  return !/^_/.test(dirName);
}
function listFolders (dirPath) {
  const folderContent = fs.readdirSync(dirPath);
  const folders = folderContent.filter((folderName) => isDirectory(path.join(dirPath, folderName)));
  const validFolders = folders.filter(isNotPrivate);
  return validFolders;
}

function setup (generatorSetup) {
  const getPath = pathFinder.setup(generatorSetup);

  function listPackages () {
    const appPackagesPath = getPath({ isAbsolute: true }, 'packages');
    const folders = listFolders(appPackagesPath);
    return folders;
  }
  function listModules (pkgName) {
    const packageModulesPath = pathFinder.findModules(generatorSetup, { isAbsolute: true }, pkgName);
    return listFolders(packageModulesPath);
  }
  function listPackagesWithNbModules () {
    const packages = listPackages();
    return packages.map((pkgName) => ({
      name: pkgName,
      numModels: listFolders(pathFinder.findModules(generatorSetup, { isAbsolute: true }, pkgName)),
    }));
  }

  return {
    listModules,
    listPackages,
    listPackagesWithNbModules,
  };
}

module.exports = { setup }
  ;
