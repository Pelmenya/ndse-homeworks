import { fromEvent } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { ajax } from 'rxjs/ajax';
import { getTemplate } from './get-template';

export const getRepositories = () => {
    const inputRepo = document.querySelector<HTMLInputElement>('.input-repo');
    const buttonRepo = document.querySelector<HTMLButtonElement>('.button-repo');
    const resRepo = document.querySelector<HTMLDivElement>('.res-repo');
    let repoHTML = '';

    const buttonRepo$ = fromEvent(buttonRepo, 'click');
    const inputRepo$ = fromEvent(inputRepo, 'focus');

    buttonRepo$.subscribe(() => {
        buttonRepo.disabled = true;
        repoHTML = '';
        const repo$ = ajax.getJSON(`https://api.github.com/search/repositories?q=${inputRepo.value}`)
            .pipe(
                mergeMap((resJSON: { items: { html_url: string, full_name: string }[] }) => resJSON.items),
                map((item: { html_url: string, full_name: string }) => getTemplate(item.html_url, item.full_name)),
            );
        repo$.subscribe({
            next: (value) => {
                repoHTML += value;
                resRepo.innerHTML = repoHTML;
            },
            complete: () => {
                buttonRepo.disabled = false;
            },
            error: (error) => console.log('Error!', error),
        });
    });

    inputRepo$.subscribe(() => { resRepo.innerHTML = ''; });
};
