const chalk = require('chalk');
const VulcanGenerator = require('../../lib/VulcanGenerator');

module.exports = class extends VulcanGenerator {
  _registerArguments() {
    this._registerOptions('appName', 'doShallowClone', 'reactExtension', 'packageManager');
  }

  initializing() {
    this._assert('notVulcan');
  }

  prompting() {
    if (!this._canPrompt()) {
      return false;
    }
    const questions = this._getQuestions('appName',
    // 'doShallowClone',
    // 'reactExtension',
    'packageManager');
    return this.prompt(questions).then(answers => {
      this.props = {
        appName: this._finalize('appName', answers),
        // reactExtension: this._finalize('raw', 'reactExtension', answers),
        // doShallowClone: this._finalize('raw', 'doShallowClone', answers),
        packageManager: this._finalize('raw', 'packageManager', answers)
      };
    });
  }

  writing() {
    if (!this._canInstall()) {
      return;
    }
    this.log(chalk.green('\nPulling the most up to date git repository... \n'));
    this.spawnCommandSync('git', ['clone', 'https://github.com/Vulcanjs/Vulcan', this.props.appName]);
    this.destinationRoot(this.destinationPath(this.props.appName));
    this.installDependencies({
      npm: this.props.packageManager === 'npm',
      bower: false,
      yarn: this.props.packageManager === 'yarn'
    });
    if (!this._canConfigure()) {
      return;
    }
    this._dispatch({
      type: 'SET_IS_VULCAN_TRUE'
    });
    this._dispatch({
      type: 'SET_APP_NAME',
      appName: this.props.appName
    });
    this._dispatch({
      type: 'SET_PACKAGE_MANAGER',
      packageManager: this.props.packageManager
    });
    this._commitStore();
  }

  end() {
    this._end();
    if (!this._hasNoErrors()) {
      return;
    }
    this.log(' ');
    this.log(chalk.green('Successfully generated vulcan code base. \n'));
    this.log(chalk.green('To run your new app: \n'));
    this.log(chalk.green(`  cd ${this.props.appName}`));
    this.log(chalk.green(`  ${this.props.packageManager} start \n`));
  }
};
