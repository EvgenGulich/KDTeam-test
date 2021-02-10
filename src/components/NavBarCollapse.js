import { Component } from '../libs/component';

export class NavBarCollapse extends Component {
    static get selector() {
        return '#nav-bar';
    }
    constructor(element) {
        super(element);
        this.$buttonOpen = document.querySelector('.hamburger');
        this.$navOverlay = document.querySelector('.nav-mobile-overlay');
        this.$navMobile = document.querySelector('.nav-mobile');
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    show() {
        this.$buttonOpen.classList.add('active');
        this.$navMobile.classList.add('animation-menu-open');
        this.$navMobile.classList.remove('animation-menu-close');
        this.$navOverlay.classList.add('show');
    }

    hide() {
        this.$buttonOpen.classList.remove('active');
        this.$navMobile.classList.remove('animation-menu-open');
        this.$navMobile.classList.add('animation-menu-close');
        this.$navOverlay.classList.remove('show');
    }

    navBarCollapse() {
        this.element.addEventListener('click', (event) => {
            console.log(this.$buttonOpen);
            console.log(event.target);
            const targetOpen = event.target.closest('.nav-bar__open-btn');
            const targetClose = event.target.closest('.nav-bar__close-btn');
            const targetScroll = event.target.closest('.header__nav_mobile');
            if (targetOpen) {
                this.show();
            } else if (
                targetClose ||
                event.target == this.$navOverlay ||
                targetScroll
            ) {
                this.hide();
            }
        });
    }

    initialize() {
        this.navBarCollapse();
    }
}
