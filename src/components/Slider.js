import Swiper, { Pagination } from 'swiper';
Swiper.use(Pagination);
import { Component } from '../libs/component';

export class Slider extends Component {
    static get selector() {
        return '[data-slider]';
    }
    constructor(element) {
        super(element);
        this.$pagination = this.element.querySelector('[data-pagination]');
        this.$navNext = this.element.querySelector('[data-nav-next]');
        this.$navPrev = this.element.querySelector('[data-nav-prev]');
        this.$container = this.element.querySelector('[data-slider-container]');
        this.pagination = this.pagination.bind(this);
    }

    pagination(slider) {
        this.$pagination.addEventListener('click', (event) => {
            const $dots = this.element.querySelectorAll(
                '.swiper-pagination-bullet',
            );
            const target = event.target;
            if (
                target &&
                target.classList.contains('swiper-pagination-bullet')
            ) {
                $dots.forEach((item, i) => {
                    if (target == item) {
                        slider.slideToLoop(i, 500, true);
                    }
                });
            }
        });
    }

    slideNext(slider) {
        this.$navNext.addEventListener('click', () => {
            slider.slideNext(500, true);
        });
    }

    slidePrev(slider) {
        this.$navPrev.addEventListener('click', () => {
            slider.slidePrev(500, true);
        });
    }

    checkNumber(number) {
        if (number > 9) {
            return number;
        } else {
            return (number = '0' + number);
        }
    }

    getTotalSlide(checkNumber) {
        let countSlide = document.createElement('span');
        let num = this.element.querySelectorAll(
            '.swiper-slide:not(.swiper-slide-duplicate)',
        ).length;
        countSlide.textContent = checkNumber(num);
        countSlide.classList.add('slider__counter');
        this.$pagination.append(countSlide);
    }

    getActiveSlide(slider, checkNumber) {
        let activeSlide = document.createElement('span');
        activeSlide.textContent = '01';
        activeSlide.classList.add('slider__counter');
        this.$pagination.prepend(activeSlide);
        slider.on('slideChange', function () {
            let num = checkNumber(slider.realIndex + 1);
            activeSlide.textContent = num;
        });
    }

    slider() {
        const slider = new Swiper(this.$container, {
            direction: 'horizontal',
            slidesPerView: 'auto',
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
        });

        this.getTotalSlide(this.checkNumber);
        this.getActiveSlide(slider, this.checkNumber);
        this.slideNext(slider);
        this.slidePrev(slider);
        this.pagination(slider);
    }

    initialize() {
        this.slider();
    }
}
