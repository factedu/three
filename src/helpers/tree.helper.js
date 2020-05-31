import * as THREE from 'three';

export const textureLoader = (url)=>{
    const loader = new THREE.TextureLoader();
    const texture = loader.load(url);
    return texture;
};