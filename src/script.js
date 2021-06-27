import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//loader
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/texure/NormalMap.png')


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry( 0.8, 100, 100 );

// Materials

const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7;
material.metalness = 0.5;
material.color = new THREE.Color('#1B181F')
material.normalMap = texture
// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)
const pointLight = new THREE.PointLight('#D26F83', 1.5)
const pointLight1 = new THREE.PointLight('#2B2036', 1.5)
pointLight1.position.x = 60
pointLight1.position.y = 0
pointLight1.position.z = -35
pointLight.position.x = -0.1
pointLight.position.y = 3.6
pointLight.position.z = -0.3
scene.add(pointLight, pointLight1)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfY = window.innerWidth / 2;
const windowHalfX = window.innerHeight / 2;
const mouseMoveEvent = ((event) => {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
});
document.addEventListener('mousemove', mouseMoveEvent)
const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001;
    targetY = mouseY * .001;
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x)
    sphere.rotation.z += 0.5 * (targetY - sphere.rotation.x)
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
