// imports
import './style.css'
import * as THREE from 'three';

// initialize environment
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 65, window.innerWidth/ window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.setZ(30);

renderer.render( scene, camera );

// create torus shape
const torusGeometry = new THREE.TorusKnotGeometry( 10, 2, 100, 16 );
const torusMaterial = new THREE.MeshStandardMaterial( {
	color: 0x3bbaf5,
  wireframe: true,
});
const torus = new THREE.Mesh( torusGeometry, torusMaterial );
scene.add(torus);

// add hemisphere lighting
const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );

// add directional lighting
const directional1 = new THREE.DirectionalLight( 0xffffff, 0.6 );
directional1.position.set(-20,40,0);
scene.add(directional1);

const directional2 = new THREE.DirectionalLight( 0xffffff, 0.6 );
directional2.position.set(10,-40,0);
scene.add(directional2);

// add stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.2,24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff, wireframe: true })
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(275));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(1000).fill().forEach(addStar);

// background
const texture = new THREE.TextureLoader().load('tron2.jpg');
scene.background = texture;

// rotate objects
function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.002;
  torus.rotation.y += 0.002;
  torus.rotation.y += 0.001;

  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.render( scene, camera );
}

// initialize camera position
camera.position.z = 0;
camera.position.x = 0;
camera.position.y = 0;

// move camera back abd rotate objects on scroll
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.001;
  torus.rotation.z += 0.0005;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

// arrows to indicate scroll
document.onscroll = function() {
  if (window.innerHeight + window.scrollY > document.body.clientHeight) {
      document.getElementById('arrows').style.display='none';
  }
}

animate();