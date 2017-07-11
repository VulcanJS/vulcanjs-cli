const VulcanGenerator = require('../../../lib/VulcanGenerator');

module.exports = class extends VulcanGenerator {
  initializing() {
    this._assert('isVulcan');
    this._assert('hasNonZeroPackages');
  }

  _registerArguments() {
    //TODO: add arguments for remove
  }

  prompting() {
    if (!this._canPrompt()) {
      return false;
    }
    const questions = this._getQuestions('packageNameWithNumModulesList', 'modelNameList');
    return this.prompt(questions).then(answers => {
      this.props = {
        packageName: this._finalize('packageName', answers),
        modelName: this._finalize('modelName', answers)
      };
    });
  }

  writing() {
    if (!this._canWrite()) {
      return false;
    }
    const sourceDir = this._getPath({ isAbsolute: true }, 'model');
    this.fs.delete(sourceDir);
    this._dispatch({
      type: 'REMOVE_MODULE',
      packageName: this.props.packageName,
      modelName: this.props.modelName
    });
    return this._commitStore();
  }

  end() {
    this._end();
  }
};
