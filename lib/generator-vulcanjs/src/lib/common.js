const alphabeticalSort = (a, b) => {
  const aLower = a.toLowerCase();
  const bLower = b.toLowerCase();
  if (aLower < bLower) return -1;
  if (aLower > bLower) return 1;
  return 0;
};

const numModelsSort = (a, b) => {
  const aHasNonZero = a.numModels > 0;
  const bHasNonZero = b.numModels > 0;
  if (aHasNonZero && bHasNonZero) return 0;
  if (!aHasNonZero && !bHasNonZero) return 0;
  if (!aHasNonZero && bHasNonZero) return 1;
  /* if (aHasNonZero && !bHasNonZero)*/ return -1;
};

const getSetFromArr = (arr) => {
  const set = {};
  arr.forEach((elem) => {
    set[elem] = true;
  });
  return set;
};

const reactExtensions = ['jsx', 'js'];

const packageManagers = ['yarn', 'npm'];

const visitorTypes = ['guest', 'member', 'admin'];

const schemaPropertyTypes = ['String', 'Number', 'Array', 'Object', 'Custom'];

const modelParts = ['fragments', 'resolvers', 'mutations', 'schema', 'permissions', 'parameters'];

const vulcanjsRemovableComponents = [
  'route',
  'model',
  'package',
];

const manualChoiceValue = '__vjs_manual';

const manualChoice = { name: '[MANUAL]', value: manualChoiceValue };

const getDefaultChoiceIndex = (choices, option) => {
  const index = choices.findIndex((elem) => elem === option);
  return Math.max(index, 0);
};

const exposed = {
  alphabeticalSort,
  numModelsSort,
  reactExtensions,
  packageManagers,
  visitorTypes,
  schemaPropertyTypes,
  getDefaultChoiceIndex,
  getSetFromArr,
  vulcanjsRemovableComponents,
  modelParts,
  manualChoiceValue,
  manualChoice,
};

module.exports = exposed;
