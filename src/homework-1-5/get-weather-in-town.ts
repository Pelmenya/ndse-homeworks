#!/usr/bin/env node -r dotenv/config
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */

import http from 'http';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export interface IWeather {
    current: {
        temperature: number;
    },
    location: {
        name: string;
        temperature: number;
    }
    forecast: {
        [key: string]: {
            date: string;
            mintemp: number;
            maxtemp: number;
            avgtemp: number;
        }
    }
}

const { accessKey } = process.env;
const SERVER_URL = 'http://api.weatherstack.com';

const main = (key: string) => {
    const controlKeys = ['q', 'Q'];

    const rl = readline.createInterface({ input, output });

    console.log('Введите город, в котором хотите узнать погоду. Выйти - q.');

    const handlerLine = (i: string) => {
        if (i === 'q' || i === 'Q') {
            console.log('Удачи!!!');
            rl.close();
            rl.off('line', handlerLine);
            input.unref();
        }
        if (i && !controlKeys.includes(i)) {
            const url = `${SERVER_URL}/forecast?access_key=${key}&query=${i}`;
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
                            const parseData: IWeather = JSON.parse(rowData);
                            if (parseData.location) {
                                const { location, current, forecast } = parseData;
                                const day = forecast[Object.keys(forecast)[0]];
                                console.log(`Сейчас в городе ${location.name}`, current.temperature, '°C');
                                console.log(`Прогноз погоды от ${day.date}:`);
                                console.log('Минимальная температура: ', day.mintemp, '°C');
                                console.log('Максимальная температура: ', day.maxtemp, '°C');
                                console.log('Средняя температура: ', day.avgtemp, '°C');
                            } else console.log(`Город «${i}» не найден`);
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
