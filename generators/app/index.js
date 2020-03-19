const Generator = require('yeoman-generator')

const CONFLICT_PREFIX = 'conflict'
const conflictFiles = [`${CONFLICT_PREFIX}.gitignore`]
const lightVersionFiles = ['.editorconfig', '.gitattributes', '.prettierignore', '.prettierrc.js']
const filesToCopy = [
  ...lightVersionFiles,
  '.eslintrc.js',
  '.eslintignore',
  '.huskyrc',
  'lint-staged.config.js',
]

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.option('pure')
  }

  writing() {
    const { pure } = this.options
    const files = pure ? lightVersionFiles : filesToCopy

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
    const { pure } = this.options

    if (pure) return

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
