const uiText = require('./ui-text');

const allOptions = {
  appName: {
    type: String,
    required: false,
    alias: 'n',
    desc: uiText.descriptions.appName,
  },
  packageName: {
    type: String,
    required: false,
    alias: 'p',
    desc: uiText.descriptions.packageName,
  },
  moduleName: {
    type: String,
    required: false,
    alias: 'm',
    desc: uiText.descriptions.moduleName,
  },
  componentName: {
    type: String,
    required: false,
    alias: 'c',
    desc: uiText.descriptions.componentName,
  },
  layoutName: {
    type: String,
    required: false,
    alias: 'l',
    desc: uiText.descriptions.layoutName,
  },
  routeName: {
    type: String,
    required: false,
    alias: 'r',
    desc: uiText.descriptions.routeName,
  },
  routePath: {
    type: String,
    required: false,
    alias: 'rp',
    desc: uiText.descriptions.routePath,
  },
  packageManager: {
    type: String,
    required: false,
    alias: 'pm',
    desc: uiText.descriptions.packageManager,
  },
  dontAsk: {
    type: Boolean,
    required: false,
    alias: 'd',
    desc: uiText.descriptions.dontAsk,
  },
  vulcanjsRemovableComponent: {
    type: String,
    required: false,
    alias: 'vc',
    desc: uiText.descriptions.vulcanjsRemovableComponent,
  },
  vulcanjsListableComponent: {
    type: String,
    required: false,
    alias: 'vc',
    desc: uiText.descriptions.vulcanjsListableComponent,
  },
};

function setup(generatorSetup) {
  const generator = generatorSetup;
  function register(...optionNames) {
    function registerSingleOption(optionName) {
      generator.option(
        optionName,
        allOptions[optionName]
      );
    }

    optionNames.forEach((optionName) => {
      registerSingleOption(optionName);
    });
  }
  return register;
}

module.exports = {
  setup,
  allOptions,
};
