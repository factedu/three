import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import $ from 'jquery';

export default class OrbitControl extends Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();

        this.loader = new THREE.TextureLoader();

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xcce0ff);


        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);



        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);



        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    addGround(scene) {
        const groundTexture = this.loader.load('grasslight-big.jpg');
        groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set(225, 225);
        groundTexture.anisotropy = 16;
        groundTexture.encoding = THREE.sRGBEncoding;

        const groundMaterial = new THREE.MeshLambertMaterial({ map: groundTexture });

        const mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(20000, 20000), groundMaterial);
        mesh.position.y = - 25;
        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        scene.add(mesh);
    }

    addFog(scene) {
        scene.fog = new THREE.Fog(0xcce0ff, 50, 1000);
    }

    addCube(scene, color, { x, y, z },url='FactLogo-innerCircle.svg') {
        const geometry = new THREE.BoxBufferGeometry(2,2,2);
        const texture = this.loader.load(url);
        const material = new THREE.MeshLambertMaterial({map:texture});
        // const material = new THREE.MeshLambertMaterial({ color, wireframe: false, transparent: false, opacity: 0.85 });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        cube.castShadow = true; //default is false
        cube.receiveShadow = true; //default is false
        scene.add(cube);
        return cube;
    }

    addTorus(scene, color) {
        const geometry = new THREE.TorusBufferGeometry(6, 1, 16, 100, Math.PI * 2);
        const material = new THREE.MeshPhongMaterial({ color, wireframe: true });
        const torus = new THREE.Mesh(geometry, material);
        torus.castShadow = true; //default is false
        torus.receiveShadow = true; //default is false
        
        scene.add(torus);
        return torus;
    }

    addLine(scene, color) {
        const material = new THREE.LineDashedMaterial({ color });
        const points = [];
        points.push(new THREE.Vector3(-1, 0, 0));
        points.push(new THREE.Vector3(0, 1, 0));
        points.push(new THREE.Vector3(1, 0, 0));
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        scene.add(line);
    }

    addDirectionalLight(scene) {
        const directionalLight = new THREE.DirectionalLight(0xdfebff, 1);
        directionalLight.position.set(0, 1, 0); 			//default; light shining from top
        directionalLight.position.multiplyScalar(1.3);
        directionalLight.castShadow = true;

        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        scene.add(directionalLight);
    }

    addAmbianceLight(scene) {
        const light = new THREE.AmbientLight(0x888888); // soft white light
        scene.add(light);
    }

    init() {
        this.containerRef.current.appendChild(this.renderer.domElement);

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.scene.add(this.camera);
        // const geometry = new THREE.CylinderBufferGeometry(0, 10, 30, 4, 1);
        // const material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });

        this.addGround(this.scene);
        this.addFog(this.scene);

        this.cube1 = this.addCube(this.scene, 0xff00ff, { x: -2, y: 0, z: 0 },'kishu.jpeg');
        this.cube2 = this.addCube(this.scene, 0x0000ff, { x: 2, y: 0, z: 0 },'riti.jpeg');

        this.addLine(this.scene, 0x87341c);

        this.torus = this.addTorus(this.scene, 0x87341c);

        this.addAmbianceLight(this.scene);

        this.addDirectionalLight(this.scene);

        this.camera.position.z = 20;
        // this.camera.position.y=1;

        this.animate();


    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.cube1.rotation.x += 0.01;
        this.cube2.rotation.x += 0.01;
        this.torus.rotateY(0.05);
        this.renderer.render(this.scene, this.camera);
        // this.animation();
    }

    componentDidMount() {
        this.init();
    }

    render() {
        return (
            <div id="threeContainer" ref={this.containerRef}>

            </div>
        );
    };
}