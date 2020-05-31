import * as THREE from 'three';

export const textureLoader = (url) => {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(url);
    return texture;
};

export const addCubeWithTexture = (scene, size=1, { x, y, z }, url = 'FactLogo-innerCircle.svg') => {

    const texture = textureLoader(url);
    const material = new THREE.MeshLambertMaterial({ map: texture });
    const geomatery = new THREE.BoxGeometry(size,size,size);
    const cube = new THREE.Mesh(geomatery, material);
    cube.position.set(x, y, z);
    scene.add(cube);

    // const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
    // const texture = textureLoader(url);
    // const material = new THREE.MeshLambertMaterial({ map: texture });
    // // const material = new THREE.MeshLambertMaterial({ color, wireframe: false, transparent: false, opacity: 0.85 });
    // const cube = new THREE.Mesh(geometry, material);
    // cube.position.set(x, y, z);
    // cube.castShadow = true; //default is false
    // cube.receiveShadow = true; //default is false
    // scene.add(cube);
    return cube;
}

export const addAmbianceLight = (scene, color) => {
    // const light = new THREE.AmbientLight(0x87341c); // fact logo light
    const light = new THREE.AmbientLight(color); // fact logo light
    scene.add(light);
    return light;
};

export const addDirectionalLight = (scene, color, intensity, { x, y, z }) => {
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(x, y, z).normalize();
    scene.add(light);
    return light;
};