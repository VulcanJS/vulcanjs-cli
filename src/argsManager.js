const minimist = require('minimist');
const _ = require('lodash');
const chalk = require('chalk');

const recognizedActions = {
  generate: 'generate',
  g: 'generate',
  create: 'create',
  c: 'create',
  remove: 'remove',
  r: 'remove',
  list: 'list',
  l: 'list',
  i: 'init',
  init: 'init',
};

const errors = {
  unrecognizedCommand: 'Command not recognized. Try: create, generate and remove'
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
};

const createProcessor = (args) => ({
  type: 'create',
  args: args.slice(1),
});

const argsProcessors = {
  init: genericProcessor,
  generate: genericProcessor,
  remove: genericProcessor,
  list: genericProcessor,
  create: createProcessor,
};

function usage(){
    const values = _.uniq(_.values(recognizedActions))
    console.log(chalk.green('\nvulcanjs usage:'))
    console.log(chalk.grey('\nSynopsis'))
    console.log('  vulcanjs <action> <object> <...>\n');
    console.log('    <action>   Operation to perform ');
    console.log('    <object>   Asset type (contextual to action)');
    console.log('    <...>      Parameters. If not provided, interactively entered');
    console.log(chalk.grey('\nProject initialisation'))
    console.log('  vulcanjs create <appName>');
    console.log('  vulcanjs init <appName>');
    console.log(chalk.grey('\nAssets creation'))
    console.log('  vulcanjs (generate|g) package <packageName>');
    console.log('  vulcanjs (generate|g) model <packageName> <modelName>');
    console.log('  vulcanjs (generate|g) component <packageName> <modelName> <componentName>');
    console.log('  vulcanjs (generate|g) route <packageName> <routeName> <routePath>');
    console.log(chalk.grey('\nAssets removal'))
    console.log('  vulcanjs (remove|r) package');
    console.log('  vulcanjs (remove|r) model');
    console.log(chalk.grey('\nAssets listing'))
    console.log('  vulcanjs (list|l) routes');
    console.log('  vulcanjs (list|l) packages');
    process.exit();
}

function getAction () {
  const args = minimist(process.argv.slice(2))._;

  if (!recognizedActions[args[0]]) {
      usage();
  }
  const actionName = recognizedActions[args[0]];
  const actionObj = argsProcessors[actionName](args);
  return actionObj;
}

module.exports = {
  getAction,
};
