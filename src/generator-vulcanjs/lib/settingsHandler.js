const store = require('mem-fs').create();
const memFs = require('mem-fs-editor').create(store);

/**
 * 
 * @returns {nm$_settingsHandler.settingsHandler.instance}
 */
module.exports = class settingsHandler {

  /**
   * 
   * @returns {undefined}
   */
  getSettings() {
    // Make sure the settings.json file exists
    this.settings = memFs.readJSON('settings.json');
    if (!this.settings) {
      this.settings = memFs.readJSON('sample_settings.json');
      if (!this.settings) {
        throw('Failed to retrieve a sample settings.json!');
      }
      this.copiedSample = true;
    }
  }
  /**
   * 
   * @param {type} action
   * @param {type} key
   * @returns {thissettings.public|settingsHandler.this.getParamValue.value|this.settings}
   */
  getParamValue(action, key) {

    var value;
    if (!this.settings) {
      this.getSettings();
    }
    value = (action === 'public' ? this.settings['public'][key] : this.settings[key]);
    return value;

  }
  /**
   * 
   * @param {type} action
   * @param {type} key
   * @param {type} value
   * @returns {undefined}
   */
  setValue(action, key, value) {
    if (action === 'public') {
      this.settings['public'][key] = value;
    } else {
      this.settings[key] = value;
    }
    memFs.writeJSON('settings.json', this.settings)
    memFs.commit([], () => {
    })
  }

}

