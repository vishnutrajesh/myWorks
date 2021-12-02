
const active = document.getElementsByClassName('active-block');
const nav = document.getElementById('myNav');
const links = nav.getElementsByTagName('a');
const socialNav = document.getElementsByClassName('social-nav');
let formValid = false;
let techUsed = [
    {tech: ['Angular', 'Fire Base', 'Javascript', 'SCSS | CSS', 'HTML'], resposive: true},
    {tech: ['Javascript', 'THREE JS', 'SCSS | CSS', 'HTML'], resposive: true},
    {tech: ['Angular', 'Javascript', 'E-Charts', 'SCSS | CSS', 'HTML'], resposive: false},
    {tech: ['Javascript', 'Bootstrap', 'SCSS | CSS', 'HTML'], resposive: true},
    {tech: ['Javascript', 'Bootstrap', 'SCSS | CSS', 'HTML'], resposive: true},
]
const workDescription = [
    {text: 'Drag and drop image uploader with upload progress bar', link: 'https://drag-n-drop-file.web.app/file-upload'},
    {text:'Singularity coming soon lp with rotating planet', link: 'https://singularity-123.web.app/'},
    {text: 'Covid worls report chart', link: 'https://drag-n-drop-file.web.app/covid-chart'},
    {text: 'Smooth scrolling animated responsive landing page', link: 'https://tropicana-713bb.web.app/' },
    {text: 'Responsive mobile app landing page', link: 'https://smart-control-lp-123.web.app/'},
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


let navActive = ((link, i) => {
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
});

function downloadUrl(){
    window.open(`./img/resume.pdf`, '_target_blank');
}

function redirectToLink(index) {
    return window.open(`${workDescription[index].link}`, '_target_blank');
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
        <img src="${bg[index]}" alt="works" class="w-100 shadow-sm">
        </div>
        <div class="side-bar">
        <div onclick="closeModal()" class="close-btn"><i class="fas fa-times"></i></div>
        <h6>${workDescription[index].text}</h6>
        <small>Technologies used:</small>
        <div class="d-flex">
           ${text} 
           <a href="${workDescription[index].link}" target="_blank" type="button" class="navigate shadow-lg">
          <i class="fas fa-directions"></i>
                </a>
        </div>
        </div>
        `;
    }, 2000)
}

function checkValid(id, labelText) {
    let targetIput = document.getElementById(id).value;
    let label = document.getElementById(id + 'label');
    let input = document.getElementById(id);
    const button = document.getElementById('submitBtn');
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(!targetIput.match('/^[a-zA-Z]+$/g'))
    if(id === 'name') {
        if(targetIput === '') {
            label.classList.add('show');
            input.classList.add('invalid');
            label.innerText = `${labelText} is required`;
            formValid = false;
        } else if (!targetIput.match(/^[a-zA-Z ]*$/)) {
            label.classList.add('show');
            input.classList.add('invalid');
            formValid = false;
            label.innerText = `${labelText} must not include numbers & special characters`
        } else {
            label.classList.remove('show');
            input.classList.remove('invalid');
            formValid = true;
        }
    } else if (id === 'email') {
        if (targetIput === '') {
            label.classList.add('show');
            input.classList.add('invalid');
            formValid = false;
            label.innerText = `${labelText} is required`
        } else if (!targetIput.match(emailRegex)) {
            label.classList.add('show');
            input.classList.add('invalid');
            label.innerText = `Please enter a valid ${labelText}`
            formValid = false;
        } else {
            label.classList.remove('show');
            input.classList.remove('invalid');
            formValid = true;
        }
    } else if (id === 'message') {
        if(targetIput === '') {
            label.classList.add('show');
            input.classList.add('invalid');
            label.innerText = `${labelText} is required`
            formValid = false;
        } else {
            label.classList.remove('show');
            input.classList.remove('invalid');
            formValid = true;
        }
    }
}


function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    if(formValid === true) {
        writeUserData(name, email, message);
    } else {
        checkValid('name', 'Name')
        checkValid('email', 'Email')
        checkValid('message', 'Message')
    }
}

const button = document.getElementById('submitBtn');
button.addEventListener('click', () => {
    submitForm();
})


const svg = document.getElementById('svg');
const anim = bodymovin.loadAnimation({
    wrapper: svg,
    animType: 'svg',
    loop: false,
    autoplay: false,
    path: 'https://assets1.lottiefiles.com/packages/lf20_u4yrau.json'
})
const loader = document.getElementById('loader');
const lotte = document.getElementById('lotte');
const successMessage = document.getElementById('successMessage');
const successAnim = bodymovin.loadAnimation({
    wrapper: lotte,
    animType: 'svg',
    loop: false,
    autoplay: false,
    path: 'https://assets4.lottiefiles.com/packages/lf20_ebpy0jqw.json'
})
function writeUserData(name, email, message) {
    loader.classList.remove('d-none');
    setTimeout(() => {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        name.value = '';
        email.value = '';
        message.value = '';
        anim.goToAndPlay(0, true);
        loader.classList.add('d-none');
        successAnim.goToAndPlay(0, true);
        lotte.classList.remove('d-none');
        successMessage.classList.remove('d-none');
    }, 2000)
    // set(ref(database, 'portfolio-contact'), {
    //     username: name,
    //     email: email,
    //     message : message
    // });
}

function collapse(index) {
    workCard[index].querySelector('.navigate').classList.remove('animated');
    if(workCard[index].querySelector('.expand') !== null) {
        workCard[index].querySelector('.expand').classList.remove('animated');
    }
}

