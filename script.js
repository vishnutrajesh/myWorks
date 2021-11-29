const active = document.getElementsByClassName('active-block');
const nav = document.getElementById('myNav');
const links = nav.getElementsByTagName('a');
const socialNav = document.getElementsByClassName('social-nav');
let techUsed = [
    {tech: ['Angular', 'Fire Base', 'Javascript', 'SCSS | CSS', 'HTML'], resposive: true},
    {tech: ['Javascript', 'THREE JS', 'SCSS | CSS', 'HTML'], resposive: true},
    {tech: ['Angular', 'Javascript', 'E-Charts', 'SCSS | CSS', 'HTML'], resposive: false},
    {tech: ['Javascript', 'Bootstrap', 'SCSS | CSS', 'HTML'], resposive: true},
    {tech: ['Javascript', 'Bootstrap', 'SCSS | CSS', 'HTML'], resposive: true},
]
const workDescription = [
    'Drag and drop image uploader with upload progress bar',
    'Singularity coming soon lp with rotating planet',
    'Covid worls report chart',
    'Smooth scrolling animated responsive landing page',
    'Smooth scrolling animated responsive landing page',
    'Simple mobile application landing page',
]
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
const wrapper = document.getElementsByClassName('card-wrapper');
let blockUnresponsiveEvent = true;

//navigation
const skill = document.getElementById('skills');
const aboutMe = document.getElementById('aboutMe');
const works = document.getElementById('works');
const contact = document.getElementById('contact');
const workCard = document.getElementsByClassName('work-card');
const popup = document.getElementsByClassName('my-modal');
let bg = ["./img/drag-n-drop.png",
    "./img/coming-soon-singularity.png",
    "./img/covid-chart.png",
    "./img/scroll-lp.png",
    "./img/app-lp.png"];

window.addEventListener('click', function(e){
    if (popup[0] === e.target){
        popup[0].style.display = 'none';
        popup[0].innerHTML = null;
    } else{
        // Clicked outside the box
    }
});

function closeModal() {
    popup[0].style.display = 'none';
    popup[0].innerHTML = null;
}

for(let span of introSpan) {
    setInterval(() => {
        span.classList.add('pop');
    }, 300)
}
function downloadUrl(){
    window.open(`./img/resume.pdf`, '_target_blank');
}

function expand(index) {
    workCard[index].querySelector('.navigate').classList.add('animated');
    if(workCard[index].querySelector('.expand') !== null) {
        workCard[index].querySelector('.expand').classList.add('animated');   
    }
    // setTimeout(() => {
    //     popup[0].appendChild(workCard[index].cloneNode(true));
    //     let card = popup[0].querySelector('.work-card');
    //     card.style.width = width + 'px';
    //     card.style.height = height + 'px';
    //     popup[0].classList.add('d-block');
    // }, 100)
}
function openPanel(index) {
    workCard[index].querySelector('.expand').classList.remove('animated');
    workCard[index].querySelector('.navigate').classList.remove('animated');
    popup[0].innerHTML = null;
    popup[0].style.display = 'block';
    const height = workCard[index].clientHeight;
    const width = workCard[index].clientWidth;
    popup[0].appendChild(wrapper[index].querySelector('.work-card').cloneNode(true));
    let card = popup[0].querySelector('.work-card');
    card.style.backgroundImage = `url(${bg[index]})`
    let innerEl1 = card.querySelector('.navigate');
    let innerEl2 = card.querySelector('.expand');
    innerEl2.remove();
    innerEl1.remove();
    console.log(card);
    card.classList.remove('h-100');
    card.classList.remove('position-relative');
    card.style.width = width + 'px';
    card.style.height = height + 'px';
    card.style.position = 'fixed';
    let rec = wrapper[index].getBoundingClientRect();
    card.style.top = rec.top + window.scrollY + 'px';
    card.style.left = rec.left + window.scrollX + 'px';
    let parentDiv  = works.getBoundingClientRect();
    setTimeout(() => {
        card.style.top = parentDiv.top + window.scrollY + 'px';
        card.style.left = parentDiv.left + window.scrollX + 'px';  
        card.style.width = works.clientWidth + 'px';  
        card.style.height = works.clientHeight + 'px';
    }, 1000)
    setTimeout(() => {
        card.style.backgroundImage = null;
        let text = '';
        techUsed[index].tech.forEach(function (t){
            text += `<span class="badge">${t}</span>`;
        })
        card.innerHTML = `
        <div class="h-100 card-popup position-relative p-2 w-100">
        <div class="row h-100">
        <div class="col-11 align-self-end">
        <figure>
        <img src="${bg[index]}" alt="works" class="w-100 shadow-sm">
        <figcaption>
        <h6>${workDescription[index]}</h6>
        <small>Technologies used:</small>
        <div class="d-flex">
           ${text}
        </div>
        </figcaption>
        </figure>
        </div> 
        <div class="col-1 m-0 popup-slider d-flex flex-column justify-content-between">
        <div onclick="closeModal()" class="close-btn"><i class="fas fa-times"></i></div>
         <div class="navigate shadow-lg">
          <i class="fas fa-directions"></i>
         </div>
         </div>
        </div>
        </div>
        `;
    }, 2000)
}
function collapse(index) {
    workCard[index].querySelector('.navigate').classList.remove('animated');
    if(workCard[index].querySelector('.expand') !== null) {
        workCard[index].querySelector('.expand').classList.remove('animated');
    }
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
