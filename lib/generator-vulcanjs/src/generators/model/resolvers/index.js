const VulcanGenerator = require('../../../lib/VulcanGenerator');

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
      'packageNameWithNumModelsList',
      'modelNameList',
      'defaultResolvers'
    );
    return this.prompt(questions)
    .then((answers) => {
      this.props = {
        packageName: this._finalize('packageName', answers),
        modelName: this._finalize('modelName', answers),
        collectionName: this._finalize('collectionName', answers),
        listResolverName: this._finalize('resolverName', 'List', answers),
        singleResolverName: this._finalize('resolverName', 'Single', answers),
        totalResolverName: this._finalize('resolverName', 'Total', answers),
        hasListResolver: this._finalize('hasResolver', 'list', answers),
        hasSingleResolver: this._finalize('hasResolver', 'single', answers),
        hasTotalResolver: this._finalize('hasResolver', 'total', answers),
      };
    });
  }

  _writeResolvers () {
    this.fs.copyTpl(
      this.templatePath('resolvers.js'),
      this._getPath(
        { isAbsolute: true },
        'model',
        'resolvers.js'
      ),
      this.props
    );
  }

  _writeTestResolvers () {
    const testProps = {
      ...this.props,
      subjectName: 'resolvers',
      subjectPath: '../resolvers',
    };
    this.fs.copyTpl(
      this.templatePath('test.js'),
      this._getPath(
        { isAbsolute: true },
        'modelTest',
        'resolvers.js'
      ),
      testProps
    );
  }

  writing () {
    if (!this._canWrite()) { return; }
    this._writeResolvers();
    this._writeTestResolvers();
  }

  end () {
    this._end();
  }
};
