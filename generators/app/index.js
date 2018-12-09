const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const { name } = require('../../package.json');

const CONFLICT_PREFIX = 'conflict';
const conflictFiles = [`${CONFLICT_PREFIX}.gitignore`];
const filesToCopy = ['.editorconfig', '.gitattributes', '.prettierrc.js'];

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(`Welcome to the grand ${chalk.red(name)} generator!`));
  }

  writing() {
    conflictFiles.forEach(fileName => {
      this.fs.copy(
        this.templatePath(fileName),
        this.destinationPath(fileName.replace(CONFLICT_PREFIX, ''))
      );
    });

    filesToCopy.forEach(fileName => {
      this.fs.copy(this.templatePath(fileName), this.destinationPath(fileName));
    });

    // this.fs.copy(this.sourceRoot(), this.destinationRoot());
  }
};
