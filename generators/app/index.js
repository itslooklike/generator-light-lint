const Generator = require('yeoman-generator')

const CONFLICT_PREFIX = 'conflict'
const conflictFiles = [`${CONFLICT_PREFIX}.gitignore`]
const lightVersionFiles = ['.editorconfig', '.gitattributes', '.prettierignore', '.prettierrc.js']
const filesToCopy = [
  ...lightVersionFiles,
  '.eslintrc.js',
  '.eslintignore',
  '.huskyrc.js',
  'lint-staged.config.js',
]

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.answers = {}
    this.option('light')
  }

  async prompting() {
    if (this.options.light) return
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
    const { light } = this.options
    const files = lightVersion || light ? lightVersionFiles : filesToCopy

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
        'lint-staged',
        'husky',
      ],
      { 'save-dev': true }
    )
  }
}
