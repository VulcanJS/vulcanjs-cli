const VulcanGenerator = require('../../../lib/VulcanGenerator');
const ast = require('../../../lib/ast');

module.exports = class extends VulcanGenerator {
  initializing() {
    this._assert('isVulcan');
    this._assert('hasNonZeroPackages');
  }

  _registerArguments() {
    //TODO: add arguments for remove
  }

  prompting() {
    if (!this._canPrompt()) {
      return false;
    }
    const questions = this._getQuestions('packageNameWithNumModelsList', 'packageNameIfManual', 'routeNameList', 'routeNameIfManual', 'isDelete');
    return this.prompt(questions).then(answers => {
      this._assert('isDelete', answers.isDelete);
      this.props = {
        packageName: this._finalize('packageName', answers),
        routeName: this._finalize('raw', 'routeName', answers)
      };
    });
  }

  _updateRoutes() {
    const routesPath = this._getPath({ isAbsolute: true }, 'routes');
    const oldRoutes = this.fs.read(routesPath);
    const newRoutes = ast.removeRoute(oldRoutes, this.props.routeName);
    this.fs.write(routesPath, newRoutes);
    return true;
  }

  writing() {
    if (!this._canWrite()) {
      return false;
    }
    this._dispatch({
      type: 'REMOVE_ROUTE',
      packageName: this.props.packageName,
      routeName: this.props.routeName
    });
    this._updateRoutes();
    return this._commitStore();
  }

  end() {
    this._end();
  }
};
