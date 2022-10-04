#!/usr/bin/env node
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */

import path from 'path';
import fs from 'fs';

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

const { argv } = yargs(hideBin(process.argv))
    .option('log', {
        alias: 'l',
        type: 'string',
        description: 'Файл лога',
    });

function main(logFilelName: string) {
    const logsDir = 'logs';
    const dirName = path.resolve();
    const dirLogs = path.join(dirName, logsDir);
    const fileName = path.join(dirLogs, logFilelName);

    const getStatistics = () => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) console.log(err);
            const gameStatistics = data.split('\n');
            const full = gameStatistics.length - 1;
            const vin = gameStatistics.filter((res) => res === '1').length;
            const notVin = gameStatistics.filter((res) => res === '0').length;
            console.log('Всего игр: ', full);
            console.log('Всего выиграно: ', vin, ' ', `${(vin / full) * 100}`, '%');
            console.log('Всего проиграно: ', notVin, ' ', `${(notVin / full) * 100}`, '%');
        });
    };

    fs.access(dirLogs, (err) => {
        if (err && err.code === 'ENOENT') {
            console.log('Нет дирректории логов игр');
        } else {
            fs.readdir(dirLogs, (error, files) => {
                if (error) {
                    console.log(err);
                } else if (files && files.includes(path.parse(fileName).base)) {
                    getStatistics();
                } else {
                    console.log('Нет файла лога игры: ', logFilelName);
                }
            });
        }
    });
}

if (argv.log) {
    main(argv.log);
} else console.log('Введите название файла для логирования игры в аргументе --log');
