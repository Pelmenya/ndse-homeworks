#!/usr/bin/env node

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { randomInteger } from './random-integer.js';

const [left, right] = [0, 100];

const num = randomInteger(left, right);
const rl = readline.createInterface({ input, output });
console.log(`Угадай число в диапазоне от ${left} до ${right}. Будь смелым!!!`);

const handlerLine = (i: string) => {
    if (num > +i) {
        console.log('Больше');
    }
    if (num < +i) {
        console.log('Меньше');
    }
    if (num === +i) {
        console.log('Отлично!!! Угадал!!!');
        rl.close();
        rl.off('line', handlerLine);
        input.unref();
    }
};

rl.on('line', handlerLine);
