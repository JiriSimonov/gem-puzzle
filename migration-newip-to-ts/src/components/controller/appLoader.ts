import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.up.railway.app/', {
            apiKey: '8cc56851184349b7b541da66be86470d',
        });
    }
}

export default AppLoader;
