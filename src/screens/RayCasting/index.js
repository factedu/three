import React, { Component } from 'react';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class RayCasting extends Component {
    width = window.innerWidth;
    height = window.innerHeight;
    container;
    stats;
    camera;
    scene;
    raycaster;
    renderer;


    mouse = new THREE.Vector2();//, 
    INTERSECTED;
    radius = 100;
    theta = 0;

    constructor(props) {
        super(props);
        this.containerRef = React.createRef();

        this.loader = new THREE.TextureLoader();

        this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 1, 10000);
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0);

        this.raycaster = new THREE.Raycaster();

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // this.containerRef.appendChild(this.renderer.domElement);



        this.render3d.bind(this);
        this.animate.bind(this);

        document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
    }

    addAmbianceLight(scene) {
        // const light = new THREE.AmbientLight(0x87341c); // fact logo light
        const light = new THREE.AmbientLight(0x444444); // fact logo light
        scene.add(light);
    }

    addDirectionalLight(scene) {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1).normalize();
        scene.add(light);
    }

    addRoughGeomatery(scene,url='FactLogo-innerCircle.svg') {
        const geometry = new THREE.BoxBufferGeometry(20, 20, 20);
        const texture = this.loader.load(url);

        for (var i = 0; i < 1000; i++) {
            // const object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));
            const object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ map:texture }));

            object.position.x = Math.random() * 800 - 400;
            object.position.y = Math.random() * 800 - 400;
            object.position.z = Math.random() * 800 - 400;

            object.rotation.x = Math.random() * 2 * Math.PI;
            object.rotation.y = Math.random() * 2 * Math.PI;
            object.rotation.z = Math.random() * 2 * Math.PI;

            object.scale.x = Math.random() + 0.5;
            object.scale.y = Math.random() + 0.5;
            object.scale.z = Math.random() + 0.5;

            scene.add(object);
        }
    }

    onDocumentMouseMove(event) {
        event.preventDefault();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }

    init() {
        this.containerRef.current.appendChild(this.renderer.domElement);
        this.addDirectionalLight(this.scene);
        this.addAmbianceLight(this.scene);
        this.addRoughGeomatery(this.scene);
        this.animate();
    }

    componentDidMount() {
        this.init();
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.render3d();
        // this.stats.update();

    }

    render3d() {
        this.theta += 0.1;

        this.camera.position.x = this.radius * Math.sin(THREE.MathUtils.degToRad(this.theta));
        this.camera.position.y = this.radius * Math.sin(THREE.MathUtils.degToRad(this.theta));
        this.camera.position.z = this.radius * Math.cos(THREE.MathUtils.degToRad(this.theta));
        this.camera.lookAt(this.scene.position);

        this.camera.updateMatrixWorld();

        // find intersections

        this.raycaster.setFromCamera(this.mouse, this.camera);

        var intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {

            if (this.INTERSECTED != intersects[0].object) {

                if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);

                this.INTERSECTED = intersects[0].object;
                this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
                // this.INTERSECTED.material.emissive.setHex(0xff0000);
                this.INTERSECTED.material.emissive.setHex(0x87341c);

                // console.log(this.INTERSECTED);
                // const x = this.INTERSECTED.rotation.x;
                // const y = this.INTERSECTED.rotation.y;
                // const z = this.INTERSECTED.rotation.z;

                // this.INTERSECTED.rotation.set(x+0.1,y,z);
                // this.INTERSECTED.rotation.x +=0.1;

            }

        } else {

            if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);

            this.INTERSECTED = null;

        }

        if(this.INTERSECTED){
            // this.INTERSECTED.rotation.x +=0.1;
            // this.INTERSECTED.rotation.y +=0.1;
            this.INTERSECTED.rotation.z +=0.1;
        }
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        return (
            <div id="threeContainer" ref={this.containerRef}>
            </div>
        )
    }
}