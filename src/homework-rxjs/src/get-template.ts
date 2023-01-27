export const getTemplate = (url: string, name: string) => `   
        <div>
            <a href=${url} >
                <p>
                    Репозиторий: <span>${name}</span>
                </p>
            </a>
        </div>
    `.replace(/\s/g, '').replace(/ahref/g, 'a target="_blanc" href');
