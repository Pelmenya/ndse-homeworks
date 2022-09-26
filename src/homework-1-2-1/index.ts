import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

enum METHODS {
    CURRENT = 'current',
    ADD = 'add',
    SUB = 'sub',
}

const { argv } = yargs(hideBin(process.argv))
    .option('current', {
        alias: 'cur',
        type: 'string',
        description: 'current date',
    })
    .option('add', {
        type: 'string',
        description: 'feature date',
    }).option('params2', {
        alias: 'p2',
        type: 'string',
        description: 'params 2 desc',
        default: 'def params 2',
    });

if (argv._.length) {
    if (argv._.includes(METHODS.CURRENT)) {
        console.log(new Date().toISOString());
    }

    if (argv._.includes(METHODS.ADD)) {
        console.log(new Date().toISOString());
    }

    if (argv._.includes(METHODS.SUB)) {
        console.log(new Date().toISOString());
    }
} else console.log(argv);
