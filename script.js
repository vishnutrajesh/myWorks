const active = document.getElementsByClassName('active-block');
const nav = document.getElementById('myNav');
const links = nav.getElementsByTagName('a');
const socialNav = document.getElementsByClassName('social-nav');
// const links = nav.getElementsByTagName("a");
// for (let link of links) {
//     link.addEventListener('mouseover',() => {
//         link.classList.add('squash');
//     })
//     link.addEventListener('mouseout',() => {
//         link.classList.remove('squash');
//     })
// }
const pillerContainer = document.getElementsByClassName('nav-indicator');
const slider = document.getElementById('slider');
const shutter = document.getElementById('shutter');
const logo = document.getElementById('logo');
const activeLabel = document.getElementById('activeLabel');
const svgLine = document.getElementById('svgLine');
const introText = document.getElementById('introText');
const introSpan = introText.getElementsByTagName('span')
const piller = pillerContainer[0].getElementsByClassName('piller')
let blockUnresponsiveEvent = true;

//navigation
const skill = document.getElementById('skills');
const aboutMe = document.getElementById('aboutMe');
const works = document.getElementById('works');
const contact = document.getElementById('contact');
for(let span of introSpan) {
    setInterval(() => {
        span.classList.add('pop');
    }, 300)
}
function navActive(link, i) {
    if(i===0){
        socialNav[0].classList.remove('d-none')
    } else{
        socialNav[0].classList.add('d-none')
    }
    setTimeout(() => {
        switch (i) {
            case 0: {
                skill.classList.add('d-none');
                aboutMe.classList.remove('d-none');
                works.classList.add('d-none');
                contact.classList.add('d-none');
                break;
            }
            case 1: {
                skill.classList.remove('d-none');
                aboutMe.classList.add('d-none');
                works.classList.add('d-none');
                contact.classList.add('d-none');
                break;
            }
            case 2: {
                skill.classList.add('d-none');
                aboutMe.classList.add('d-none');
                works.classList.remove('d-none');
                contact.classList.add('d-none');
                break;
            }
            case 3: {
                skill.classList.add('d-none');
                aboutMe.classList.add('d-none');
                works.classList.add('d-none');
                contact.classList.remove('d-none');
                break;
            }
        }
    }, 600)
    for (let anchor of links) {
        anchor.classList.remove('active');
        anchor.style.pointerEvents = 'none';
    }
    for(let items of piller) {
        items.classList.remove('active');
    }
    slider.classList.add('slide')
    shutter.classList.add('shutter')
    logo.classList.add('logo-shrink')
    setTimeout(() => {
        piller[i].classList.add('active')
    }, 850)
    setTimeout(() => {
        for (let anchor of links) {
            anchor.style.pointerEvents = 'auto';
        }
        link.style.pointerEvents = 'none';
        switch (i) {
            case 0: {
                activeLabel.innerText = 'About Me'
                break;
            }
            case 1: {
                activeLabel.innerText = 'Skills'
                break;
            }
            case 2: {
                activeLabel.innerText = 'Works'
                break;
            }
            case 3: {
                activeLabel.innerText = 'Contact'
                break;
            }
        }
        slider.classList.remove('slide');
        shutter.classList.remove('shutter');
        logo.classList.remove('logo-shrink')
        activeLabel.classList.remove('d-none');
        blockUnresponsiveEvent = true;
    }, 1500)
    activeLabel.classList.add('d-none')

    // label.style.left = `${piller[i].offsetLeft}px`
    link.classList.add('active')
    active[0].style.top = `${link.offsetTop}px`;
}
