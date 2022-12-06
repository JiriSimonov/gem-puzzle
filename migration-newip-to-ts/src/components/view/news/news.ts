import './news.css';
import { NewsProps } from '../../../inerfaces/interfaces';

function checkType(elem: HTMLElement | null, callback: string) {
    if (elem) {
        elem + callback;
    } else {
        throw new Error('error');
    }
}

export default class News {
    draw(data: NewsProps[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        news.forEach((item, index) => {
            const newsClone = newsItemTemp!.content.cloneNode(true) as DocumentFragment;
            if (index % 2) {
                checkType(newsClone.querySelector('.news__item'), `.classList.add('alt')`);
                const newsItem = newsClone.querySelector('.news__item');
                if (!newsItem) throw new Error('wrong type');
                newsItem.classList.add('alt');
            }

            const newsMetaPhoto = newsClone.querySelector<HTMLDivElement>('.news__meta-photo');
            if (newsMetaPhoto)
                newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const newsAuthor = newsClone.querySelector('.news__meta-author');
            if (newsAuthor && item.source) newsAuthor.textContent = item.author || item.source.name;
            const newsMeta = newsClone.querySelector('.news__meta-date');
            if (newsMeta && item.publishedAt)
                newsMeta.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            const newsTitle = newsClone.querySelector('.news__description-title');
            if (newsTitle && item.title) newsTitle.textContent = item.title;
            const newsSources = newsClone.querySelector('.news__description-source');
            if (newsSources && item.source) newsSources.textContent = item.source.name;
            const newsContent = newsClone.querySelector('.news__description-content');
            if (newsContent && item.description) newsContent.textContent = item.description;
            const newsReadMore = newsClone.querySelector('.news__read-more a');
            if (newsReadMore && item.url) newsReadMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });
        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}
