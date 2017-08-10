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
      'modelName'
    );
  }

  prompting () {
    if (!this._canPrompt()) { return false; }
    const questions = this._getQuestions(
      'packageNameWithManualList',
      'packageNameIfManual',
      'modelName',
      'isAddCustomResolvers',
      'isAddCustomMutations'
    );
    return this.prompt(questions)
    .then((answers) => {
      this.props = {
        packageName: this._finalize('packageName', answers),
        modelName: this._finalize('modelName', answers),
        collectionName: this._finalize('collectionName', answers),
        typeName: this._finalize('pascalModelName', answers),
        isAddCustomResolvers: this._finalize('raw', 'isAddCustomResolvers', answers),
        isAddCustomMutations: this._finalize('raw', 'isAddCustomMutations', answers),
      };
      this._composeGenerators();
    });
  }

  _composeGenerators () {
    function composeWithModelPart (modelPart) {
      const generator = require.resolve(`./${modelPart}`);
      const nextOptions = {
        ...this.options,
        ...this.props,
        dontAsk: true,
      };
      this.composeWith(generator, nextOptions);
    }
    const boundCompose = composeWithModelPart.bind(this);
    const modelParts = ['fragments', 'schema', 'permissions', 'parameters'];
    if (this.props.isAddCustomResolvers) modelParts.push('resolvers');
    if (this.props.isAddCustomMutations) modelParts.push('mutations');
    modelParts.forEach(boundCompose);
  }

  configuring () {
    if (!this._canConfigure()) { return; }
    this._dispatch({
      type: 'ADD_MODEL',
      packageName: this.props.packageName,
      modelName: this.props.modelName,
    });
    this._commitStore();
  }

  _writeCollection () {
    this.fs.copyTpl(
      this.templatePath('collection.js'),
      this._getPath(
        { isAbsolute: true },
        'model',
        'collection.js'
      ),
      this.props
    );
  }

  _writeTestCollection () {
    const testProps = {
      ...this.props,
      subjectName: 'collection',
      subjectPath: `../../../lib/models/${this.props.modelName}/fragments`,
    };
    this.fs.copyTpl(
      this.templatePath('generic-test.js'),
      this._getPath(
        { isAbsolute: true },
        'modelTest',
        'collection.spec.js'
      ),
      testProps
    );
  }

  _updateModulesIndex () {
    const modulesIndexPath = this._getPath(
      { isAbsolute: true },
      'modulesIndex'
    );
    const fileText = this.fs.read(modulesIndexPath);
    const fileWithImportText = ast.addImportStatement(
      fileText,
      `./${this.props.modelName}/collection.js`
    );
    this.fs.write(
      modulesIndexPath,
      fileWithImportText
    );
  }

  writing () {
    if (!this._canWrite()) { return; }
    this._writeCollection();
    this._updateModulesIndex();
    // this._writeTestCollection();
  }

  end () {
    this._end();
  }
};
