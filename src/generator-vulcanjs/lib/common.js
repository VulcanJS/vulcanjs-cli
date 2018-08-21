const alphabeticalSort = (a, b) => {
  const aLower = a.toLowerCase();
  const bLower = b.toLowerCase();
  if (aLower < bLower) return -1;
  if (aLower > bLower) return 1;
  return 0;
};

const numModulesSort = (a, b) => {
  const aHasNonZero = a.numModules > 0;
  const bHasNonZero = b.numModules > 0;
  if (aHasNonZero && bHasNonZero) return 0;
  if (!aHasNonZero && !bHasNonZero) return 0;
  if (!aHasNonZero && bHasNonZero) return 1;
  /* if (aHasNonZero && !bHasNonZero) */ return -1;
};

const getSetFromArr = (arr) => {
  const set = {};
  arr.forEach((elem) => {
    set[elem] = true;
  });
  return set;
};

const reactExtensions = ['jsx', 'js'];

const cloningOptions = ['fast', 'complete'];

const packageManagers = ['yarn', 'npm'];

const visitorTypes = ['Guests', 'Members', 'Admins'];

const schemaPropertyTypes = ['String', 'Number', 'Boolean', 'Array', 'Object', 'Custom'];

const moduleParts = ['fragments', 'resolvers', 'mutations', 'schema', 'permissions', 'parameters'];

const vulcanjsRemovableComponents = [
  'route',
  'module',
  'package',
];

const vulcanjsListableComponents = [
  'packages',
  //'routes',
];

const allChoiceValue = '__vjs_all';
const allChoice = { name: '[ALL]', value: allChoiceValue };


const getDefaultChoiceIndex = (choices, option) => {
  const index = choices.findIndex((elem) => elem === option);
  return Math.max(index, 0);
};

const exposed = {
  alphabeticalSort,
  numModulesSort,
  reactExtensions,
  packageManagers,
  visitorTypes,
  schemaPropertyTypes,
  getDefaultChoiceIndex,
  getSetFromArr,
  vulcanjsRemovableComponents,
  vulcanjsListableComponents,
  moduleParts,
  allChoiceValue,
  allChoice,
  cloningOptions,
};

module.exports = exposed;
