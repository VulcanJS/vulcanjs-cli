const chalk = require('chalk');
const VulcanGenerator = require('../../lib/VulcanGenerator');
const confQuestions = require("./questions");
const sh = require("../../lib/sessionHandler");
const sessionHandler = new sh(); 


module.exports = class extends VulcanGenerator {

  initializing() {

    // Ensure vulcan project
    this._assert('isVulcan');
    if (!this._canPrompt()) {
      return false;
    }

    // Move to project root
    this.destinationRoot(
      this.destinationPath()
      );

    var that = this
    var generator = this 
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

    function getAll() {
      return newQuestion().then((answers) => {
        if ( answers.action === "quit") {
          return;
        } else {
          that.action = answers.action;
          // It should get the list of parameters by action 
          var choicesList = confQuestions.getList( that.action )
          that.prompt([{
                type: 'list',
                name: 'parameter',
                pageSize: 20,
                message: 'Please choose a parameter',
                choice: choicesList,
                choices: choicesList
          }]).then((answers) => {
  
            that.parameter = answers.parameter  
            var currentValue = chalk.green(sessionHandler.getParamValue( generator.action, generator.parameter ) || "[!] Nothing set yet ");
            that.log( `Current value for parameter is '${currentValue}'`);
            // It should require the value for the parameter 
            return that.prompt([{
                type: 'input',
                name: 'value',
                message: "Parameter value"
            }]);
          
          }).then((answers) => {
            that.value = answers.value
            that.log(`\nSaving ${that.action}: ${that.parameter} = ${that.value}...`);
            sessionHandler.setValue( that.action, that.parameter, that.value )
            that.log(chalk.green("OK")+"\n");
            return getAll()

          })
        }
      })
    }
    return getAll();

    // Prompt for questions
    return that.prompt([{
        type: 'checkbox',
        pageSize: 20,
        name: 'parametersList',
        message: 'Which parameters do you want to configure',
        choices: [
          {name: 'Port', value: 'port', checked: false},
        ],
      }]).then((answers) => {
      return that.prompt([{
          type: 'input',
          name: 'value',
          message: 'Do you want to continue',
//        choices: [
//          {name: 'Port', value: 'port', checked: false},
//        ],
        }])
    }).then((answers) => {
      console.log("record " + answers)
    })
      ;
  }

  prompting() {

    /**    
     const questions = this._getQuestions(...this.questionsList);
     console.log(questions)
     return this.prompt(questions).then((answers) => {
     console.log(answers)
     });
     */
  }

  writing() {
    if (!this._canWrite()) {
      return;
    }
  }

  end() {
    this._end();
  }
};
