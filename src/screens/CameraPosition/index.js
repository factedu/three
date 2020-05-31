import React, { Component } from 'react';
import Layout from './../../components/Layout';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import $ from 'jquery';
import { textureLoader, addCubeWithTexture, addAmbianceLight, addDirectionalLight } from './../../helpers/tree.helper';

export default class CameraPosition extends Component {
    mouse = new THREE.Vector2();
    INTERSECTED;
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.canvasRef = React.createRef();
        this.width = 400;
        this.height = 400;
        // this.aspectRatio = this.width / this.height;
        this.aspectRatio = 16 / 8;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.aspectRatio, 0.01, 10000);


        // this.raycaster = new THREE.Raycaster();

        this.animate = this.animate.bind(this);


    };

    init() {
        this.canvas3d = $("#canvas3d").get(0);
        this.scene.background = new THREE.Color(0x000000);
        this.scene.add(this.camera);

        // this.scene.add( new THREE.GridHelper( 1000, 10 ) );

        this.cube = addCubeWithTexture(this.scene, 1, { x: 0, y: 0, z: 0 }, 'FactLogo-innerCircle.svg');
        this.cube2 = addCubeWithTexture(this.scene, 1, { x: 2, y: 2, z: 2 }, 'riti.jpeg');

        const renderAttrs = {
            antialias: true,
            canvas: this.canvas3d,
            powerPreference: "high-performance",
        };

        this.renderer = new THREE.WebGLRenderer(renderAttrs);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);

        // lights
        addAmbianceLight(this.scene, 0x888888);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.camera.position.set(0, 0, 10);

        this.setupRaycaster();

        this.animate();

        this.canvasRef.current.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
        this.canvasRef.current.addEventListener('dblclick', this.onDocumentDoubleClick.bind(this), false);
    }

    onDocumentMouseMove(event) {
        event.preventDefault();
        const { x, y } = this.getMousePos(this.canvasRef.current, event);
        this.mouse.x = (x / this.width) * 2 - 1;
        this.mouse.y = -(y / this.height) * 2 + 1;
    }

    onDocumentDoubleClick(event) {
        // this.setOrbiterTarget(this.mouse.x,this.mouse.y,)
        if (this.INTERSECTED) {
            const { x, y, z } = this.INTERSECTED.position;
            this.setOrbiterTarget(x,y,z);
        }
    }

    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        const x = evt.clientX - rect.left;
        const y = evt.clientY - rect.top;
        return { x, y };
    }

    setOrbiterTarget(x, y, z) {
        if (this.controls) {
            this.controls.target.set(x, y, z);
        }
    }

    positionCamera(camera, { x, y, z }) {
        camera.position.set(x, y, z);
        camera.updateProjectionMatrix();
    }

    setupRaycaster() {
        this.raycaster = new THREE.Raycaster();
        this.raycaster.params.Points.threshold = .15;
        this.raycaster.params.Line.threshold = .15;
    }



    animate() {
        this.updateCanvasSize();
        requestAnimationFrame(this.animate);
        // this.mouse.x=0;
        // this.mouse.y=0;
        this.raycaster.setFromCamera(this.mouse, this.camera);

        var intersects = this.raycaster.intersectObjects(this.scene.children);
        console.log(intersects);

        if (intersects.length > 0) {
            if (this.INTERSECTED != intersects[0].object) {
                console.log(this.INTERSECTED);
                if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
                this.INTERSECTED = intersects[0].object;
                this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
                this.INTERSECTED.material.emissive.setHex(0x87341c);
            }
        } else {
            if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
            this.INTERSECTED = null;
        }

        if (this.INTERSECTED) {
            // this.INTERSECTED.rotation.z += 0.1;
        }
        this.controls.update();
        this.camera.updateMatrix();
        this.renderer.render(this.scene, this.camera);
    }

    updateCanvasSize() {
        if (this.containerRef?.current) {
            this.width = this.containerRef.current.offsetWidth;
            this.height = this.width / this.aspectRatio;
            this.camera.aspect = this.width / this.height;
            this.renderer.setSize(this.width, this.height);
            this.camera.updateProjectionMatrix();
        }
    }

    componentDidMount() {
        this.init();
    }

    render() {
        return (
            <Layout title={"Camera Position Demo"}>
                <div ref={this.containerRef}>
                    <canvas ref={this.canvasRef} id="canvas3d" className="absoluteTopLeftZeroW100H100" width={this.width} height={this.height}></canvas>
                </div>
            </Layout>
        );
    }
}