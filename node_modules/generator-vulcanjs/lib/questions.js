const uiText = require('./ui-text');
const common = require('./common');
const store = require('./store');
const validations = require('./validations');
const finalize = require('./finalizers').finalize;

let generator;

function setup(generatorSetup) {
  generator = generatorSetup;
}

function get(...questionNames) {
  const options = generator.options;

  function when(fieldName) {
    return !(options.dontAsk && options[fieldName]);
  }

  function appName() {
    return {
      type: 'input',
      name: 'appName',
      message: uiText.messages.appName,
      when: () => when('appName'),
      default: options.appname,
      validate: validations.assertNonEmpty
    };
  }

  function reactExtension() {
    return {
      type: 'list',
      name: 'reactExtension',
      message: uiText.messages.reactExtension,
      choices: common.reactExtensions,
      when: () => when('reactExtension'),
      default: common.getDefaultChoiceIndex(common.reactExtensions, options.reactextension)
    };
  }

  function packageManager() {
    return {
      type: 'list',
      name: 'packageManager',
      message: uiText.messages.packageManager,
      choices: common.packageManagers,
      when: () => when('packageManager'),
      default: common.getDefaultChoiceIndex(common.packageManagers, options.packagemanager)
    };
  }

  function packageName() {
    return {
      type: 'input',
      name: 'packageName',
      message: uiText.messages.packageName,
      when: () => when('packageName'),
      default: options.packagename,
      validate: validations.combineValidators(validations.assertNonEmpty, validations.assertNotPackageExists)
    };
  }

  function vulcanDependencies() {
    return {
      type: 'checkbox',
      name: 'vulcanDependencies',
      message: uiText.messages.vulcanDependencies,
      choices: [{ name: 'vulcan:core', checked: true }, 'vulcan:posts', 'vulcan:comments', 'vulcan:newsletter', 'vulcan:notifications', 'vulcan:getting-started', 'vulcan:categories', 'vulcan:voting', 'vulcan:embedly', 'vulcan:api', 'vulcan:rss', 'vulcan:subscribe'],
      when: () => when('vulcanDependencies')
    };
  }

  function isPackageAutoAdd() {
    return {
      type: 'confirm',
      name: 'isPackageAutoAdd',
      message: uiText.messages.isPackageAutoAdd,
      when: () => when('isPackageAutoAdd')
    };
  }

  function packageNameList() {
    return {
      type: 'list',
      name: 'packageName',
      message: uiText.messages.packageName,
      when: () => when('packageName'),
      choices: store.get('packageNames'),
      default: common.getDefaultChoiceIndex(store.get('packageNames'), options.packagename)
    };
  }

  function packageNameWithNumModulesList() {
    return {
      type: 'list',
      name: 'packageName',
      message: uiText.messages.packageName,
      when: () => when('packageName'),
      choices: () => store.get('packageNamesWithNumModules').sort(common.numModulesSort).map(({ name: name, numModules: numModules }) => {
        if (numModules > 0) return name;
        return { name: name, value: name, disabled: true };
      }),
      default: common.getDefaultChoiceIndex(store.get('packageNames'), options.packagename)
    };
  }

  function modelName() {
    return {
      type: 'input',
      name: 'modelName',
      message: uiText.messages.modelName,
      when: () => when('modelName'),
      default: options.modelName,
      validate: (input, answers) => {
        const combinedValidator = validations.combineValidators(validations.assertNonEmpty, validations.generateNotModuleExists(finalize('packageName', answers)));
        return combinedValidator(input, answers);
      }
    };
  }

  function modelParts() {
    return {
      type: 'checkbox',
      name: 'modelParts',
      message: 'Create with',
      choices: [{ name: 'Fragments', value: 'fragments', checked: true }, { name: 'Mutations', value: 'mutations', checked: true }, { name: 'Parameters', value: 'parameters', checked: true }, { name: 'Permissions', value: 'permissions', checked: true }, { name: 'Resolvers', value: 'resolvers', checked: true }, { name: 'Schema', value: 'schema', checked: true }],
      when: () => when('modelParts'),
      filter: common.getSetFromArr
    };
  }

  function modelNameList() {
    return {
      type: 'list',
      name: 'modelName',
      message: uiText.messages.modelName,
      when: () => when('modelName'),
      choices: answers => {
        const finalPackageName = finalize('packageName', answers);
        return store.get('modelNames', finalPackageName);
      },
      default: answers => {
        const finalPackageName = finalize('packageName', answers);
        const modelNames = store.get('modelNames', finalPackageName);
        return common.getDefaultChoiceIndex(modelNames, options.modelName);
      }
    };
  }

  function defaultResolvers() {
    return {
      type: 'checkbox',
      name: 'defaultResolvers',
      message: 'Default resolvers',
      choices: [{ name: 'List', value: 'list', checked: true }, { name: 'Single', value: 'single', checked: true }, { name: 'Total', value: 'total', checked: true }],
      when: () => when('defaultResolvers'),
      filter: common.getSetFromArr
    };
  }

  function componentName() {
    return {
      type: 'input',
      name: 'componentName',
      message: uiText.messages.componentName,
      when: () => when('componentName'),
      validate: validations.assertNonEmpty
    };
  }

  function componentType() {
    return {
      type: 'list',
      name: 'componentType',
      message: uiText.messages.componentType,
      choices: [{ name: 'Pure Function', value: 'pure' }, { name: 'Class Component', value: 'class' }],
      when: () => when('appName')
    };
  }

  function isRegisterComponent() {
    return {
      type: 'confirm',
      name: 'isRegister',
      message: uiText.messages.isRegisterComponent,
      when: when('appName')
    };
  }

  function routeName() {
    return {
      type: 'input',
      name: 'routeName',
      message: uiText.messages.routeName,
      when: when('routeName'),
      validate: validations.assertNonEmpty
    };
  }

  function routePath() {
    return {
      type: 'input',
      name: 'routePath',
      message: uiText.messages.routePath,
      when: when('routePath'),
      validate: validations.assertNonEmpty
    };
  }

  function layoutName() {
    return {
      type: 'input',
      name: 'layoutName',
      message: uiText.messages.layoutName,
      when: when('layoutName'),
      validate: validations.assertNonEmpty,
      default: 'Components.Layout'
    };
  }
  // const storyBookSetup = {
  //   type: 'list',
  //   name: 'storyBookSetupStatus',
  //   message: uiText.messages.storyBookSetupStatus,
  //   choices: [
  //     { name: 'Yes, take me to storybook setup after this.', value: 'installing' },
  //     { name: 'No, ask later.', value: 'pending' },
  //     { name: 'No, and dont ask again.', value: 'dontask' },
  //   ],
  //   when: () => {
  //     const storyBookSetupStatus = this._getStoryBookSetupStatus();
  //     const allowedStatuses = {
  //       pending: true,
  //       installing: true,
  //       askagain: true,
  //     };
  //     const isStatusAllowsSetupQuestion = allowedStatuses[storyBookSetupStatus];
  //     return (!options.packageName && isStatusAllowsSetupQuestion);
  //   },
  // };
  // const isAddComponentToStoryBook = {
  //   type: 'confirm',
  //   name: 'isAddComponentToStoryBook',
  //   message: uiText.messages.isAddComponentToStoryBook,
  //   when: () => (!options.isAddComponentToStoryBook),
  // };

  function isAddCustomSchemaProperty() {
    return {
      type: 'confirm',
      name: 'isAddCustomSchemaProperty',
      message: uiText.messages.isAddCustomSchemaProperty,
      when: () => when('isAddCustomSchemaProperty')
    };
  }

  function schemaPropertyName() {
    return {
      type: 'input',
      name: 'schemaPropertyName',
      message: uiText.messages.schemaPropertyName,
      when: () => when('schemaPropertyName'),
      validate: validations.assertNonEmpty
    };
  }

  function isSchemaPropertyHidden() {
    return {
      type: 'confirm',
      name: 'isSchemaPropertyHidden',
      when: () => when('isSchemaPropertyHidden'),
      message: uiText.messages.isSchemaPropertyHidden
    };
  }

  function schemaPropertyLabel() {
    return {
      type: 'input',
      name: 'schemaPropertyLabel',
      message: uiText.messages.schemaPropertyLabel,
      when: answers => !answers.isSchemaPropertyHidden && when('schemaPropertyLabel'),
      validate: validations.assertNonEmpty
    };
  }

  function schemaPropertyType() {
    return {
      type: 'list',
      name: 'schemaPropertyType',
      message: uiText.messages.schemaPropertyType,
      choices: common.schemaPropertyTypes,
      when: () => when('schemaPropertyType')
    };
  }

  function isSchemaPropertyOptional() {
    return {
      type: 'confirm',
      name: 'isSchemaPropertyOptional',
      message: uiText.messages.isSchemaPropertyOptional,
      when: () => when('isSchemaPropertyOptional')
    };
  }

  function schemaPropertyViewableBy() {
    return {
      type: 'checkbox',
      name: 'schemaPropertyViewableBy',
      message: uiText.messages.schemaPropertyViewableBy,
      choices: common.visitorTypes,
      when: () => when('schemaPropertyViewableBy')
    };
  }

  function schemaPropertyInsertableBy() {
    return {
      type: 'checkbox',
      name: 'schemaPropertyInsertableBy',
      message: uiText.messages.schemaPropertyInsertableBy,
      choices: common.visitorTypes,
      when: () => when('schemaPropertyInsertableBy')
    };
  }

  function schemaPropertyEditableBy() {
    return {
      type: 'checkbox',
      name: 'schemaPropertyEditableBy',
      message: uiText.messages.schemaPropertyEditableBy,
      choices: common.visitorTypes,
      when: () => when('schemaPropertyEditableBy')
    };
  }

  function isAddAnotherCustomSchemaProperty() {
    return {
      type: 'confirm',
      name: 'isAddAnotherCustomSchemaProperty',
      message: uiText.messages.isAddAnotherCustomSchemaProperty,
      when: () => when('isAddAnotherCustomSchemaProperty')
    };
  }

  function vulcanjsRemovableComponentsList() {
    return {
      type: 'list',
      name: 'vulcanjsComponent',
      message: uiText.messages.vulcanjsRemovableComponents,
      when: () => when('vulcanjsComponent'),
      choices: common.vulcanjsRemovableComponents
    };
  }

  function getSingleQuestion(questionName) {
    switch (questionName) {
      case 'appName':
        return appName();
      case 'reactExtension':
        return reactExtension();
      case 'packageManager':
        return packageManager();
      case 'packageName':
        return packageName();
      case 'vulcanDependencies':
        return vulcanDependencies();
      case 'isPackageAutoAdd':
        return isPackageAutoAdd();
      case 'packageNameList':
        return packageNameList();
      case 'modelName':
        return modelName();
      case 'modelParts':
        return modelParts();
      case 'modelNameList':
        return modelNameList();
      case 'componentName':
        return componentName();
      case 'componentType':
        return componentType();
      case 'isRegisterComponent':
        return isRegisterComponent();
      case 'defaultResolvers':
        return defaultResolvers();
      case 'packageNameWithNumModulesList':
        return packageNameWithNumModulesList();
      case 'routeName':
        return routeName();
      case 'routePath':
        return routePath();
      case 'layoutName':
        return layoutName();
      case 'isAddCustomSchemaProperty':
        return isAddCustomSchemaProperty();
      case 'schemaPropertyName':
        return schemaPropertyName();
      case 'isSchemaPropertyHidden':
        return isSchemaPropertyHidden();
      case 'schemaPropertyLabel':
        return schemaPropertyLabel();
      case 'schemaPropertyType':
        return schemaPropertyType();
      case 'isSchemaPropertyOptional':
        return isSchemaPropertyOptional();
      case 'schemaPropertyViewableBy':
        return schemaPropertyViewableBy();
      case 'schemaPropertyInsertableBy':
        return schemaPropertyInsertableBy();
      case 'schemaPropertyEditableBy':
        return schemaPropertyEditableBy();
      case 'isAddAnotherCustomSchemaProperty':
        return isAddAnotherCustomSchemaProperty();
      case 'vulcanjsRemovableComponentsList':
        return vulcanjsRemovableComponentsList();
      default:
        return undefined;
    }
  }

  return questionNames.map(getSingleQuestion);
}

module.exports = {
  get: get,
  setup: setup
};
