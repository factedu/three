import React from 'react';
import * as THREE from 'three';
import $ from 'jquery';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class CubeBasic extends React.Component {
    constructor(props) {
        super(props);
        this.width = props.width;
        this.height = props.height;
        this.aspectRatio = this.width / this.height;
        this.animate = this.animate.bind(this);
    }

    componentDidMount() {
        this.init();
    }

    init() {
        this.canvas3d = $("#canvas3d").get(0);
        this.canvasContainer = $('#canvasContainer').get(0);
        const loader = new THREE.TextureLoader();
        const scene = this.scene = new THREE.Scene();
        // scene.background = new THREE.Color(0xffffff);
        scene.background = loader.load('blur-bg.jpg');


        const camera = this.camera = new THREE.PerspectiveCamera(75, this.aspectRatio, 0.01, 10000);
        scene.add(camera);
        const texture = loader.load('FactLogo-innerCircle.svg');
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const geomatery = this.geomatery = new THREE.BoxGeometry(1, 1, 1);
        const cube = this.cube = new THREE.Mesh(geomatery, material);
        scene.add(cube);

        const ambianceLight = this.ambianceLight = new THREE.AmbientLight(0x000000);
        scene.add(ambianceLight);

        const directionalLight = this.directionalLight = new THREE.DirectionalLight(0xdfebff, 1);
        directionalLight.position.set(50, 200, 100);
        directionalLight.position.multiplyScalar(1.3);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        scene.add(directionalLight);

        const light = new THREE.PointLight(0x000000, 1, 100);
        light.position.set(500, 50, 50);
        scene.add(light);

        camera.position.set(0, 0, 4);

        const renderAttrs = {
            antialias: true,
            canvas: this.canvas3d,
            powerPreference: "high-performance",
        };

        const renderer = this.renderer = new THREE.WebGLRenderer(renderAttrs);
        renderer.setPixelRatio(window.devicePixelRatio);


        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.camera.position.set(0, 0, 5);
        this.controls.update();

        window.addEventListener('resize', this.onWindowResize, false);

        this.animate();

    }

    onWindowResize() {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        // camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);

    }


    animate() {
        requestAnimationFrame(this.animate);
        this.cube.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
    }

    render() {
        return (
            <div id="canvasContainer">
                <canvas id="canvas3d" className="absoluteTopLeftZeroW100H100" width={this.width} height={this.height}></canvas>
            </div>
        );
    }

}

export default CubeBasic;