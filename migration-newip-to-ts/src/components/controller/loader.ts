import { MakeUrlProps, NewsResProps, NewsProps } from './../../inerfaces/interfaces';
import { HRS } from '../../enums/enums';

export default class Loader {
    constructor(public baseLink: string, public options: object) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        props: MakeUrlProps,
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', props, callback);
    }

    errHandler(res: Response) {
        if (!res.ok) {
            if (res.status === HRS.unauthorized || res.status === HRS.notFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }

    makeUrl(props: MakeUrlProps): string {
        const urlOptions = { ...this.options, ...props.options };
        let url = `${this.baseLink}${props.endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        return url.slice(0, -1);
    }

    load(method: string, props: MakeUrlProps, callback: (data: NewsResProps | NewsProps) => void) {
        fetch(this.makeUrl(props), { method })
            .then(this.errHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}
