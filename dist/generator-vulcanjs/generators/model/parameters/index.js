var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const VulcanGenerator = require('../../../lib/VulcanGenerator');

module.exports = class extends VulcanGenerator {
  initializing() {
    this._assert('isVulcan');
    this._assert('hasNonZeroPackages');
  }

  _registerArguments() {
    this._registerOptions('packageName', 'modelName');
  }

  prompting() {
    if (!this._canPrompt()) {
      return false;
    }
    const questions = this._getQuestions('packageNameWithNumModelsList', 'modelNameList');
    return this.prompt(questions).then(answers => {
      this.props = {
        packageName: this._finalize('packageName', answers),
        modelName: this._finalize('modelName', answers),
        parametersName: this._finalize('modelName', answers)
      };
    });
  }

  _writeParameters() {
    this.fs.copyTpl(this.templatePath('parameters.js'), this._getPath({ isAbsolute: true }, 'model', 'parameters.js'), this.props);
  }

  _writeTestParameters() {
    const testFragmentsProps = _extends({}, this.props, {
      subjectName: 'parameters',
      subjectPath: `../../../lib/models/${this.props.modelName}/parameters`
    });
    this.fs.copyTpl(this.templatePath('../../templates/generic-test.js'), this._getPath({ isAbsolute: true }, 'modelTest', 'parameters.spec.js'), testFragmentsProps);
  }

  writing() {
    if (!this._canWrite()) {
      return;
    }
    this._writeParameters();
    this._writeTestParameters();
  }

  end() {
    this._end();
  }
};
