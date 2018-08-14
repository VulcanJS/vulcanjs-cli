const VulcanGenerator = require('../../lib/VulcanGenerator');
const ast = require('../../lib/ast');

module.exports = class extends VulcanGenerator {
  initializing () {
    this._assert('isVulcan');
    this._assert('hasNonZeroPackages');
  }

  _registerArguments () {
    this._registerOptions(
      'packageName',
      'componentName'
    );
  }

  prompting () {
    if (!this._canPrompt()) { return false; }
    const questions = this._getQuestions(
      'packageNameList',
      'packageNameIfManual',
      'componentName',
      'componentType',
      'isRegisterComponent'
    );
    return this.prompt(questions)
      .then((answers) => {
        this.props = {
          packageName: this._finalize('packageName', answers),
          componentName: this._finalize('componentName', answers),
          componentFileName: this._finalize('componentFileName', answers),
          componentType: this._finalize('raw', 'componentType', answers),
          isRegister: this._finalize('raw', 'isRegister', answers),
        };
        this.props.componentPath = this._finalize('componentPath', answers);
      });
  }

  _writeComponent () {
    const templatePath = this.props.componentType === 'pure' ?
      this.templatePath('pureFunctionComponent.js') :
      this.templatePath('classComponent.js');
    this.fs.copyTpl(
      templatePath,
      this._getPath(
        { isAbsolute: true },
        'components',
        this.props.componentFileName
      ),
      this.props
    );
  }

  _updateComponentsIndex () {
    if (!this.props.isRegister) return;
    const componentsIndexPath = this._getPath(
      { isAbsolute: true },
      'componentsIndex'
    );
    const fileText = this.fs.read(componentsIndexPath);
    const fileWithImportText = ast.addImportStatement(
      fileText,
      `./${this.props.componentFileName}`
    );
    this.fs.write(
      componentsIndexPath,
      fileWithImportText
    );
  }

  writing () {
    if (!this._canWrite()) { return; }
    this._writeComponent();
    this._updateComponentsIndex();
  }

  end () {
    this._end();
  }
};
