// import './style.css'
import * as THREE from './three.js-master/build/three.module.js';
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';
console.log(THREE)


const canvas = document.querySelector('#bg');
const scene = new THREE.Scene();

const loader = new GLTFLoader()
loader.load('/assets/cube2.glb', function(gltf) {
    console.log(gltf)
    const root = gltf.scene;
    // root.scale.set(0.5, 0.5, 0.5) //size
    scene.add(root);
}, function(xhr) {
    console.log((xhr.loaded/xhr.total * 100) + "% loaded")
}, function(error) {
    console.log("An error occured")
})


// Boiler Plate
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, size.width/size.height, 0.1, 100);
camera.position.setZ(1)
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(size.width, size.height);
renderer.shadowMap.enabled = true;
renderer.outputEncoding = true;


const light = new THREE.PointLight(0xffffff, 1)
light.position.set(5,5,5)
const ambi = new THREE.AmbientLight(0xffffff);


const lightHelper = new THREE.PointLightHelper(light)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);


scene.add(light, ambi)

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    controls.update();
}
animate()