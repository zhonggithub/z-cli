#!/usr/bin/env node --harmony
'use strict'

process.env.NODE_PATH = __dirname + '/../node_modules/'

const program = require('commander')

program
  .version(require('../package').version)
  
program
	.usage('<command>')

program
  .command('init <template>')
	.description('使用哪个框架初始化工程？可选：z-react-koa, z-react-koa@next, z-app, z-react, z-react@next, z-seneca')
  .alias('i')
  .action((template) => {
    require('../command/init')(template)
  })

program.parse(process.argv)

if(!program.args.length){
  program.help()
}