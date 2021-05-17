class Carousel {

    /**
     * @param {HTMLElement} element Container of the carousel, must only contain slides
     */
     constructor (element) {
        this.element = element;
        this.currentItem = 0;
        this.addArrows();

        window.setInterval(() => {
            this.next();
        }, 5000);
    }

    /**
     * Adds the graphical and user-clickable arrows to the carousel
     */
    addArrows() {
        let arrowsContainer = document.createElement('div');
        arrowsContainer.classList.add('arrows');
        let leftArrow = document.createElement('div');
        leftArrow.classList.add('left-arrow');
        leftArrow.addEventListener('click', this.prev.bind(this));
        let rightArrow = document.createElement('div');
        rightArrow.classList.add('right-arrow');
        rightArrow.addEventListener('click', this.next.bind(this));
        arrowsContainer.appendChild(leftArrow);
        arrowsContainer.appendChild(rightArrow);
        
        this.element.appendChild(arrowsContainer);
    }

    /**
     * Scrolls to next slide of the carousel
     */
    next() {
        this.gotoItem(this.currentItem + 1);
    }

    /**
     * Scrolls to previous slide of the carousel
     */
    prev() {
        this.gotoItem(this.currentItem - 1);
    }
    
    /**
     * Scroll to specified slide of the carousel, loops in
     * both directions of index is out of bounds
     * @param {Number} index the slide to scroll to
     */
    gotoItem(index) {
        let childs = [...this.element.children].filter(item => !item.classList.contains('arrows'));
        if (index > childs.length - 1) {
            index = 0;
        } else if (index < 0) {
            index = childs[childs.length - 1];
        }
        let translateX = -index * (childs[index].getBoundingClientRect().width + parseInt(window.getComputedStyle(childs[index]).marginLeft, 10) + parseInt(window.getComputedStyle(childs[index]).marginRight, 10));
        [...childs].forEach(slide => {
            if (translateX != 0) slide.style.transform = 'translate3d(' + translateX + 'px, 0, 0)';
            else slide.style.removeProperty('transform');
        });
        this.currentItem = index;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new Carousel(document.getElementsByClassName('carousel')[0]);
})
