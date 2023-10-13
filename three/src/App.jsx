import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const canvas = document.querySelector("#webgl");

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfe3dd);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 5, 5);
    camera.rotation.set(-Math.PI / 4, Math.PI / 4, 0);

    const loader = new GLTFLoader();
    loader.load("/assets/scary_home/scene.gltf", function (gltf) {

      scene.add(gltf.scene);
    });

    const interactiveLight = new THREE.PointLight(0xffffff, 1, 100);
    scene.add(interactiveLight);
    canvas.addEventListener("mousemove", (event) => {
      const mouse = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };

      interactiveLight.position.set(mouse.x * 10, mouse.y * 10, 5);
    });

    const light1 = new THREE.PointLight(0xffffff, 20, 100);
    light1.position.set(50, 30, 50);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xffffff, 10, 100);
    light2.position.set(-50, 30, 50);
    scene.add(light2);

    const light3 = new THREE.PointLight(0xffffff, 2, 100);
    light3.position.set(0, 30, -5);
    scene.add(light3);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.enablePan = true;

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }, []);
  return <canvas id="webgl"></canvas>;
}
