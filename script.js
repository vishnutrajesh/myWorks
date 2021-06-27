(() => {
    const search = document.getElementById('search');
    const searchInput = document.getElementById('searchInput');
    const icon = document.getElementById('icons');
    const icons = icon.getElementsByTagName('i');
    for (let fa of icons) {
        fa.style.transform = `scale(${Math.random() * 2})`
    }
    let glider = new Glide('.slider', {
        autoplay: 5000,
        perView: 1,
        type: 'carousel',
        animationDuration: 500,
        animationTimingFunc: 'cubic-bezier(.74,.68,.35,.98)',
        startAt: 0,
        gap: 25,
        dragThreshold: 20
    });
    glider.on(['mount.after', 'run'], () => {
        const bgAbstract = document.getElementsByClassName('carousel');
        const currentIndex = glider.index;
        if(currentIndex === 0) {
            bgAbstract[0].style.backgroundPositionX = 'left'
        } else if(currentIndex === 1) {
            bgAbstract[0].style.backgroundPositionX = 'center'
        } else {
            bgAbstract[0].style.backgroundPositionX = 'right'
        }
    });
    glider.mount();
    glider.update({
        peek: {
            before: 0,
            after: 100
        }
    })
    search.addEventListener('click', (e) => {
        searchInput.classList.remove('d-lg-none');
        e.currentTarget.classList.remove('d-lg-block');
    });
})();

