const uiText = require('./ui-text');
const makeLister = require('./lister');

function combineValidators (...fns) {
  return function reducedValidator (input) {
    return fns.reduce(
      (acc, curValidator) => {
        if (typeof acc === 'string') return acc;
        return curValidator(input);
      },
      true
    );
  };
}

function setup (generatorSetup) {
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

  const assertNotModelExists = (packageName, modelName) => {
    if (!lister.moduleExists(packageName, modelName)) return true;
    return uiText.errors.isModelExists(packageName, modelName);
  };

  const generateNotModelExists = (packageName) => (
    (input) => assertNotModelExists(packageName, input)
  );
  return {
    assertNonEmpty,
    assertNotPackageExists,
    assertNotModelExists,
    generateNotModelExists,
  };
}

module.exports = {
  combineValidators,
  setup,
};
