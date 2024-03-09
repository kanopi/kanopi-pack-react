#!/usr/bin/env node

const path = require('path');
const utility = require('util');

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
  .command('check-configuration')
  .description('Output the Webpack configuration for the specified environment.')
  .argument('[depth]', 'Number of levels deep (default 6) to show the configuration')
  .argument('[environment]', 'Choose production (default) or development')
  .argument('[color]', 'Whether to show the output in color (default false)')
  .action((depth = 6, environment = 'production', color = false) => {
    const isDevelopment = 'development' === environment;

    console.log(chalk.greenBright('Package:\tKanopi Pack React'))
    console.log(chalk.yellow('Environment:\t' + (isDevelopment ? 'Development' : 'Production')));
    console.log('');
    console.log(chalk.yellow('Current configuration:'));
    console.log('');
    console.log(utility.inspect(
      isDevelopment ? developmentConfig : productionConfig,
      { depth: depth, colors: color }
    ));
  });

program
  .command('react')
  .description('Run React application builds, set environment to development for HMR')
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
