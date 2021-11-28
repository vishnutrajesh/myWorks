(function () {
    var scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
    });
     new Glider(document.querySelector('.slider'), {
        slidesToShow: 1,
        slidesToScroll: 'auto',
        scrollLock: true,
        draggable: true,
        arrows: {
            next: document.querySelector('.next'),
            prev: document.querySelector('.prev')
        }
    });
})();

