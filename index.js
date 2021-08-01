// imports
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
//scaling to screen
var siteWidth = 1920;
var scale = screen.width /siteWidth;

document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+siteWidth+', initial-scale='+scale+'');

// Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/golfball.png')
const roastTexture = textureLoader.load('/textures/roast.png')
const stonkTexture = textureLoader.load('/textures/stonks.png')
const questionTexture = textureLoader.load('/textures/question.png')

// Debug
//const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.56, 64, 64)
const torusGeometry = new THREE.TorusGeometry( 0.7, 0.2, 16, 100 );
const cube1Geometry = new THREE.BoxGeometry(0.75, 0.75, 0.75)
const cube2Geometry = new THREE.BoxGeometry(0.75, 0.75, 0.75)
const cube3Geometry = new THREE.BoxGeometry(0.75, 0.75, 0.75)

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture;
material.color = new THREE.Color(0xffffff)

const torusMaterial = new THREE.MeshStandardMaterial();
torusMaterial.metalness = 0.7
torusMaterial.roughness = 0.2
torusMaterial.normalMap = normalTexture;
torusMaterial.color = new THREE.Color(0xffffff)

const cube1Material = new THREE.MeshStandardMaterial();
cube1Material.metalness = 0.6
cube1Material.roughness = 0.4
cube1Material.normalMap = roastTexture;
cube1Material.color = new THREE.Color(0xffffff)

const cube2Material = new THREE.MeshStandardMaterial();
cube2Material.metalness = 0.6
cube2Material.roughness = 0.4
cube2Material.normalMap = stonkTexture;
cube2Material.color = new THREE.Color(0xffffff)

const cube3Material = new THREE.MeshStandardMaterial();
cube3Material.metalness = 0.6
cube3Material.roughness = 0.4
cube3Material.normalMap = questionTexture;
cube3Material.color = new THREE.Color(0xffffff)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

const torus = new THREE.Mesh( torusGeometry, torusMaterial );
torus.position.y = -10;
torus.position.x = 1.1;
torus.arc = 1;
scene.add( torus );

const cube1 = new THREE.Mesh(cube1Geometry,cube1Material)
cube1.position.set(0,-15.2,0.14)
cube1.rotation.set(-2,4.72,4.4)
scene.add(cube1)

const cube2 = new THREE.Mesh(cube2Geometry,cube2Material)
cube2.position.set(-1.31,-15.2,0)
cube2.rotation.set(3,1.18,3.4)
scene.add(cube2)

const cube3 = new THREE.Mesh(cube3Geometry,cube3Material)
cube3.position.set(1.31,-15.2,0)
cube3.rotation.set(-0.12,2.79,0.01)
scene.add(cube3)


// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.05)
pointLight.position.x = 2
pointLight.position.y = -0.66
pointLight.position.z = 4
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0x0000ff, 2)
pointLight2.position.set(-2.6,3,-1.12);
pointLight2.intensity = 3.1
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight(0xff0000, 2)
pointLight3.position.set(0.94,0.86,0.53);
pointLight3.intensity = 1.57
scene.add(pointLight3)

const pointLight4 = new THREE.PointLight(0xfff0, 2)
pointLight4.position.set(0.93,-1.58,-1.24);
pointLight4.intensity = 0.92
scene.add(pointLight4)

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
    renderer.setSize(sizes.width, 10000)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

var vFOV = camera.fov * Math.PI / 180;        // convert vertical fov to radians
var height = 2 * Math.tan( vFOV / 2 ) * 200; // visible height
console.log(height);
// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
let mouseX = 0;
let mouseY = 0;
var normalMouse = new THREE.Vector2(); //normalized coordinates for raycaster

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

// Set mouse positions
const onDocumentMouseMove = (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);

    normalMouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	normalMouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

// Move camera back and rotate objects on scroll
var prev = 0;

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    sphere.position.y = window.scrollY * 0.004
    sphere.position.y = window.scrollY * 0.004

    torus.position.y += (window.scrollY - prev) * (4.80 / window.innerHeight) ;
    cube1.position.y += (window.scrollY - prev) * (4.80 / window.innerHeight) ;
    cube2.position.y += (window.scrollY - prev) * (4.80 / window.innerHeight) ;
    cube3.position.y += (window.scrollY - prev) * (4.80 / window.innerHeight) ;
    
    console.log(window.scrollY)

    prev = window.scrollY

    // Hide scroll arrows after first scroll down
    if (window.scrollY > 0) {
        document.getElementById('arrows').style.display='none';
        document.getElementById('scroll-text').style.display='none';
    }

}
document.body.onscroll = moveCamera;
document.addEventListener('mousemove', onDocumentMouseMove);

// Raycasting
const clock = new THREE.Clock()
var raycaster = new THREE.Raycaster();

// Make sure cubes are back in place and cursor is back to normal
// In case we changed them from hover
function resetFromHover() {
    cube1.position.z = 0.14;
    cube2.position.z = 0
    cube3.position.z = 0
    //$('html,body').css('cursor', 'default');
}

// Move cube and show hand cursor when hovering over one
function hoverCube() {
    raycaster.setFromCamera(normalMouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.position === sphere.position) return;
        if (intersects[i].object.position === torus.position) {
            intersects[i].object.rotation.z += 0.01;
        }
        else {
            intersects[i].object.position.z += 0.1;
            //$('html,body').css('cursor', 'pointer');
        }
        renderer.render(scene, camera)
    }
}

// Link to projects on cube click
const onClick = (event) => {
    raycaster.setFromCamera(normalMouse,camera);
    let intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        if (intersects[0].object.position === cube1.position) window.open("https://roastmypost.io/");
        else if (intersects[0].object.position === cube2.position) window.open("http://milind31.pythonanywhere.com/");
    }
}

document.addEventListener('click', onClick);

const tick = () =>
{
    requestAnimationFrame( tick );

    targetX = mouseX * 0.001
    targetY = mouseY * 0.001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x)
    sphere.position.z -= 0.05 * (targetY - sphere.rotation.x)

    torus.rotation.x = .15 * elapsedTime
    torus.rotation.y = .15 * elapsedTime
    
    // Update Orbital Controls
    // controls.update()
    
    // Raycasting
    resetFromHover();
    hoverCube();

    // Render
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render(scene, camera)
}


tick();
