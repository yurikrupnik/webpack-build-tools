const path = require('path');
const chalk = require('chalk');
// const meow = require('meow');
const program = require('commander');
// const fs = require('fs');
// const fs = require('fs').promises;
const fs = require('fs-extra');
const util = require('util');
// const jest = require('jest');
// const exec = require('child_process').exec;
const exec = util.promisify(require('child_process').exec);
// const spawn = util.promisify(require('child_process').spawn);
const spawn = require('child_process').spawn;
const fork = require('child_process').fork;
// const spawn = util.promisify(require('child_process').spawn);
// const spawnSync = require('child_process').spawnSync;
// const spawn = require('child_process').spawn;
// const exec =require('child_process').exec;
// process.stdin.pipe(child.stdin)
//
// child.stdout.on('data', (data) => {
//     console.log(`child stdout:\n${data}`);
// });
const test = async (args) => {
    // console.log('args', args); // eslint-disable-line
    const args0 = process.argv.slice(2);
    // console.log('args0', args0);

    // const args1 = args.slice(2);
    const eslintrcLocation = path.join(process.cwd(), '.eslintrc');
    const pkg = path.join(process.cwd(), 'package.json');
    // console.log('pkg.eslint', pkg.jest);


    fs.access(pkg, (err) => {
        if (err) {
            console.log('err', err);
        } else {
            fs.readFile(pkg).then((res) => {
                const pg = JSON.parse(res);
                // console.log('pg', pg);
            })
                .catch((err) => {
                    console.log('err', err);
                });
        }
    });


    fs.access(eslintrcLocation, (err) => {
        if (err) {
            console.log(chalk.red('no eslintrc in root directory - using default'));
        } else {
            console.log('eslint file exists');
        }
    });
    // fs.access(eslintrcLocation)
    //     .then(res => {
    //         console.log('res of access', res);
    //     })
    //     .catch(err => {
    //         console.log('err', err);
    //     });
    // fs.readFile(eslintrcLocation, function (err, res) {
    //     if (err) {
    //         console.log('err', err); // eslint-disable-line
    //     } else {
    //         // console.log('res', res);
    //
    //         // const eslintrcLocation = JSON.parse(res);
    //         // console.log('eslintrcLocation', eslintrcLocation);
    //     }
    // }); // todo fix that


    const defaultOptions = [
        // '-al',
        // '--watchAll',
        // '--collectCoverage'
        // `--config=${process.cwd()}`,
        // '--verbose',
        `${process.cwd()}/src`,
        // eslintrcLocation
    ];

    // const options = [...defaultOptions];

    // const s = { stdio: [process.stdin, process.stdout, process.stderr] };
    // const child = exec(`npx eslint`, options)
    // const jestLodaction = path.resolve(__dirname, '../..', 'node_modules', '.bin', 'jest');
    const jestPath = path.resolve(__dirname, '../..', 'node_modules', '.bin', 'jest');
    // console.log('jestLodaction', jestLodaction);

    const child = spawn(jestPath, defaultOptions, {
    // const child = fork(jestPath, defaultOptions, {
        // const child = spawn('./node_modules/.bin/jest', defaultOptions, {
        // const child = spawn('jest', defaultOptions, {
        //     stdio: 'pipe',
        //     stdio: [process.stdin, process.stdout, process.stderr]
        cwd: process.cwd(),
        stdio: 'inherit',
        // shell: true,
        // cwd: '/Users/samer/Downloads'
    });
    // child.stdout.on('data', (data) => {
    //     console.log(`stdout: ${data}`);
    // });

    // child.stderr.on('data', (data) => {
    //     console.log(`stderr: ${data}`);
    // });

    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
    child.on('disconnect', (error) => {
        console.log(`child process exited with code ${error}`);
    });
    child.on('error', (signal) => {
        console.log(`child process exited with signal ${signal}`);
    });

    child.on('message', (message, sendHandle) => {
        console.log(`child process message ${message}`);
    });
};

program
    .command('test')
    // .alias('l')
    .description('Run tests')
    // .option('-f, --fix', 'output extra debugging')
    // .option('-C, --no-eslintrc', 'output extra debugging')
    // .option('-s, --shit <type>', 'output extra debugging')
    .action((res) => {
        // console.log('args', args);
        // console.log('l', l);
        test(res);
    });
// .on('--help', () => {
//     console.log(''); // eslint-disable-line
//     console.log('Examples:'); // eslint-disable-line
//     console.log(''); // eslint-disable-line
//     console.log('  $ deploy exec sequential'); // eslint-disable-line
//     console.log('  $ deploy exec async'); // eslint-disable-line
// });
// console.log('program', program);

module.exports = program;
// export default lint;
