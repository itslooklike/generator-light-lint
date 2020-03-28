const fs = require('fs')
const { exec } = require('child_process')
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

    if (!fs.existsSync('./index.js')) {
      exec('touch index.js')
    }

    if (!fs.existsSync('./package.json')) {
      exec('npm init -y')
    }

    if (!fs.existsSync('./.git')) {
      exec('git init')
    }

    if (!fs.existsSync('./README.md')) {
      exec('touch README.md')
      exec('git add README.md && git commit --no-verify -m init')
    }

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
        'eslint-config-too-lazy',
        'lint-staged',
        'husky',
      ],
      { 'save-dev': true }
    )
  }
}
