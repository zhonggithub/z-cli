'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const config = require('../template')
const chalk = require('chalk')

module.exports = (t) => {
 	co(function *() {
    if (!config[t] || !config[t].url || !config[t].branch) {
      console.log(chalk.red(`不支持该框架: ${t}。框架参数：z-react-koa, z-react-koa@next, z-app, z-react, z-react@next, z-seneca`))
      process.exit()
    }

    const projectName = yield prompt('Project name: ')
    const gitUrl = config[t].url
    const branch = config[t].branch

    const cmdStr = `git clone --depth=1 -b ${branch} ${gitUrl} ${projectName}`
	  console.log(chalk.white('\n Start generating... It takes some time!'))
	  exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(chalk.red(`${err.toString()}`))
        process.exit()
      }
      exec(`rm -rf ${process.cwd()}/${projectName}/.git`, (err, stdout, stderr) => {
        if (err) {
          console.log(chalk.red(`${err.toString()}`))
          return;
        }
        process.exit();
      })
      console.log(chalk.green('\n √ Generation completed!'))
      console.log(chalk.green(`\n cd ${projectName} && npm install \n`))
	  })
  })
}