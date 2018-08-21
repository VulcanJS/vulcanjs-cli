const VulcanGenerator = require('../../../lib/VulcanGenerator');

module.exports = class extends VulcanGenerator {
  initializing() {
    this._assert('isVulcan');
    this._assert('hasNonZeroPackages');
  }

  _registerArguments() {
    this._registerOptions(
      'packageName',
      'moduleName'
    );
  }

  prompting() {
    if (!this._canPrompt()) { return false; }
    const questions = this._getQuestions(
      'packageNameWithNumModulesList',
      'moduleNameList'
    );
    return this.prompt(questions)
      .then((answers) => {
        this.props = {
          packageName: this._finalize('packageName', answers),
          moduleName: this._finalize('moduleName', answers),
          parametersName: this._finalize('moduleName', answers),
        };
      });
  }

  _writeParameters() {
    this.fs.copyTpl(
      this.templatePath('parameters.js'),
      this._getPath(
        { isAbsolute: true },
        'module',
        'parameters.js'
      ),
      this.props
    );
  }

  _writeTestParameters() {
    const testFragmentsProps = {
      ...this.props,
      subjectName: 'parameters',
      subjectPath: `../../../lib/modules/${this.props.moduleName}/parameters`,
    };
    this.fs.copyTpl(
      this.templatePath('../../templates/generic-test.js'),
      this._getPath(
        { isAbsolute: true },
        'moduleTest',
        'parameters.spec.js'
      ),
      testFragmentsProps
    );
  }

  writing() {
    if (!this._canWrite()) { return; }
    this._writeParameters();
    // this._writeTestParameters();
  }

  end() {
    this._end();
  }
};
