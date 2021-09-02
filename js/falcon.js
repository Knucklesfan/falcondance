import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
const data = [-30, -15, 0, 15, 30];
const datay = [-15, -5, 0, -5, -15];
const dataz = [5, 2.5, 0, 2.5, 5];
let lastWidth = 0;
let lastHeight = 0;

function animate() {
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 10, 45);
        renderer.setSize(window.innerWidth, window.innerHeight);
    lastHeight = window.innerHeight;
    lastWidth = window.innerWidth;
    renderer.render( scene, camera );
    //console.log(mixer)
    if (mixer.length > 0) {
        const delta = clock.getDelta();
        mixer.forEach(mxr => {
            mxr.update(delta);
        })
    }
    //console.log(mesh.position.x)
    if(mesh.position.x == 4500) {
        mesh.position.x = 0;
    }
    mesh.position.x += 1;
    if(text) {
        text.rotation.z += 0.005;
    }

    requestAnimationFrame( animate );

}
function rad(deg) {
    return deg * Math.PI/180;
}
    const clock = new THREE.Clock(true);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 45);
    const scene = new THREE.Scene();

    let texture = new THREE.TextureLoader().load(window.location.href + "models/background.jpg");
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;

    scene.background = texture;

    const skyColor = 0xFFFFFF;  // light blue
    const groundColor = 0xFFFFFF;  // brownish orange
    const intensity = 2.5;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let mixer = [];
    const gltfLoader = new GLTFLoader();
    let     url = "" + window.location.href +"/models/falc.gltf";

let objects = [];
    for (let c = 0; c < 5; c++) {
        gltfLoader.load(url, (gltf) => {
            objects[c] = gltf.scene.children[0];
            objects[c].position.x = data[c];
            objects[c].position.z = datay[c];
            objects[c].position.y = dataz[c];

            const clips = gltf.animations[0];
            mixer[c] = new THREE.AnimationMixer(objects[c]);
            const action = mixer[c].clipAction(clips);
            console.log(c)
            action.play();
            scene.add(objects[c]);
        });
    }
    url = "" + window.location.href +"/models/text.gltf";
    let text = undefined;
    gltfLoader.load(url, (gltf) => {
        let texture = new THREE.TextureLoader().load(window.location.href +"models/capt.jpg");
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        text = gltf.scene.children[0];
        text.material = new THREE.MeshMatcapMaterial({
            matcap: texture,
        })
        text.position.y = 60;
        text.position.z = -100;

        text.scale.x = 10;
        text.scale.y = 10;
        text.scale.z = 10;

        scene.add(text);
    });

    const plane = new THREE.PlaneGeometry();
    texture = new THREE.TextureLoader().load(window.location.href +"models/mutecity.png");
    texture.format = THREE.RGBA32F
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.repeat.set(4, 4);

    const mat = new THREE.MeshBasicMaterial({
        map: texture
    })
    const mesh = new THREE.Mesh(plane);
    mesh.material = mat;
    mesh.scale.x = 10000;
    mesh.scale.y = 10000;
    mesh.scale.z = 10000;
    mesh.rotation.x = rad(-75);
    scene.add(mesh);

    animate();

const audio = new Audio('media/rasputi.mp3');

var video = document.getElementById('video');

video.onended = function(e) {
    var video = document.getElementById('video');
    audio.play();
    video.remove();

};
