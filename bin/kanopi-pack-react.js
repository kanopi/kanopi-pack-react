#!/usr/bin/env node

const path = require('path');
const utility = require('util');

const {
  chalk,
  standardPackage,
  react: { development, production, watch }
} = require(path.resolve(__dirname, '..', 'index'));
const {
  commands: { standard: program },
  environment: { standard: { watchOptions } },
  runners: { runDevServer, runWebpack, watchWebpack }
} = standardPackage;

const PACKAGE_MODES = {
  'development': { name: 'Development', runner: () => runDevServer(development) },
  'production': { name: 'Production', runner: () => runWebpack(production) },
  'watch': { name: 'Watch', runner: () => watchWebpack(watch, watchOptions) }
};

program
  .command('check-configuration')
  .description('Output the Webpack configuration for the specified environment.')
  .argument('[depth]', 'Number of levels deep (default 6) to show the configuration')
  .argument('[environment]', 'Choose production (default) or development')
  .argument('[color]', 'Whether to show the output in color (default false)')
  .action((depth = 6, environment = 'production', color = false) => {
    const selectedMode = PACKAGE_MODES[environment] ?? PACKAGE_MODES['production'];
    const { configuration, name } = selectedMode;

    console.log(chalk.greenBright('Package:\tKanopi Pack React'))
    console.log(chalk.yellow('Environment:\t' + name));
    console.log('');
    console.log(chalk.yellow('Current configuration:'));
    console.log('');
    console.log(utility.inspect(configuration, { depth: depth, colors: color }));
  });

program
  .command('react')
  .description('Run React application builds, set environment to development for HMR, or watch for rebuilds without HMR.')
  .argument('[environment]', 'Choose production (default) or development')
  .action((environment) => {
    const selectedMode = PACKAGE_MODES[environment] ?? PACKAGE_MODES['production'];
    const { configuration, name, runner } = selectedMode;

    console.log(chalk.greenBright('Package:\tKanopi Pack React'))
    console.log(chalk.yellow('Environment:\t' + name));
    console.log('');
    runner(configuration);
  });

program.parse(process.argv);
