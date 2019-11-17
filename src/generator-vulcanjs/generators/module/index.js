const VulcanGenerator = require('../../lib/VulcanGenerator');
const ast = require('../../lib/ast');

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
    let questions = [];
    if (this._needArg('packageName')) {
      questions = [...questions, ...this._getQuestions(
        'packageNameList'
      )];
    }
    if (this._needArg('moduleName')) {
      questions = [...questions, ...this._getQuestions('moduleName')];
    }
    return this.prompt(questions)
      .then((answers) => {
        this.props = {
          packageName: this._finalize('packageName', answers),
          moduleName: this._finalize('moduleName', answers),
          collectionName: this._finalize('collectionName', answers),
          typeName: this._finalize('pascalModuleName', answers),
        };
        this._composeGenerators();
      });
  }

  _composeGenerators() {
    const moduleParts = ['fragments', 'schema'];
    moduleParts.forEach((modulePart) => {
      const generator = require.resolve(`./${modulePart}`);
      const nextOptions = {
        ...this.options,
        ...this.props,
        dontAsk: true,
      };
      this.composeWith(generator, nextOptions);
    });
  }

  configuring() {
    if (!this._canConfigure()) { }
  }

  _writeCollection() {
    this.fs.copyTpl(
      this.templatePath('collection.js'),
      this._getPath(
        { isAbsolute: true },
        'module',
        'collection.js'
      ),
      this.props
    );
  }

  _writeTestCollection() {
    const testProps = {
      ...this.props,
      subjectName: 'collection',
      subjectPath: `../../../lib/modules/${this.props.moduleName}/fragments`,
    };
    this.fs.copyTpl(
      this.templatePath('generic-test.js'),
      this._getPath(
        { isAbsolute: true },
        'moduleTest',
        'collection.spec.js'
      ),
      testProps
    );
  }

  _updateModulesIndex() {
    const modulesIndexPath = this._getPath(
      { isAbsolute: true },
      'modulesIndex'
    );
    const fileText = this.fs.read(modulesIndexPath);
    const fileWithImportText = ast.addImportStatement(
      fileText,
      `./${this.props.moduleName}/collection.js`
    );
    this.fs.write(
      modulesIndexPath,
      fileWithImportText
    );
  }

  writing() {
    if (!this._canWrite()) { return; }
    this._writeCollection();
    this._updateModulesIndex();
    // this._writeTestCollection();
  }

  end() {
    this._end();
  }
};
