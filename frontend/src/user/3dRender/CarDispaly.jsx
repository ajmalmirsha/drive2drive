import * as THREE from "three";
import gsap from "gsap";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import React, { useEffect } from "react";

// import '../porshe/textures/'

function CarDisplay() {

  
  useEffect(() => {
    const canvas = document.querySelector(".display");

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0xcbd6ce);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load("/3d/porshe/textures/scene.gltf", (gltfScene) => {
      scene.add(gltfScene.scene);
    });
    const light = new THREE.PointLight(0xffffff, 500, 100);
    light.position.set(10, 20, 10);
    scene.add(light);
    const sideLight = new THREE.AmbientLight(0xffffff, 10, 100);
    sideLight.position.set(0, 0, 0);
    scene.add(sideLight);

    const ampientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ampientLight);

    // camera
    const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height);
    camera.position.z = 10;

    scene.add(camera);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.enableZoom = false;

    const renderer = new THREE.WebGLRenderer({ canvas });

    const loop = () => {
      controls.update();
      renderer.setSize(sizes.width, sizes.height);
      renderer.render(scene, camera);
      window.requestAnimationFrame(loop);
    };

    loop();

    const timeLine = gsap.timeline({ defaults: { duration: 1 } });
    // timeLine.fromTo(mesh.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
    timeLine.fromTo(canvas.current, { opacity: 0 }, { opacity: 1 });
  }, []);
  return (
    <>
      <canvas className="display"></canvas>
    </>
  );
}

export default CarDisplay;
