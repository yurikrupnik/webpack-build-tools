#!/usr/bin/env node
// import program from 'commander';
// const path = require('path');
// const fs = require('fs');
// const util = require('util');
// const chalk = require('chalk');
// const exec = util.promisify(require('child_process').exec);
const program = require('commander');
// require('eslint');
require('./lint');
require('./test');
require('./build');

program
    .version('0.1.1')
    .description('Build process with webpack, jest, lint');


// program
//     .command('*')
//     .action(function (env) {
//         console.log('deploying "%s"', env);
//     });

program.parse(process.argv);
