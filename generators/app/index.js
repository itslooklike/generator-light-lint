const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.argument('name', { type: String, desc: 'Enter project name' })
  }

  writing() {
    const { name } = this.options
    const from = this.templatePath('clean-project')
    const to = this.destinationPath(name)

    this.fs.copy(from, to, {
      globOptions: {
        dot: true,
      },
    })

    this.spawnCommandSync('git', ['init', name, '--quiet'])
  }
}
