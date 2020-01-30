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
      'packageNameWithNumModulesList',
      'moduleNameList',
      'isDelete'
    );
    return this.prompt(questions)
      .then((answers) => {
        this._assert('isDelete', answers.isDelete);
        this.props = {
          packageName: this._finalize('packageName', answers),
          moduleName: this._finalize('moduleName', answers),
        };
      });
  }

  _updateCollectionsIndex () {
    const modulesCollectionsPath = this._getPath(
      { isAbsolute: true },
      'collectionsIndex'
    );
    const fileText = this.fs.read(collectionsIndexPath);
    const fileWithImportText = ast.removeImportStatement(
      fileText,
      `./${this.props.moduleName}/collection.js`
    );
    this.fs.write(
      collectionsIndexPath,
      fileWithImportText
    );
  }

  _removeModuleDir () {
    const sourceDir = this._getPath(
      { isAbsolute: true },
      'module'
    );
    this.fs.delete(sourceDir);
  }

  writing () {
    if (!this._canWrite()) { return false; }
    this._removeModuleDir();
    this._updateCollectionsIndex();
  }

  end () {
    this._end();
  }
};
