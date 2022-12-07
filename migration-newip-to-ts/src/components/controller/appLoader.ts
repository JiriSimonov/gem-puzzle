import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '8cc56851184349b7b541da66be86470d',
        });
    }
}

export default AppLoader;
