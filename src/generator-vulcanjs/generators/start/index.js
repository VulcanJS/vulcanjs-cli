const chalk = require('chalk');
const VulcanGenerator = require('../../lib/VulcanGenerator');

module.exports = class extends VulcanGenerator {

  default() {
    this.log(chalk.green('\nStarting your app... \n'));
    this.spawnCommandSync('meteor', ['run']);
  }
};
