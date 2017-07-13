const VulcanGenerator = require('../../../lib/VulcanGenerator');
const ast = require('../../../lib/ast');

module.exports = class extends VulcanGenerator {
  initializing () {
    this._assert('isVulcan');
    this._assert('hasNonZeroPackages');
  }

  _registerArguments () {
    //TODO: add arguments for remove
  }

  prompting () {
    if (!this._canPrompt()) { return false; }
    const questions = this._getQuestions(
      'packageNameWithNumModelsList',
      'modelNameWithManualList'
    );
    return this.prompt(questions)
    .then((answers) => {
      this.props = {
        packageName: this._finalize('packageName', answers),
        modelName: this._finalize('modelName', answers),
      };
    });
  }

  _updateModelsIndex () {
    const modelsIndexPath = this._getPath(
      { isAbsolute: true },
      'modelsIndex'
    );
    const fileText = this.fs.read(modelsIndexPath);
    const fileWithImportText = ast.removeImportStatement(
      fileText,
      `./${this.props.modelName}/collection.js`
    );
    this.fs.write(
      modelsIndexPath,
      fileWithImportText
    );
  }

  _removeModelDir () {
    const sourceDir = this._getPath(
      { isAbsolute: true },
      'model'
    );
    this.fs.delete(sourceDir);
  }

  writing () {
    if (!this._canWrite()) { return false; }
    this._dispatch({
      type: 'REMOVE_MODEL',
      packageName: this.props.packageName,
      modelName: this.props.modelName,
    });
    this._removeModelDir();
    this._updateModelsIndex();
    return this._commitStore();
  }

  end () {
    this._end();
  }
};
