import { Component } from '../libs/component';

export class ScrollController extends Component {
    static get selector() {
        return '[data-scroll]';
    }
    constructor(element) {
        super(element);
    }

    ScrollController() {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                this.element.classList.remove('hide');
                this.element.classList.add('show');
            } else {
                this.element.classList.add('hide');
                this.element.classList.remove('show');
            }
        });
    }

    initialize() {
        this.ScrollController();
    }
}
