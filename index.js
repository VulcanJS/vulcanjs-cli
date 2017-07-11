const yeoman = require('yeoman-environment');
const parseArgs = require('minimist');
// const optionsManager = require('generator-vulcanjs/lib/optionsManager');

const appGenerator = require.resolve('generator-vulcanjs/generators/app');
const packageGenerator = require.resolve('generator-vulcanjs/generators/package');
const modelGenerator = require.resolve('generator-vulcanjs/generators/model');
const componentGenerator = require.resolve('generator-vulcanjs/generators/component');
const routeGenerator = require.resolve('generator-vulcanjs/generators/route');
const remover = require.resolve('generator-vulcanjs/generators/remove');

const env = yeoman.createEnv();

env.register(appGenerator, 'vulcanjs:app');
env.register(packageGenerator, 'vulcanjs:package');
env.register(modelGenerator, 'vulcanjs:model');
env.register(componentGenerator, 'vulcanjs:component');
env.register(routeGenerator, 'vulcanjs:route');
env.register(remover, 'vulcanjs:remove');

const options = parseArgs(process.argv.slice(2));

function runWithOptions (generator, callback) {
  env.run(generator, options, callback);
}

runWithOptions('vulcanjs:package');
