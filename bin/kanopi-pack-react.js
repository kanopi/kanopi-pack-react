#!/usr/bin/env node

const path = require('path');
const {
    chalk,
    standardPackage,
    react: { development: developmentConfig, production: productionConfig }
} = require(path.resolve(__dirname, '..', 'index'));
const {
    commands: { standard: program },
    runners: { runDevServer, runWebpack }
} = standardPackage;

program
    .command('react')
    .description('Run React application builds, set environment to develoment for HMR')
    .argument('[environment]', 'Choose production (default) or development')
    .action((environment) => {
        const isDevelopment = 'development' === environment;

        console.log(chalk.greenBright('Package:\tKanopi Pack React'))
        console.log(chalk.yellow('Environment:\t' + (isDevelopment ? 'Development' : 'Production')));
        console.log('');
        isDevelopment
            ? runDevServer(developmentConfig)
            : runWebpack(productionConfig);
    });

program.parse(process.argv);