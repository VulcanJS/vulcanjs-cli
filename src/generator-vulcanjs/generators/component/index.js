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
      'isContainer',
      'isRegister'
    );
    return this.prompt(questions)
    .then((answers) => {
      this.props = {
        packageName: this._finalize('packageName', answers),
        componentName: this._finalize('componentName', answers),
        containerName: this._finalize('containerName', answers),
        componentFileName: this._finalize('componentFileName', answers),
        containerFileName: this._finalize('containerFileName', answers),
        componentType: this._finalize('raw', 'componentType', answers),
        isContainer: this._finalize('raw', 'isContainer', answers),
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

  _writeContainer () {
    if (!this.props.isContainer) return;
    const templatePath = this.templatePath('container.js');
    this.fs.copyTpl(
      templatePath,
      this._getPath(
        { isAbsolute: true },
        'containers',
        this.props.containerFileName
      ),
      this.props
    );
  }

  _updateContainersIndex () {
    if (!this.props.isRegister) return;
    const containersIndexPath = this._getPath(
      { isAbsolute: true },
      'containersIndex'
    );
    const fileText = this.fs.read(containersIndexPath);
    const fileWithImportText = ast.addImportStatement(
      fileText,
      `./${this.props.containerFileName}`
    );
    this.fs.write(
      containersIndexPath,
      fileWithImportText
    );
  }

  writing () {
    if (!this._canWrite()) { return; }
    this._writeComponent();
    this._writeContainer();
    this._updateContainersIndex();
  }

  end () {
    this._end();
  }
};
