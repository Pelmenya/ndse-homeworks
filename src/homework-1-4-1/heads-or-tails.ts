#!/usr/bin/env node
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */

import path from 'path';
import fs from 'fs';

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { getRandomInteger } from '../functions/get-random-integer.js';

const { argv } = yargs(hideBin(process.argv))
    .option('log', {
        alias: 'l',
        type: 'string',
        description: 'Файл лога',
    });

function main(logFilelName: string) {
    const [left, right] = [1, 2];
    const logsDir = 'logs';
    const allowedKeys = [`${left}`, `${right}`, 'q', 'Q'];
    const dirName = path.resolve();
    const dirLogs = path.join(dirName, logsDir);
    const fileName = path.join(dirLogs, logFilelName);

    const playGame = () => {
        const rl = readline.createInterface({ input, output });

        console.log('Угадай: орел - введи 1, решка - введи 2. Выйти - q.');
        let num = getRandomInteger(left, right);

        const handlerLine = (i: string) => {
            if (+i === num) {
                console.log('Угадал! q - выход или угадай: орел - введи 1, решка - введи 2.');
                fs.appendFile(fileName, '1\n', () => {});
                num = getRandomInteger(left, right);
            } else if (+i === left || +i === right) {
                console.log('Не угадал! q - выход или угадай: орел - введи 1, решка - введи 2.');
                fs.appendFile(fileName, '0\n', () => {});
                num = getRandomInteger(left, right);
            }
            if (i === 'q' || i === 'Q') {
                console.log('Удачи!!!');
                rl.close();
                rl.off('line', handlerLine);
                input.unref();
            }
            if (!allowedKeys.includes(i)) {
                console.log('Ошибка ввода!!! Орел - введи 1, решка - введи 2. Выйти - q.');
            }
        };
        rl.on('line', handlerLine);
    };

    fs.access(dirLogs, (err) => {
        if (err && err.code === 'ENOENT') {
            fs.mkdir(dirLogs, () => { });
            fs.writeFile(fileName, '', 'utf8', () => {});
            playGame();
        } else {
            fs.readdir(dirLogs, (error, files) => {
                if (error) {
                    console.log(err);
                } else if (files && files.includes(path.parse(fileName).base)) {
                    playGame();
                } else {
                    fs.writeFile(fileName, '', 'utf8', () => {});
                    playGame();
                }
            });
        }
    });
}

if (argv.log) {
    main(argv.log);
} else console.log('Введите название файла для логирования игры в аргументе --log');
