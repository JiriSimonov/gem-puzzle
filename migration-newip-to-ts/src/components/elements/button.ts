import BaseComponent from './baseComponent';

export default class Button extends BaseComponent {
    parent: HTMLElement;

    label: BaseComponent;

    input: BaseComponent;

    constructor() {
        super({ className: 'theme' });
        this.parent = document.getElementById('header') as HTMLElement;
        this.input = new BaseComponent({ tag: 'input', className: 'theme__input' });
        this.input.getNode().setAttribute('type', 'checkbox');
        this.input.getNode().setAttribute('id', 'theme');
        this.label = new BaseComponent({ tag: 'label', className: 'theme__label' });
        this.label.getNode().setAttribute('for', 'theme');
        this.input.getNode().addEventListener('click', () => {
            document.body.classList.toggle('light');
            console.log('click');
        });
    }
    render() {
        this.parent.append(this.node);
        this.appendEl([this.input, this.label]);
    }
}
