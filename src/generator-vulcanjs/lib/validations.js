const uiText = require('./ui-text');
const makeLister = require('./lister');

function combineValidators(...fns) {
  return function reducedValidator(input) {
    return fns.reduce(
      (acc, curValidator) => {
        if (typeof acc === 'string') return acc;
        return curValidator(input);
      },
      true
    );
  };
}

function setup(generatorSetup) {
  const generator = generatorSetup;
  const lister = makeLister.setup(generator);

  const assertNonEmpty = (input) => {
    if (input) return true;
    return uiText.errors.isEmpty;
  };

  const assertNotPackageExists = (packageName) => {
    if (!lister.packageExists(packageName)) return true;
    return uiText.errors.isPackageExists(packageName);
  };

  const assertNotModuleExists = (packageName, moduleName) => {
    if (!lister.moduleExists(packageName, moduleName)) return true;
    return uiText.errors.isModuleExists(packageName, moduleName);
  };

  const generateNotModuleExists = (packageName) => (
    (input) => assertNotModuleExists(packageName, input)
  );
  return {
    assertNonEmpty,
    assertNotPackageExists,
    assertNotModuleExists,
    generateNotModuleExists,
  };
}

module.exports = {
  combineValidators,
  setup,
};
