import { CallbackType } from '../../types/types';
import { MakeUrlProps, DataProps } from './../../inerfaces/interfaces';
import AppLoader from './appLoader';

export default class AppController extends AppLoader {
    getSources(callback: CallbackType<DataProps>) {
        const props: MakeUrlProps = {
            endpoint: 'sources',
            options: {},
        };
        super.getResp(props, callback);
    }

    getNews(e: PointerEvent | MouseEvent, callback: CallbackType<DataProps>) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}
