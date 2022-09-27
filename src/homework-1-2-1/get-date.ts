#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

enum COMMANDS {
    CURRENT = 'current',
    ADD = 'add',
    SUB = 'sub',
}

const getMonth = (month: number): string => {
    switch (month) {
        case 0: return 'январь';
        case 1: return 'февраль';
        case 2: return 'март';
        case 3: return 'апрель';
        case 4: return 'май';
        case 5: return 'июнь';
        case 6: return 'июль';
        case 7: return 'август';
        case 8: return 'сентябрь';
        case 9: return 'октября';
        case 10: return 'ноябрь';
        case 11: return 'декабрь';
        default: return '';
    }
};

const { argv } = yargs(hideBin(process.argv))
    .command('current', 'Получить текущую дату')
    .command('add', 'Получить будущую дату')
    .command('sub', 'Получить прошлую дату')
    .option('year', {
        alias: 'y',
        type: 'string',
        description: 'год',
    })
    .option('month', {
        alias: 'm',
        type: 'string',
        description: 'месяц',
    })
    .option('date', {
        alias: 'd',
        type: 'string',
        description: 'дата',
    });

if (argv._.length && argv._.length < 2) {
    if (argv._.includes(COMMANDS.CURRENT)) {
        let option = false;
        if ('date' in argv) {
            console.log('Сегодня: ', new Date().getDate(), 'число');
            option = true;
        }
        if ('month' in argv) {
            console.log('Месяц: ', getMonth(new Date().getMonth()));
            option = true;
        }
        if ('year' in argv) {
            console.log('Год: ', new Date().getFullYear());
            option = true;
        }
        if (option === false) {
            console.log('Дата и время в формате ISO: ', new Date());
        }
    }

    if (argv._.includes(COMMANDS.ADD)) {
        console.log(new Date().toISOString());
    }

    if (argv._.includes(COMMANDS.SUB)) {
        console.log(new Date().toISOString());
    }
} else console.log('Введите команду current | add | sub');
