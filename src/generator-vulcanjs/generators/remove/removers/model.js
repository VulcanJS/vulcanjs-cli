const VulcanGenerator = require('../../../lib/VulcanGenerator');
const ast = require('../../../lib/ast');

module.exports = class extends VulcanGenerator {
  initializing () {
    this._assert('isVulcan');
    this._assert('hasNonZeroPackages');
  }

  _registerArguments () {
    // TODO: add arguments for remove
  }

  prompting () {
    if (!this._canPrompt()) { return false; }
    const questions = this._getQuestions(
      'packageNameWithNumModelsList',
      'modelNameList',
      'isDelete'
    );
    return this.prompt(questions)
      .then((answers) => {
        this._assert('isDelete', answers.isDelete);
        this.props = {
          packageName: this._finalize('packageName', answers),
          modelName: this._finalize('modelName', answers),
        };
      });
  }

  _updateModulesIndex () {
    const modulesIndexPath = this._getPath(
      { isAbsolute: true },
      'modulesIndex'
    );
    const fileText = this.fs.read(modulesIndexPath);
    const fileWithImportText = ast.removeImportStatement(
      fileText,
      `./${this.props.modelName}/collection.js`
    );
    this.fs.write(
      modulesIndexPath,
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
    this._updateModulesIndex();
    return this._commitStore();
  }

  end () {
    this._end();
  }
};
