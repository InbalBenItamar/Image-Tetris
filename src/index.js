import {createSceneManager} from './view'
import {startNewGame} from "./controllers";

let cameraConfig = [75, window.innerWidth/window.innerHeight, 1, 1000],
    rendererConfig = {
        width: window.innerWidth,
        height: window.innerHeight
    },
    sceneManager;

sceneManager = createSceneManager(cameraConfig, rendererConfig);
startNewGame(sceneManager);




