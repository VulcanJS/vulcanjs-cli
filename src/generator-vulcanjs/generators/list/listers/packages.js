const VulcanGenerator = require('../../../lib/VulcanGenerator');
const store = require('../../../lib/store');

module.exports = class extends VulcanGenerator {
  initializing () {
    this._assert('isVulcan');
  }

  listing () {
    if (!this._canWrite()) return false;
    const allPackages = store.get('allPackages');
    console.log(allPackages);
  }

  end () {
    this._end();
  }
};
