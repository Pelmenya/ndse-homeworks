#!/usr/bin/env node -r dotenv/config
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */

import http from 'http';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const { accessKey } = process.env;
const SERVER_URL = 'http://api.weatherstack.com';

const main = (key: string) => {
    const rl = readline.createInterface({ input, output });

    console.log('Введите город, в котором хотите узнать погоду. Выйти - q.');

    const handlerLine = (i: string) => {
        console.log(i);
        if (i === 'q' || i === 'Q') {
            console.log('Удачи!!!');
            rl.close();
            rl.off('line', handlerLine);
            input.unref();
        }
        if (i) {
            const url = `${SERVER_URL}/current?access_key=${key}&query=${i}`;
            http.get(url, (res) => {
                const { statusCode } = res;
                if (statusCode) {
                    if (statusCode >= 200 || statusCode < 300) {
                        res.setEncoding('utf8');
                        let rowData = '';
                        res.on('data', (chunk) => {
                            rowData += chunk;
                        });
                        res.on('end', () => {
                            const parseData = JSON.parse(rowData);
                            console.log(parseData);
                        });
                    } else console.log(`statusCode: ${statusCode}`);
                } else console.log('statusCode: undefined');
            }).on('error', (err) => {
                console.error(err);
            });
        }
    };
    rl.on('line', handlerLine);
};

if (accessKey) {
    main(accessKey);
} else console.log('Не найден ключ доступа в файле .env');
