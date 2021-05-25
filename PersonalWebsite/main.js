import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 65, window.innerWidth/ window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.setZ(30);

renderer.render( scene, camera );

const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const material = new THREE.MeshBasicMaterial( {
	color: 0x7ae7ff,
  wireframe: true,
});

const shape = new THREE.Mesh( geometry, material );

scene.add(shape);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight)


function addStar() {
  const geometry = new THREE.SphereGeometry(0.1,24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff, wireframe: true })
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const texture = new THREE.TextureLoader().load('tron2.jpg');
scene.background = texture;

function animate() {
  requestAnimationFrame( animate );


  shape.rotation.x += 0.002;
  shape.rotation.y += 0.002;
  shape.rotation.y += 0.001;

  renderer.render( scene, camera );
}

camera.position.z = 0;
camera.position.x = 0;
camera.position.y = 0;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  shape.rotation.x += 0.001;
  shape.rotation.y += 0.001;
  shape.rotation.z += 0.0005;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera;

animate();