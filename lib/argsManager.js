const minimist = require('minimist');

function getAction () {
  const mainOptionDefinitions = [
    {
      name: 'action',
      type: String,
      multiple: true,
      defaultOption: true
    },
  ];
  const recognizedActions = {
    generate: 'generate',
    g: 'generate',
    create: 'create',
    c: 'create',
    remove: 'remove',
    r: 'remove',
  };
  const genericProcessor = (args) => {
    const argsToProcess = args.slice(1);
    const action = {
      type: recognizedActions[args[0]],
      args: [],
    };
    if (argsToProcess.length > 0) {
      action.component = argsToProcess[0];
    }
    argsToProcess.shift();
    if (argsToProcess.length > 0) {
      action.args = argsToProcess;
    }
    return action;
  }
  const createProcessor = (args) => {
    return {
      type: 'create',
      args: args.slice(1),
    };
  }
  const argsProcessors = {
    generate: genericProcessor,
    remove: genericProcessor,
    create: createProcessor,
  };
  const errors = {
    unrecognizedCommand: 'Command not recognized. Try: create, generate and remove',
  };
  const args = minimist(process.argv.slice(2))._;

  if (!recognizedActions[args[0]]) {
    throw new Error(errors.unrecognizedCommand);
  }
  const actionName = recognizedActions[args[0]];
  const actionObj = argsProcessors[actionName](args);
  return actionObj;
}

module.exports = {
  getAction: getAction,
};
