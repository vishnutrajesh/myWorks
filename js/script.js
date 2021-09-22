(function () {
    var scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
    });
})();
window.addEventListener('load', function(){
    new Glider(document.querySelector('.slider'), {
        slidesToShow: 1,
        draggable: true,
        arrows: {
            prev: '.prev',
            next: '.next'
        },
        rewind: true,
        dragVelocity: 4.5,
    });
    document.querySelector('.slider').addEventListener('glider-slide-visible', function(event){
       const slide = document.querySelector('ul.slide li');
       slide.classList.add('animate')
    });
})