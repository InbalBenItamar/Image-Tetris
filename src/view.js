import SceneManager from '../models/sceneManager'
import Board from '../models/board'
import Image from '../models/image'
import Cube from '../models/cube'


//create scene manager
let createSceneManager = (cameraConfig, rendererConfig) => {
    let sceneManager;

    sceneManager = new SceneManager(new THREE.Scene(),
        new THREE.PerspectiveCamera(...cameraConfig),
        new THREE.WebGLRenderer());

    //create scene
    //where to handle append??

    sceneManager.getScene().background = new THREE.Color(0xffffff);
    sceneManager.getCamera().position.z = 600;
    sceneManager.getRenderer().setSize(rendererConfig.width, rendererConfig.height);
    sceneManager.getRenderer().domElement.id = "canvas";
    document.body.appendChild(sceneManager.getRenderer().domElement);

    return sceneManager;

};

let createBoard = (boardConfigs) => {
    let boardGeometry = boardConfigs["geometry"],
        boardMaterial = boardConfigs["material"],
        geometry = Object.values(boardGeometry),
        width = boardGeometry.width/ boardGeometry.widthSegments,
        color = parseInt ( boardMaterial.color.replace("#","0x"), 16 ),
        viewElement,
        board;

        boardMaterial.color = color;
        viewElement =  new THREE.Mesh( new THREE.PlaneGeometry(...geometry),
            new THREE.MeshBasicMaterial(boardMaterial));

        board = new Board(viewElement);


    return board;
};

let createImage = (imageExample, imageConfig) => {
    let imageGeometry = imageConfig["geometry"],
        imageMaterial= imageConfig["material"],
        imagePosition= imageConfig["position"],
        color = parseInt ( imageMaterial.color.replace("#","0x"), 16 ),
        geometry = Object.values(imageGeometry),
        planeGeometry = new THREE.PlaneGeometry(...geometry),
        plane,
        wireframe = new THREE.WireframeGeometry( planeGeometry ),
        line = new THREE.LineSegments(wireframe ),
        viewElement = [],
        image;

    imageMaterial.color = color;
    plane = new THREE.Mesh(planeGeometry,
        new THREE.MeshBasicMaterial( imageMaterial));

    plane.position.z = imagePosition.z;
    plane.position.x = imagePosition.x;

    line.material.depthTest = false;
    line.material.opacity = 0.25;
    line.material.transparent = true;
    line.material.color.setHex(0x000000);
    line.position.z = imagePosition.z;
    line.position.x = imagePosition.x;

    imageExample.forEach((ind) => {

        plane.geometry.faces[(ind*2)-1].color.setHex(0x000000);
        plane.geometry.faces[(ind*2)-2].color.setHex(0x000000);

    });

    viewElement.push(plane);
    viewElement.push(line);

    image = new Image(viewElement, imageExample);

    return image;

};

let createCube = (cubeConfig) => {
    let cubeGeometry = cubeConfig["geometry"],
        cubeMaterial= cubeConfig["material"],
        cubePosition= cubeConfig["position"],
        geometry = Object.values(cubeGeometry),
        viewElement =  new THREE.Mesh( new THREE.BoxGeometry(...geometry),
            new THREE.MeshBasicMaterial(cubeMaterial)),
        cube;

    cube = new Cube(viewElement);
    cube.setPosition(cubePosition);

    return cube;
};

//************************************************************************************
export {createSceneManager, createBoard, createImage, createCube}