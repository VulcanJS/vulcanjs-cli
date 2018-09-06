const VulcanGenerator = require('../../../lib/VulcanGenerator');

module.exports = class extends VulcanGenerator {
  initializing () {
    this._assert('isVulcan');
    this._assert('hasNonZeroPackages');
  }

  _registerArguments () {
    this._registerOptions('packageName', 'moduleName');
  }

  prompting () {
    if (!this._canPrompt()) {
      return false;
    }
    const questions = this._getQuestions(
      'packageNameWithNumModulesList',
      'moduleNameList'
    );
    return this.prompt(questions).then((answers) => {
      this.props = {
        packageName: this._finalize('packageName', answers),
        moduleName: this._finalize('moduleName', answers),
        newPermission: this._finalize('permissionName', ['create'], answers),
        editOwnPermission: this._finalize(
          'permissionName',
          ['update', 'own'],
          answers
        ),
        editAllPermission: this._finalize(
          'permissionName',
          ['update', 'all'],
          answers
        ),
        removeOwnPermission: this._finalize(
          'permissionName',
          ['delete', 'own'],
          answers
        ),
        removeAllPermission: this._finalize(
          'permissionName',
          ['delete', 'all'],
          answers
        ),
      };
    });
  }

  _writePermissions () {
    this.fs.copyTpl(
      this.templatePath('permissions.js'),
      this._getPath({ isAbsolute: true }, 'module', 'permissions.js'),
      this.props
    );
  }

  _writeTestPermissions () {
    const testProps = {
      ...this.props,
      subjectName: 'permissions',
      subjectPath: `../../../lib/modules/${this.props.moduleName}/permissions`,
    };
    this.fs.copyTpl(
      this.templatePath('../../templates/generic-test.js'),
      this._getPath({ isAbsolute: true }, 'moduleTest', 'permissions.spec.js'),
      testProps
    );
  }

  writing () {
    if (!this._canWrite()) {
      return;
    }
    this._writePermissions();
    // this._writeTestPermissions();
  }

  end () {
    this._end();
  }
};
