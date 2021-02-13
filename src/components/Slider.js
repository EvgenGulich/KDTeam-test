import Swiper, { Pagination, EffectCoverflow } from 'swiper';
Swiper.use([Pagination, EffectCoverflow]);
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
                        slider.slideToLoop(i, 800, true);
                    }
                });
            }
        });
    }

    slideNext(slider) {
        this.$navNext.addEventListener('click', () => {
            slider.slideNext(800, true);
        });
    }

    slidePrev(slider) {
        this.$navPrev.addEventListener('click', () => {
            slider.slidePrev(800, true);
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
        const optionsDefault = {
            slidesPerView: 'auto',
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
        };

        const optionsCoverEffect = {
            slidesPerView: 1,
            loop: true,
            loopAdditionalSlides: 3,
            pagination: {
                el: '.swiper-pagination',
            },
            centeredSlides: true,
            grabCursor: true,
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 0, // Slide rotate in degrees
                stretch: 600, // Stretch space between slides (in px)
                depth: 200, // Depth offset in px (slides translate in Z axis)
                modifier: 1, // Effect multipler
                slideShadows: false, // Enables slides shadows
            },
        };

        if (this.element.hasAttribute('data-cover-effect')) {
            const slider = new Swiper(this.$container, optionsCoverEffect);
            this.getTotalSlide(this.checkNumber);
            this.getActiveSlide(slider, this.checkNumber);
            this.slideNext(slider);
            this.slidePrev(slider);
            this.pagination(slider);
        } else {
            const slider = new Swiper(this.$container, optionsDefault);
            this.getTotalSlide(this.checkNumber);
            this.getActiveSlide(slider, this.checkNumber);
            this.slideNext(slider);
            this.slidePrev(slider);
            this.pagination(slider);
        }
    }

    initialize() {
        this.slider();
    }
}
