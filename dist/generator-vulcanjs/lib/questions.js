'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var uiText = require('./ui-text');
var common = require('./common');
var store = require('./store');
var validations = require('./validations');
var makeLister = require('./lister');

function setup(generatorSetup) {
  var generator = generatorSetup;
  var lister = makeLister.setup(generatorSetup);

  function get() {
    var options = generator.options;

    function _when(fieldName, answers, questionOptions) {
      if (questionOptions && questionOptions.isManual) {
        return answers[fieldName] === common.manualChoiceValue;
      }
      return !(options.dontAsk && options[fieldName]);
    }

    function appName() {
      return {
        type: 'input',
        name: 'appName',
        message: uiText.messages.appName,
        when: function when() {
          return _when('appName');
        },
        default: options.appName,
        validate: validations.assertNonEmpty
      };
    }

    function doShallowClone() {
      return {
        type: 'list',
        name: 'doShallowClone',
        when: function when() {
          return _when('reactExtension');
        },
        message: uiText.messages.doShallowClone,
        choices: common.cloningOptions
      };
    }

    function isDelete() {
      return {
        type: 'confirm',
        name: 'isDelete',
        message: uiText.messages.isDelete,
        when: function when() {
          return _when('appName');
        },
        default: false
      };
    }

    function reactExtension() {
      return {
        type: 'list',
        name: 'reactExtension',
        message: uiText.messages.reactExtension,
        choices: common.reactExtensions,
        when: function when() {
          return _when('reactExtension');
        }
      };
    }

    function packageManager() {
      return {
        type: 'list',
        name: 'packageManager',
        message: uiText.messages.packageManager,
        choices: common.packageManagers,
        when: function when() {
          return _when('packageManager');
        },
        default: common.getDefaultChoiceIndex(common.packageManagers, options.packagemanager)
      };
    }

    function packageName(questionOptions) {
      return {
        type: 'input',
        name: 'packageName',
        message: uiText.messages.packageName,
        when: function when(answers) {
          return _when('packageName', answers, questionOptions);
        },
        default: options.packageName,
        validate: validations.combineValidators(validations.assertNonEmpty, validations.assertNotPackageExists)
      };
    }

    function vulcanDependencies() {
      return {
        type: 'checkbox',
        name: 'vulcanDependencies',
        message: uiText.messages.vulcanDependencies,
        choices: [{ name: 'vulcan:core', checked: true }, 'vulcan:posts', 'vulcan:comments', 'vulcan:newsletter', 'vulcan:notifications', 'vulcan:getting-started', 'vulcan:categories', 'vulcan:voting', 'vulcan:embedly', 'vulcan:api', 'vulcan:rss', 'vulcan:subscribe'],
        when: function when() {
          return _when('vulcanDependencies');
        }
      };
    }

    function isPackageAutoAdd() {
      return {
        type: 'confirm',
        name: 'isPackageAutoAdd',
        message: uiText.messages.isPackageAutoAdd,
        when: function when() {
          return _when('isPackageAutoAdd');
        }
      };
    }

    function packageNameList() {
      var questionOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return {
        type: 'list',
        name: 'packageName',
        message: uiText.messages.packageName,
        when: function when() {
          return _when('packageName');
        },
        choices: function choices() {
          var packageNames = void 0;
          if (questionOptions && questionOptions.isWithNumModels) {
            packageNames = lister.listPackagesWithNbModules().sort(common.numModelsSort).map(function (_ref) {
              var name = _ref.name,
                  numModels = _ref.numModels;

              if (numModels > 0) return name;
              return { name: name, value: name, disabled: true };
            });
          } else {
            packageNames = lister.listPackages();
          }
          var preProcessedChoices = [].concat(_toConsumableArray(packageNames));
          if (questionOptions.isAllAllowed) {
            preProcessedChoices.push(common.allChoice);
          }
          if (questionOptions.isManualAllowed) {
            preProcessedChoices.push(common.manualChoice);
          }
          return preProcessedChoices;
        },
        default: common.getDefaultChoiceIndex(lister.listPackages(), options.packageName)
      };
    }

    function modelName() {
      var questionOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return {
        type: 'input',
        name: 'modelName',
        message: uiText.messages.modelName,
        when: function when(answers) {
          return _when('modelName', answers, questionOptions);
        },
        default: options.modelName,
        validate: function validate(input, answers) {
          var combinedValidator = validations.combineValidators(validations.assertNonEmpty, validations.generateNotModelExists(generator._finalize('packageName', answers)));
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
        when: function when() {
          return _when('modelParts');
        },
        filter: common.getSetFromArr
      };
    }

    function modelNameList() {
      var questionOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return {
        type: 'list',
        name: 'modelName',
        message: uiText.messages.modelName,
        when: function when() {
          return _when('modelName');
        },
        choices: function choices(answers) {
          var finalPackageName = generator._finalize('packageName', answers);
          var modelNames = lister.listModules(finalPackageName);
          var preProcessedChoices = [].concat(_toConsumableArray(modelNames));
          if (questionOptions.isManualAllowed) {
            preProcessedChoices.push(common.manualChoice);
          }
          return [].concat(_toConsumableArray(modelNames));
        },
        default: function _default(answers) {
          var finalPackageName = generator._finalize('packageName', answers);
          var modelNames = lister.listModules(finalPackageName);
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
        when: function when() {
          return _when('defaultResolvers');
        },
        filter: common.getSetFromArr
      };
    }

    function componentName() {
      return {
        type: 'input',
        name: 'componentName',
        message: uiText.messages.componentName,
        when: function when() {
          return _when('componentName');
        },
        validate: validations.assertNonEmpty,
        default: options.componentName
      };
    }

    function componentType() {
      return {
        type: 'list',
        name: 'componentType',
        message: uiText.messages.componentType,
        choices: [{ name: 'Pure Function', value: 'pure' }, { name: 'Class Component', value: 'class' }],
        when: function when() {
          return _when('appName');
        }
      };
    }

    function isRegisterComponent() {
      return {
        type: 'confirm',
        name: 'isRegister',
        message: uiText.messages.isRegisterComponent,
        when: _when('appName')
      };
    }

    function routeName() {
      var questionOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return {
        type: 'input',
        name: 'routeName',
        message: uiText.messages.routeName,
        when: function when(answers) {
          return _when('routeName', answers, questionOptions);
        },
        validate: validations.assertNonEmpty,
        default: options.routeName
      };
    }

    function routeNameList() {
      return {
        type: 'list',
        name: 'routeName',
        message: uiText.messages.routeName,
        when: function when() {
          return _when('routeName');
        },
        choices: function choices(answers) {
          var finalPackageName = generator._finalize('packageName', answers);
          var routeNames = store.get('routeNames', finalPackageName);
          return [].concat(_toConsumableArray(routeNames), [common.manualChoice]);
        }
        // default: (answers) => {
        //   const finalPackageName = generator._finalize('packageName', answers);
        //   const modelNames = store.get('modelNames', finalPackageName);
        //   return common.getDefaultChoiceIndex(
        //     modelNames,
        //     options.modelName
        //   );
        // },
      };
    }

    function routePath() {
      return {
        type: 'input',
        name: 'routePath',
        message: uiText.messages.routePath,
        when: _when('routePath'),
        validate: validations.assertNonEmpty,
        default: options.routePath
      };
    }

    function layoutName() {
      return {
        type: 'input',
        name: 'layoutName',
        message: uiText.messages.layoutName,
        when: _when('layoutName'),
        default: options.layoutName
      };
    }

    function isAddCustomSchemaProperty() {
      return {
        type: 'confirm',
        name: 'isAddCustomSchemaProperty',
        message: uiText.messages.isAddCustomSchemaProperty,
        when: function when() {
          return _when('isAddCustomSchemaProperty');
        },
        default: false
      };
    }

    function schemaPropertyName() {
      return {
        type: 'input',
        name: 'schemaPropertyName',
        message: uiText.messages.schemaPropertyName,
        when: function when() {
          return _when('schemaPropertyName');
        },
        validate: validations.assertNonEmpty
      };
    }

    function isSchemaPropertyHidden() {
      return {
        type: 'confirm',
        name: 'isSchemaPropertyHidden',
        when: function when() {
          return _when('isSchemaPropertyHidden');
        },
        message: uiText.messages.isSchemaPropertyHidden
      };
    }

    function schemaPropertyLabel() {
      return {
        type: 'input',
        name: 'schemaPropertyLabel',
        message: uiText.messages.schemaPropertyLabel,
        when: function when(answers) {
          return !answers.isSchemaPropertyHidden && _when('schemaPropertyLabel');
        },
        validate: validations.assertNonEmpty
      };
    }

    function schemaPropertyType() {
      return {
        type: 'list',
        name: 'schemaPropertyType',
        message: uiText.messages.schemaPropertyType,
        choices: common.schemaPropertyTypes,
        when: function when() {
          return _when('schemaPropertyType');
        }
      };
    }

    function isSchemaPropertyOptional() {
      return {
        type: 'confirm',
        name: 'isSchemaPropertyOptional',
        message: uiText.messages.isSchemaPropertyOptional,
        when: function when() {
          return _when('isSchemaPropertyOptional');
        }
      };
    }

    function schemaPropertyViewableBy() {
      return {
        type: 'checkbox',
        name: 'schemaPropertyViewableBy',
        message: uiText.messages.schemaPropertyViewableBy,
        choices: common.visitorTypes,
        when: function when() {
          return _when('schemaPropertyViewableBy');
        }
      };
    }

    function schemaPropertyInsertableBy() {
      return {
        type: 'checkbox',
        name: 'schemaPropertyInsertableBy',
        message: uiText.messages.schemaPropertyInsertableBy,
        choices: common.visitorTypes,
        when: function when() {
          return _when('schemaPropertyInsertableBy');
        }
      };
    }

    function schemaPropertyEditableBy() {
      return {
        type: 'checkbox',
        name: 'schemaPropertyEditableBy',
        message: uiText.messages.schemaPropertyEditableBy,
        choices: common.visitorTypes,
        when: function when() {
          return _when('schemaPropertyEditableBy');
        }
      };
    }

    function isAddAnotherCustomSchemaProperty() {
      return {
        type: 'confirm',
        name: 'isAddAnotherCustomSchemaProperty',
        message: uiText.messages.isAddAnotherCustomSchemaProperty,
        when: function when() {
          return _when('isAddAnotherCustomSchemaProperty');
        }
      };
    }

    function vulcanjsRemovableComponentsList() {
      return {
        type: 'list',
        name: 'vulcanjsComponent',
        message: uiText.messages.vulcanjsRemovableComponents,
        when: function when() {
          return _when('vulcanjsComponent');
        },
        choices: common.vulcanjsRemovableComponents,
        default: common.getDefaultChoiceIndex(common.vulcanjsRemovableComponents, options.vulcanjsComponent)
      };
    }

    function vulcanjsListableComponentsList() {
      return {
        type: 'list',
        name: 'vulcanjsComponent',
        message: uiText.messages.vulcanjsListableComponents,
        when: function when() {
          return _when('vulcanjsComponent');
        },
        choices: common.vulcanjsListableComponents,
        default: common.getDefaultChoiceIndex(common.vulcanjsListableComponents, options.vulcanjsComponent)
      };
    }

    function getSingleQuestion(questionName) {
      switch (questionName) {
        case 'appName':
          return appName();
        case 'doShallowClone':
          return doShallowClone();
        case 'reactExtension':
          return reactExtension();
        case 'packageManager':
          return packageManager();
        case 'packageName':
          return packageName();
        case 'packageNameIfManual':
          return packageName({ isManual: true });
        case 'vulcanDependencies':
          return vulcanDependencies();
        case 'isPackageAutoAdd':
          return isPackageAutoAdd();
        case 'packageNameList':
          return packageNameList();
        case 'packageNameWithNumModelsList':
          return packageNameList({ isWithNumModels: true, isManualAllowed: true });
        case 'packageNameWithManualList':
          return packageNameList({ isManualAllowed: true });
        case 'packageNameWithAllList':
          return packageNameList({ isAllAllowed: true });
        case 'modelName':
          return modelName();
        case 'modelNameIfManual':
          return modelName({ isManual: true });
        case 'modelParts':
          return modelParts();
        case 'modelNameList':
          return modelNameList();
        case 'modelNameWithManualList':
          return modelNameList({ isManual: true });
        case 'componentName':
          return componentName();
        case 'componentType':
          return componentType();
        case 'isRegisterComponent':
          return isRegisterComponent();
        case 'defaultResolvers':
          return defaultResolvers();
        case 'isDelete':
          return isDelete();
        case 'routeName':
          return routeName();
        case 'routeNameIfManual':
          return routeName({ isManual: true });
        case 'routeNameList':
          return routeNameList();
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
        case 'vulcanjsListableComponentsList':
          return vulcanjsListableComponentsList();
        default:
          return undefined;
      }
    }

    for (var _len = arguments.length, questionNames = Array(_len), _key = 0; _key < _len; _key++) {
      questionNames[_key] = arguments[_key];
    }

    return questionNames.map(getSingleQuestion);
  }

  return get;
}

module.exports = {
  setup: setup
};
