const chalk = require('chalk');
const VulcanGenerator = require('../../lib/VulcanGenerator');

module.exports = class extends VulcanGenerator {

  default() {

    this.log(chalk.green('\nPulling the full git repository... \n'));
    this.spawnCommandSync('git', ['pull', '--unshallow']);
  }
};
