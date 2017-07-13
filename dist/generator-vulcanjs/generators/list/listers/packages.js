var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const VulcanGenerator = require('../../../lib/VulcanGenerator');
const store = require('../../../lib/store');

module.exports = class extends VulcanGenerator {
  initializing() {
    this._assert('isVulcan');
  }

  prompting() {
    this.props.packageNames = store.get('packageNames');
  }

  listing() {
    if (!this._canWrite()) return false;
    const packageLister = require.resolve('./package');
    this.props.packageNames.forEach(packageName => {
      const newOptions = _extends({}, this.options, this.props, {
        packageName: packageName,
        dontAsk: true
      });
      this.composeWith(packageLister, newOptions);
    });
  }

  end() {
    this._end();
  }
};
