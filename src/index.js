import '/src/style.scss'
import VanillaTilt from "vanilla-tilt";
const card = document.querySelectorAll('.card');
VanillaTilt.init(card, {
    max: 10,
    reverse: true,
    glare: true,
    "max-glare": 0.3,
    "glare-prerender": false,
});