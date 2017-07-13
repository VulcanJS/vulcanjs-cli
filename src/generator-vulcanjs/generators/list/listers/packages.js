const VulcanGenerator = require('../../../lib/VulcanGenerator');
const store = require('../../../lib/store');

module.exports = class extends VulcanGenerator {
  initializing () {
    this._assert('isVulcan');
  }

  prompting () {
    this.props.packageNames = store.get('packageNames');
  }

  listing () {
    if (!this._canWrite()) return false;
    const packageLister = require.resolve('./package');
    this.props.packageNames.forEach((packageName) => {
      const newOptions = {
        ...this.options,
        ...this.props,
        packageName,
        dontAsk: true,
      };
      this.composeWith(packageLister, newOptions);
    });
  }

  end () {
    this._end();
  }
};
