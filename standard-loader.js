const path = require('path');
const { exit } = require('process');

module.exports = (debug) => {
    const packageModuleDirectory = path.resolve(process.cwd(), 'node_modules');

    const tryRequire = (packageName) => {
        try {
            return require(packageName);
        }
        catch (error) {
            if (true === debug) {
                console.log("Cannot load package at " + packageName);
            }
        }

        return null;
    }

    const locatePeerPackage = (packageName) => {
        let loadedPackage = tryRequire(packageName);
        return !loadedPackage 
            ? loadedPackage 
            : tryRequire(path.resolve(packageModuleDirectory, packageName));
    }

    const standardPackage = locatePeerPackage('@kanopi/pack');
    const chalk = locatePeerPackage('chalk');

    if (!standardPackage) {
        console.log('Cannot find @kanopi/pack, please ensure it is installed as a peer dependency.');
        exit();
    }

    return {
        chalk,
        standardPackage
    };
};