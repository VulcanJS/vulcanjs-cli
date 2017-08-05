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
      // 'modelName',
      'componentName'
    );
  }

  prompting () {
    if (!this._canPrompt()) { return false; }
    const questions = this._getQuestions(
      'packageNameList',
      'packageNameIfManual',
      // 'modelNameList',
      // 'modelNameIfManual',
      'componentName',
      'componentType',
      'isRegisterComponent'
    );
    return this.prompt(questions)
    .then((answers) => {
      this.props = {
        packageName: this._finalize('packageName', answers),
        // modelName: this._finalize('modelName', answers),
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

  _updateRegisteredComponents () {
    if (!this.props.isRegister) return;
    const registeredComponentsPath = this._getPath(
      { isAbsolute: true },
      'registeredComponents'
    );
    const fileText = this.fs.read(registeredComponentsPath);
    const fileWithImportText = ast.addImportStatement(
      fileText,
      `../components/${this.props.componentFileName}`
    );
    this.fs.write(
      registeredComponentsPath,
      fileWithImportText
    );
  }

  writing () {
    if (!this._canWrite()) { return; }
    this._writeComponent();
    this._updateRegisteredComponents();
  }

  end () {
    this._end();
  }
};
