const chalk = require('chalk');

const descriptions = {
  appName: 'The name of your app',
  reactExtension: 'Default react component extension',
  packageManager: 'Preferred package manager',
  packageName: 'The name of the package',
  modelName: 'The name of the model',
  componentName: 'The name of your component',
  routeName: 'The name of your route',
  routePath: 'The path of your route',
  layoutName: 'The layot that will wrap this route\'s component',
  isRegisterComponent: 'Set to true of you want to register the component to Vulcan.',
  isAddComponentToStoryBook: 'Set to true of you want to add the component to storybook.',
  componentType: 'The type of the component. Is it a pure function, or a class?',
  vulcanDependencies: 'The vulcan packages that your application depends on',
  isPackageAutoAdd: 'Set to true if you want your package to be added to .meteor/packages',
  dontAsk: 'Set to true if you want the generators to skip prompting for the arguments you have supplied from the command line',
  vulcanjsRemovableComponent: 'The part of the app that you want to remove',
  vulcanjsListableComponent: 'The part of the app that you want to list'
};

const messages = {
  appName: 'App name',
  reactExtension: 'React extension',
  packageManager: 'Package manager',
  packageName: 'Package name',
  modelName: 'Model name',
  componentName: 'Component name',
  isRegisterComponent: 'Register component',
  componentType: 'Component type',
  routeName: 'Route name',
  routePath: 'Route path',
  layoutName: 'Layout name',
  vulcanDependencies: 'Vulcan dependencies',
  isPackageAutoAdd: 'Add to .meteor/packages',
  storyBookSetupStatus: 'Looks like you havent set up your react storybook. Would you like to do it now?',
  isAddComponentToStoryBook: 'Add component to storybook',
  isAddCustomSchemaProperty: 'Add a custom property to the collection',
  isAddAnotherCustomSchemaProperty: 'Add another custom property to the collection',
  schemaPropertyName: 'Property name',
  isSchemaPropertyHidden: 'Property is hidden',
  schemaPropertyLabel: 'Property label',
  schemaPropertyType: 'Property type',
  isSchemaPropertyOptional: 'Property is optional',
  schemaPropertyViewableBy: 'Property viewable by',
  schemaPropertyInsertableBy: 'Property insertable by',
  schemaPropertyEditableBy: 'Property editable by',
  vulcanjsRemovableComponents: 'Part to remove',
  vulcanjsListableComponents: 'Part to list',
  isDelete: `${chalk.red('WARNING:')} You are about to destroy some code. Have you committed your code?`
};

const errors = {
  notVulcan: 'This is not a Vulcan.js project directory. \nYou cannot run Vulcan.js generators outside of a Vulcan.js project directory.',
  isVulcan: 'You are already in a Vulcan.js project directory. \nYou may not run this command inside a Vulcan.js project directory.',
  notPackageExists: packageName => `The package ${packageName} does not exist. \nIf you'd like to work on this package, you should create it first by running: ${chalk.green(`vulcanjs:package ${packageName}`)}`,
  isPackageExists: packageName => `A package with the name: '${packageName}' already exists.`,
  notModelExists: (packageName, modelName) => `A model with the name: '${modelName}' under the package '${packageName}' does not exist. \nIf you'd like to work on this model, you should first run ${chalk.green(`vulcanjs:model --p ${packageName} --m ${modelName}`)}.`,
  isModelExists: (packageName, modelName) => `A model with the name '${modelName}' under the package '${packageName}' already exists.`,
  isZeroPackages: `The command you just ran requires at least 1 custom package to be present in your app. \nTo create a package, run ${chalk.green('vulcanjs:package')}`,
  hasZeroModels: packageName => `The package '${packageName} has no models.)}`,
  isEmpty: 'This cannot be empty.',
  isDelete: 'Cannot delete uncommitted code'
};

module.exports = {
  descriptions: descriptions,
  messages: messages,
  errors: errors
};
