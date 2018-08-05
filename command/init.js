'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const config = require('../template')
const chalk = require('chalk')

module.exports = (t) => {
 	co(function *() {
    const projectName = yield prompt('Project name: ')
    if (!projectName) {
      console.log(chalk.red(`请输入项目名称`))
      process.exit()
    }

    if (!config[t] || !config[t].url || !config[t].branch) {
      console.log(chalk.red(`不支持该框架: ${t}。框架参数：z-react-koa, z-app, z-react, z-seneca, z-web-console, z-console-service`))
      process.exit()
    }

    if (t === 'z-react-koa') {
      exec(`mkdir ${projectName} && cd ${projectName} && mkdir view && mkdir app`, (error, stdout, stderr) => {
        const tmpViewUrl = 'git@code.aliyun.com:quitjie/z-react.git';
        const tmpViewBranch = 'master';
        const cmdViewStr = `git clone --depth=1 -b ${tmpViewBranch} ${tmpViewUrl} ${projectName}/view`
        exec(cmdViewStr, (error, stdout, stderr) => {
          if (error) {
            console.log(chalk.red(`${err.toString()}`))
            process.exit()
          }
          exec(`rm -rf ${process.cwd()}/${projectName}/view/.git`, (err, stdout, stderr) => {
            if (err) {
              console.log(chalk.red(`${err.toString()}`))
              return;
            }
            process.exit();
          })

          const tmpAppUrl = 'git@code.aliyun.com:quitjie/z-app.git';
          const tmpAppBranch = 'master';
          const cmdAppStr = `git clone --depth=1 -b ${tmpAppBranch} ${tmpAppUrl} ${projectName}/app`
          exec(cmdAppStr, (error, stdout, stderr) => {
            if (error) {
              console.log(chalk.red(`${err.toString()}`))
              process.exit()
            }
            exec(`rm -rf ${process.cwd()}/${projectName}/app/.git`, (err, stdout, stderr) => {
              if (err) {
                console.log(chalk.red(`${err.toString()}`))
                return;
              }
              process.exit();
            })
          })

          console.log(chalk.green('\n √ Generation completed!'))
          console.log(chalk.green(`\n cd ${projectName} && npm install \n`))
        })
      })
      return;
    }
    
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