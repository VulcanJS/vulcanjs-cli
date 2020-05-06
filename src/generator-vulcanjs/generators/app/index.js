const chalk = require('chalk');
const VulcanGenerator = require('../../lib/VulcanGenerator');

const STARTER_REPO_URL = 'https://github.com/VulcanJS/Vulcan-Starter.git';
const STARTERS = [
  {name: "bootstrap", github: 'https://github.com/VulcanJS/Vulcan-Starter.git'},
  {name: "material", github: 'https://github.com/Neobii/Vulcan-Starter-Material.git'}
]

module.exports = class extends VulcanGenerator {
  _registerArguments () {
    this._registerOptions(
      'appName',
      'doShallowClone',
      'reactExtension',
      'packageManager',
      'style'
    );
  }

  initializing () {
    this._assert('notVulcan');
  }

  prompting () {
    if (!this._canPrompt()) {
      return false;
    }
    let questions = [];
    if (this._needArg('appName')) {
      questions = [...questions, ...this._getQuestions(
        'appName'
      )];
    }
    questions = [...questions, ...this._getQuestions('packageManager')];
    return this.prompt(questions).then((answers) => {
      this.props = {
        appName: this._finalize('appName', answers),
        packageManager: this._finalize('raw', 'packageManager', answers),
      };
    });
  }

  writing () {
    if (!this._canInstall()) {
      return;
    }
    const style = this.props.style && this.props.style.split('=')[1];
    const found = STARTERS.find( starter => {console.log(starter);return starter.name === style});
    console.log("no style argument --->", this.props, style)
    return;
    if(found) {
      this.log(chalk.green('\nPulling the most up to date Vulcan-Starter git repository... \n'));
      this.spawnCommandSync('git', [
        'clone',
        found.github,
        this.props.appName,
      ]);
    }

    else {
      this.log(chalk.green('\nPulling the most up to date Vulcan-Starter git repository... \n'));
      this.spawnCommandSync('git', [
        'clone',
        STARTER_REPO_URL,
        this.props.appName,
      ]);
    }

    this.destinationRoot(
      this.destinationPath(this.props.appName)
    );
    this.installDependencies({
      npm: this.props.packageManager === 'npm',
      bower: false,
      yarn: this.props.packageManager === 'yarn',
    });
    if (!this._canConfigure()) {
      return;
    }
    this._dispatch({
      type: 'SET_IS_VULCAN_TRUE',
    });
    this._dispatch({
      type: 'SET_APP_NAME',
      appName: this.props.appName,
    });
    this._dispatch({
      type: 'SET_PACKAGE_MANAGER',
      packageManager: this.props.packageManager,
    });
    this._commitStore();
  }

  end () {
    this._end();
    this.log(' ');
    this.log(chalk.green('Successfully generated vulcan code base. \n'));
    this.log(chalk.green('To run your new app: \n'));
    this.log(chalk.green(`  cd ${this.props.appName}`));
    this.log(chalk.green(`  ${this.props.packageManager} start \n`));
  }
};
