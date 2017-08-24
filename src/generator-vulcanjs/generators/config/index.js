const chalk = require('chalk');
const VulcanGenerator = require('../../lib/VulcanGenerator');
const confQuestions = require("./questions");
const sh = require("../../lib/settingsHandler");
const settingsHandler = new sh();

module.exports = class extends VulcanGenerator {

  prompting() {

    // Ensure vulcan project
    this._assert('isVulcan');
    if (!this._canPrompt()) {
      return false;
    }

    // Move to project root
    this.destinationRoot(
      this.destinationPath()
      );

    var generator = this
    
    /**
     * Recursive loop entry point
     */
    var newQuestion = () => {
      return this.prompt([{
          type: 'list',
          name: 'action',
          message: 'Select a category to configure, or exit.',
          choices: [
            {name: 'Start options (port, packages location,...)', value: 'start', checked: false},
            {name: 'Site informations (title, image,...)', value: 'public', checked: false},
            {name: 'Emailing  (address, mailchimp,...)', value: 'emailing', checked: false},
            {name: 'Quit', value: 'quit', checked: false},
          ],
        }])
    }

    /**
     * Recursive loop body
     */
    function getAll() {
      return newQuestion().then((answers) => {
        if (answers.action === "quit") {
          return;
        } else {
          generator.action = answers.action;
          // It should get the list of parameters by action 
          var choicesList = confQuestions.getList(generator.action)
          generator.prompt([{
              type: 'list',
              name: 'parameter',
              pageSize: 20,
              message: 'Please choose a parameter',
              choice: choicesList,
              choices: choicesList
            }]).then((answers) => {

            generator.parameter = answers.parameter
            var currentValue = chalk.green(settingsHandler.getParamValue(generator.action, generator.parameter) || "[!] Nothing set yet ");
            generator.log(`Current value for parameter is '${currentValue}'`);
            // It should require the value for the parameter 
            var promptParams = confQuestions.getPrompts(generator.parameter);
            return generator.prompt(promptParams);

          }).then((answers) => {
            generator.value = answers[generator.parameter];
            generator.log(`\nSaving ${generator.action}: ${generator.parameter} = ${generator.value}...`);
            settingsHandler.setValue(generator.action, generator.parameter, generator.value)
            generator.log(chalk.green("OK") + "\n");
            return getAll()

          })
        }
      })
    }
    return getAll();

  }

};
