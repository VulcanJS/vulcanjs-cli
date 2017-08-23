const chalk = require('chalk');
const VulcanGenerator = require('../../lib/VulcanGenerator');
const confQuestions = require("./questions");
const store = require('mem-fs').create();
const memFs = require('mem-fs-editor').create(store);

module.exports = class extends VulcanGenerator {
  _registerArguments() {
  }
  initializing() {
    this._getQuestions = confQuestions.setup();

    // Ensure vulcan project
    this._assert('isVulcan');
    if (!this._canPrompt()) {
      return false;
    }

    // Move to project root
    this.destinationRoot(
      this.destinationPath()
      );

    // Make sure the settings.json file exists
    this.settings = memFs.readJSON("settings.json")
    if (!this.settings) {
      this.settings = memFs.readJSON("sample_settings.json")
      if (!this.settings) {
        throw("Failed to retrieve a sample settings.json!");
      }
      this.copiedSample = true;
    }

    // Prompt for questions
    return this.prompt([{
        type: 'checkbox',
        pageSize: 20,
        name: 'parametersList',
        message: 'Which parameters do you want to configure',
        choices: [
          {name: 'Port', value: 'port', checked: false},
        ],
      }]).then((answers) => {
      this.questionsList = answers.parametersList;
    });
    ;
  }

  prompting() {

    const questions = this._getQuestions(...this.questionsList);
    console.log(questions)
    return this.prompt(questions).then((answers) => {
      console.log(answers)
    });

  }

  writing() {
    if (!this._canWrite()) {
      return;
    }
    memFs.writeJSON("settings.json", this.settings)
    memFs.commit([], () => {
    })
    /*
     memFs.extendJSON('settings.json', {a:1});
     memFs.commit([], () => { console.log("ok") } )
     */
  }

  end() {
    this._end();
  }
};
