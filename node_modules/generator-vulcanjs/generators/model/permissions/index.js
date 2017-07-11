var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const VulcanGenerator = require('../../../lib/VulcanGenerator');

module.exports = class extends VulcanGenerator {
  initializing() {
    this._assert('isVulcan');
    this._assert('hasNonZeroPackages');
  }

  _registerArguments() {
    this._registerOptions('packageName', 'modelName');
  }

  prompting() {
    if (!this._canPrompt()) {
      return false;
    }
    const questions = this._getQuestions('packageNameWithNumModulesList', 'modelNameList');
    return this.prompt(questions).then(answers => {
      this.props = {
        packageName: this._finalize('packageName', answers),
        modelName: this._finalize('modelName', answers),
        newPermission: this._finalize('permissionName', ['new'], answers),
        editOwnPermission: this._finalize('permissionName', ['edit', 'own'], answers),
        editAllPermission: this._finalize('permissionName', ['edit', 'all'], answers),
        removeOwnPermission: this._finalize('permissionName', ['remove', 'own'], answers),
        removeAllPermission: this._finalize('permissionName', ['remove', 'all'], answers)
      };
    });
  }

  _writePermissions() {
    this.fs.copyTpl(this.templatePath('permissions.js'), this._getPath({ isAbsolute: true }, 'model', 'permissions.js'), this.props);
  }

  _writeTestPermissions() {
    const testProps = _extends({}, this.props, {
      subjectName: 'permissions',
      subjectPath: '../permissions'
    });
    this.fs.copyTpl(this.templatePath('test.js'), this._getPath({ isAbsolute: true }, 'modelTest', 'permissions.js'), testProps);
  }

  writing() {
    if (!this._canWrite()) {
      return;
    }
    this._writePermissions();
    this._writeTestPermissions();
  }

  end() {
    this._end();
  }
};
