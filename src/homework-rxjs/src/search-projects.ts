import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { debounceTime, map, mergeMap } from 'rxjs/operators';
import { getTemplate } from './get-template';

export const searchProjects = () => {
    const inputProjects = document.querySelector<HTMLInputElement>('.input-projects');
    const resProjects = document.querySelector<HTMLDivElement>('.res-projects');
    let projectsHTML = '';

    const inputProjects$ = fromEvent(inputProjects, 'input');

    inputProjects$.pipe(debounceTime(500)).subscribe(
        () => {
            projectsHTML = '';
            resProjects.innerHTML = '';
            const projects$ = ajax.getJSON(`https://gitlab.com/api/v4/projects?search=${inputProjects.value}`)
                .pipe(
                    mergeMap((resJSON: { web_url: string, name: string }[]) => resJSON),
                    map((item: { web_url: string, name: string }) => getTemplate(item.web_url, item.name)),
                );
            projects$.subscribe({
                next: (value) => {
                    projectsHTML += value;
                    resProjects.innerHTML = projectsHTML;
                },
                complete: () => {
                },
                error: (error) => console.log('Error!', error),
            });
        },
    );
};
