const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const { name } = require('../../package.json');

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(`Welcome to the grand ${chalk.red(name)} generator!`));
  }

  writing() {
    this.fs.copy(this.templatePath('**/*'), this.destinationRoot());
  }
};
