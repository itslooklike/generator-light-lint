const Generator = require('yeoman-generator')

const CONFLICT_PREFIX = 'conflict'
const conflictFiles = [`${CONFLICT_PREFIX}.gitignore`]
const lightVersionFiles = ['.editorconfig', '.gitattributes', '.prettierignore', '.prettierrc.js']
const filesToCopy = [...lightVersionFiles, '.eslintrc.js', '.eslintignore']

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'confirm',
        name: 'lightVersion',
        message: 'Would you like to use light version?',
      },
    ])
  }

  writing() {
    const { lightVersion } = this.answers
    const files = lightVersion ? lightVersionFiles : filesToCopy

    conflictFiles.forEach((fileName) => {
      this.fs.copy(
        this.templatePath(fileName),
        this.destinationPath(fileName.replace(CONFLICT_PREFIX, ''))
      )
    })

    files.forEach((fileName) => {
      this.fs.copy(this.templatePath(fileName), this.destinationPath(fileName))
    })
  }

  install() {
    const { lightVersion } = this.answers

    if (lightVersion) return

    this.npmInstall(
      [
        'eslint',
        'babel-eslint',
        'eslint-config-standard',
        'eslint-plugin-standard',
        'eslint-plugin-promise',
        'eslint-plugin-import',
        'eslint-plugin-node',
        'prettier',
        'eslint-config-prettier',
      ],
      { 'save-dev': true }
    )
  }
}
