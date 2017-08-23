'use strict';

var minimist = require('minimist');
var _ = require('lodash');
var chalk = require('chalk');

var recognizedActions = {
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
  start: 'start',
  conf: 'config',
  config: 'config',
  configure: 'config'
};

var genericProcessor = function genericProcessor(args) {
  var argsToProcess = args.slice(1);
  var action = {
    type: recognizedActions[args[0]],
    args: []
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

var createProcessor = function createProcessor(args) {
  return {
    type: 'create',
    args: args.slice(1)
  };
};

var argsProcessors = {
  init: genericProcessor,
  generate: genericProcessor,
  remove: genericProcessor,
  list: genericProcessor,
  create: createProcessor,
  start: genericProcessor,
  config: genericProcessor
};

function usage() {
  var values = _.uniq(_.values(recognizedActions));
  console.log(chalk.green('\nvulcan usage:'));
  console.log(chalk.grey('\nSynopsis'));
  console.log('  vulcan <action> <object> <...>\n');
  console.log('    <action>   Operation to perform ');
  console.log('    <object>   Asset type (contextual to action)');
  console.log('    <...>      Parameters. If not provided, interactively entered');
  console.log(chalk.grey('\nProject run'));
  console.log('  vulcan start');
  console.log(chalk.grey('\nProject initialisation'));
  console.log('  vulcan create <appName>');
  console.log('  vulcan init <appName>');
  console.log(chalk.grey('\nProject settings'));
  console.log('  vulcan conf|configure');
  console.log(chalk.grey('\nAssets creation'));
  console.log('  vulcan (generate|g) package <packageName>');
  console.log('  vulcan (generate|g) model <packageName> <modelName>');
  console.log('  vulcan (generate|g) component <packageName> <modelName> <componentName>');
  console.log('  vulcan (generate|g) route <packageName> <routeName> <routePath>');
  console.log(chalk.grey('\nAssets removal'));
  console.log('  vulcan (remove|r) package');
  console.log('  vulcan (remove|r) model');
  console.log(chalk.grey('\nAssets listing'));
  console.log('  vulcan (list|l) routes');
  console.log('  vulcan (list|l) packages');
  process.exit();
}

function getAction() {
  var args = minimist(process.argv.slice(2))._;

  if (!recognizedActions[args[0]]) {
    usage();
  }
  var actionName = recognizedActions[args[0]];
  var actionObj = argsProcessors[actionName](args);
  return actionObj;
}

module.exports = {
  getAction: getAction
};
