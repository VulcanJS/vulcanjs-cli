const chalk = require('chalk');
const VulcanGenerator = require('../../lib/VulcanGenerator');
const sh = require('../../lib/settingsHandler');
const sessionHandler = new sh();

module.exports = class extends VulcanGenerator {

  initializing() {
    return this.prompt([{
          type: 'list',
          name: 'action',
          message: 'Select a category to configure, or exit.',
          choices: [
            {name: 'Start options (port, packages location,...)', value: 'start', checked: false},
            {name: 'Site informations (title, image,...)', value: 'public', checked: false},
            {name: 'Emailing  (address, mailchimp,...)', value: 'emailing', checked: false},
            {name: 'Quit', value: 'quit', checked: false},
          ],
        }])
  }
  writing() {

    var env = process.env;
    var args = ['run'];
    const port = sessionHandler.getParamValue(null, 'port');
    if (port) {
      args.push('--port', port)
    }
    const packageLocation = sessionHandler.getParamValue(null, 'packageLocation');
    if (packageLocation) {
      env['METEOR_PACKAGE_DIRS'] = `${packageLocation}/packages` ;
    }
    this.log(chalk.green('\nStarting your app... \n'));
    this.spawnCommandSync(`meteor`, args,{env:env});
  }
};
