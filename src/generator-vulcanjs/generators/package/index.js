const chalk = require('chalk');
const VulcanGenerator = require('../../lib/VulcanGenerator');

module.exports = class extends VulcanGenerator {
  initializing () {
    this._assert('isVulcan');
  }

  _registerArguments () {
    this._registerOptions(
      'packageName'
    );
  }

  prompting () {
    if (!this._canPrompt()) { return false; }
    const questions = this._getQuestions(
      'packageName'
    );
    return this.prompt(questions).then((answers) => {
      this.props = {
        packageName: this._finalize('packageName', answers),
        vulcanDependencies: ['\'vulcan:core\''],
        isPackageAutoAdd: this._finalize('raw', 'isPackageAutoAdd', answers),
      };
      this._assert('notPackageExists', this.props.packageName);
    });
  }

  configuring () {
    if (!this._canConfigure()) { return; }
    this._dispatch({
      type: 'ADD_PACKAGE',
      packageName: this.props.packageName,
    });
    this._commitStore();
  }

  _writePackageJs () {
    this.fs.copyTpl(
      this.templatePath('package.js'),
      this._getPath(
        { isAbsolute: true },
        'package',
        'package.js'
      ),
      this.props
    );
  }

  _writeClientMain () {
    this.fs.copyTpl(
      this.templatePath('client.js'),
      this._getPath(
        { isAbsolute: true },
        'client',
        'main.js'
      ),
      this.props
    );
  }

  _writeServerMain () {
    this.fs.copyTpl(
      this.templatePath('server.js'),
      this._getPath(
        { isAbsolute: true },
        'server',
        'main.js'
      ),
      this.props
    );
  }

  _writeServerSeed () {
    this.fs.copyTpl(
      this.templatePath('seed.js'),
      this._getPath(
        { isAbsolute: true },
        'server',
        'seed.js'
      ),
      this.props
    );
  }

  _writeModulesIndex () {
    this.fs.copyTpl(
      this.templatePath('modules.index.js'),
      this._getPath(
        { isAbsolute: true },
        'modulesIndex'
      ),
      this.props
    );
  }

  _writeComponentsIndex () {
    this.fs.copyTpl(
      this.templatePath('components.index.js'),
      this._getPath(
        { isAbsolute: true },
        'componentsIndex'
      ),
      this.props
    );
  }

  _writeModelsIndex () {
    this.fs.copyTpl(
      this.templatePath('models.index.js'),
      this._getPath(
        { isAbsolute: true },
        'modelsIndex'
      ),
      this.props
    );
  }

  _writeRoutes () {
    this.fs.copyTpl(
      this.templatePath('routes.js'),
      this._getPath(
        { isAbsolute: true },
        'routes'
      ),
      this.props
    );
  }

  // _writeTestsIndex () {
  //   this.fs.copyTpl(
  //     this.templatePath('tests-index.js'),
  //     this._getPath(
  //       { isAbsolute: true },
  //       'packageTests',
  //       'index.js'
  //     ),
  //     this.props
  //   );
  // }

  writing () {
    if (!this._canWrite()) { return; }
    this._writePackageJs();
    this._writeClientMain();
    this._writeServerMain();
    this._writeServerSeed();
    this._writeModulesIndex();
    // this._writeTestsIndex();
    this._writeComponentsIndex();
    this._writeRoutes();
    this._writeModelsIndex();
  }

  end () {
    this._end();
    if (!this._hasNoErrors()) { return; }
    this.log(`\nTo activate your package, run: ${chalk.green(`meteor add ${this.props.packageName}`)}`);
  }
};
