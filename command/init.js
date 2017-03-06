'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const config = require('../template')
const chalk = require('chalk')

module.exports = (t) => {
 	co(function *() {
  	const projectName = yield prompt('Project name: ')
    const gitUrl = config[t].url
    const branch = config[t].branch

    const cmdStr = `git clone --depth=1 -b ${branch} ${gitUrl} ${projectName}`
	  console.log(chalk.white('\n Start generating... It takes some time!'))
	  exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        process.exit()
      }
      exec(`cd ${projectName}`, (err, stdout, stderr) => {
        console.log(chalk.red(`${err.toString()}`))
        if (!error) {
          exec(`remove -rf .git`, (err, stdout, stderr) => {
            console.log(chalk.white(`${err.toString()}`))
          })
          return;
        }
      })
      console.log(chalk.green('\n √ Generation completed!'))
      console.log(chalk.green(`\n cd ${projectName} && npm install \n`))
      process.exit()
	  })
  })
}