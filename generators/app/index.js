const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const { name } = require('../../package.json');

const CONFLICT_PREFIX = 'conflict';
const conflictFiles = [`${CONFLICT_PREFIX}.gitignore`];
const filesToCopy = [
  '.editorconfig',
  '.gitattributes',
  '.prettierignore',
  '.prettierrc.js',
  '.eslintrc.js',
];

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

  install() {
    this.npmInstall(
      [
        'prettier',
        'eslint',
        'eslint-plugin-node',
        'eslint-plugin-import',
        'eslint-plugin-promise',
        'eslint-plugin-unicorn',
        'eslint-config-prettier',
      ],
      { 'save-dev': true }
    );
  }
};
