import React, {Component} from 'react';
import Layout from './../../components/Layout';
import * as THREE from 'three';
import $ from 'jquery';
import { textureLoader } from './../../helpers/tree.helper';

export default class CameraPosition extends Component{
    constructor(props){
        super(props);
        this.containerRef = React.createRef();
        this.width = 400;
        this.height = 400;
        // this.aspectRatio = this.width / this.height;
        this.aspectRatio = 16/8;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.aspectRatio, 0.01, 10000);
        

        this.animate = this.animate.bind(this);


    };

    init(){
        this.canvas3d = $("#canvas3d").get(0);
        this.scene.background = new THREE.Color(0x000000);
        this.scene.add(this.camera);

        const texture = textureLoader('FactLogo-innerCircle.svg');
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const geomatery = this.geomatery = new THREE.BoxGeometry(1, 1, 1);
        this.cube = new THREE.Mesh(geomatery, material);
        this.scene.add(this.cube);

        const renderAttrs = {
            antialias: true,
            canvas: this.canvas3d,
            powerPreference: "high-performance",
        };

        this.renderer = new THREE.WebGLRenderer(renderAttrs);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);

        this.camera.position.set(0, 0, 4);


        this.animate();
    }

    onResize(){
        console.log('resized');
        
    }

    animate(){
        this.updateCanvasSize();
        requestAnimationFrame(this.animate);
        this.cube.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
    }

    updateCanvasSize(){
        if(this.containerRef?.current){
            this.width = this.containerRef.current.offsetWidth;
            this.height = this.width/this.aspectRatio;
            this.camera.aspect = this.width / this.height;
            this.renderer.setSize(this.width, this.height);
            this.camera.updateProjectionMatrix();
        }
    }

    componentDidMount(){        
        this.init();
    }

    render(){
        return (
            <Layout title={"Camera Position Demo"}>
                <div  ref={this.containerRef}>
                    <canvas id="canvas3d" className="absoluteTopLeftZeroW100H100" width={this.width} height={this.height}></canvas>
                </div>                
            </Layout>
        );
    }
}