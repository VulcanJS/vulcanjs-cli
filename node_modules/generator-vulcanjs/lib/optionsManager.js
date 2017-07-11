const uiText = require('./ui-text');

let generator;

function setup(generatorSetup) {
  generator = generatorSetup;
}

function register(...optionNames) {
  function appName() {
    generator.option('appName', {
      type: String,
      required: false,
      alias: 'n',
      desc: uiText.descriptions.appName
    });
  }

  function packageName() {
    generator.option('packageName', {
      type: String,
      required: false,
      alias: 'p',
      desc: uiText.descriptions.packageName
    });
  }

  function modelName() {
    generator.option('modelName', {
      type: String,
      required: false,
      alias: 'm',
      desc: uiText.descriptions.modelName
    });
  }

  function componentName() {
    generator.option('componentName', {
      type: String,
      required: false,
      alias: 'c',
      desc: uiText.descriptions.componentName
    });
  }

  function reactExtension() {
    generator.option('reactExtension', {
      type: String,
      required: false,
      alias: 'rx',
      desc: uiText.descriptions.reactExtension
    });
  }

  function packageManager() {
    generator.option('packageManager', {
      type: String,
      required: false,
      alias: 'pm',
      desc: uiText.descriptions.packageManager
    });
  }

  function registerSingleOption(optionName) {
    switch (optionName) {
      case 'appName':
        return appName();
      case 'packageName':
        return packageName();
      case 'modelName':
        return modelName();
      case 'componentName':
        return componentName();
      case 'reactExtension':
        return reactExtension();
      case 'packageManager':
        return packageManager();
      default:
        return undefined;
    }
  }

  optionNames.forEach(optionName => {
    registerSingleOption(optionName);
  });
}

module.exports = {
  setup: setup,
  register: register
};
