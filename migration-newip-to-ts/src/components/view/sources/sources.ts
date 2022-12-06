import { NewsResProps } from './../../../inerfaces/interfaces';
import './sources.css';

class Sources {
    draw(data: NewsResProps[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = sourceItemTemp!.content.cloneNode(true) as DocumentFragment;
            const itemName = sourceClone.querySelector('.source__item-name');
            if (itemName) itemName.textContent = item.name;
            const courcesItem = sourceClone.querySelector('.source__item');
            if (courcesItem) courcesItem.setAttribute('data-source-id', item.id);
            fragment.append(sourceClone);
        });
        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) sourcesContainer.append(fragment);
    }
}

export default Sources;
