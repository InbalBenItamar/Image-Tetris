import {createSceneManager, createBoard, createImage, sceneManager, createCube} from './view';
import Game from '../models/game';
import Cube from '../models/cube';
let configs= require('../data');

let boardCellsMap ={};
let paintedCells = [];
let imageCellIndexes = [];


let compareCubePostionWithImage = (cubeIndex, imagePaintedIndexes) => {
    return (imagePaintedIndexes.indexOf(cubeIndex) >= 0);

};

let affixCubeAndGenerateNextCube = (cube, cellsMap, cb) => {
    let closestCellHeight = calcClosestCellBorder(cube.getPosition(), cube.getWidth()),
        cellIndex;
    cube.setPosition({y: closestCellHeight});
    cube.setState({active: false, fixed: true});

    cellIndex = getCellIndex(cube.getPosition(), cellsMap);

    paintCell(cellIndex);
    cb && cb(cellIndex);

};

let calcClosestCellBorder = (position, width) => {
    let {y} = position,
        closestBorder = Math.round((y / width)) * width,
        yEndBorder = -250 + Math.round(width/2),
        xEndBorder = 250 - Math.round(width/2);
    if(closestBorder < yEndBorder){
        return yEndBorder;

    }
    else if(closestBorder > xEndBorder){
       return xEndBorder;
    }
    else{
        return (closestBorder);
    }
};

let nextCube = (cubeConfig) => {
    return createCube(cubeConfig);
};

export function createKeyName(x,y){
   return ("" + x + "," + y);
}

let getCellIndex = (position, cellsMap) => {

  return cellsMap[createKeyName(position.x, position.y)]
};

let paintCell = (cellIndex) => {
    paintedCells.push(cellIndex);
    if(imageCellIndexes.indexOf(cellIndex) < 0){
        //game over alert and stop game
    }

};



export function prepareElementsByPhase(viewConfigByPhase, cb){
    let boardConfigs = viewConfigByPhase["board"],
        imageConfigs = viewConfigByPhase["image"],
        imageExample = [1,2,3,4,5,6, 10, 11, 15, 16, 20,21,22,23,24,25],
        elements = {};

    let board = createBoard(boardConfigs);
    let image = createImage(imageExample, imageConfigs);

    elements.board = board;
    elements.image = image;


    cb && cb (elements)


}

let createTextElement = (text, id) => {
    let newDiv = document.createElement("div"),
        newContent = document.createTextNode(text),
        canvasNode = document.getElementById("canvas");


    newDiv.setAttribute("id", id);
    newDiv.appendChild(newContent);

    document.body.insertBefore(newDiv, canvasNode);
};

export function startNewGame(sceneManager){
    let game = new Game(100),
        cubesPerPhaseCounter = 0,
        cubePerPhase,
        viewConfigs = configs["viewConfigByPhase"][game.getPhase()],
        cubeConfig = viewConfigs["cube"];

    prepareElementsByPhase(viewConfigs, (elements) => {
        sceneManager.addElements(elements);
        game.addElements(elements);
    });

    cubePerPhase = game.getCubesPerPhase();

    createTextElement("Press any key to start", "opening-text");
    document.addEventListener("keydown", function start(e){
        e.currentTarget.removeEventListener(e.type, start);
        document.getElementById("opening-text").remove();
        createTextElement("Move cube with righ/left/down arrows. Use 'space' to stop the cube, and 'a' to affix the cube to it's final position", "instructions");
        let newCub = createCube(cubeConfig);

        sceneManager.addElement(newCub);
        sceneManager.drawElements(sceneManager.getElements());

        ////////////refactor
        document.addEventListener("keydown", (e) => {
            let currentElements = sceneManager.getElements(),
                cube = currentElements[currentElements.length -1];

            //check for cube

            let cubeXPos = cube.getPosition()["x"],
                cubeYPos = cube.getPosition()["y"],
                cubeWidth = cube.getWidth(),
                positiveEndBorder = 250 - Math.round(cubeWidth/2);

            if(e.key === ' '){
                cube.setState({active: !cube.getState()["active"]});
            }
            else if(e.key === "ArrowRight" && cubeXPos < positiveEndBorder){
                cube.setPosition({x: cubeXPos + cubeWidth}) ;
            }
            else if(e.key === "ArrowLeft" && cubeXPos > (positiveEndBorder * -1)){
                cube.setPosition({x: cubeXPos - cubeWidth}) ;
            }
            else if(e.key === "ArrowDown" && cubeYPos > (positiveEndBorder * -1)){
                cube.setPosition({y: cubeYPos - cubeWidth}) ;
            }
            else if(e.key === "a"){

                //refactor anonymous cb
                cubesPerPhaseCounter +=1;
                affixCubeAndGenerateNextCube(cube, game.getCellsMap(), (cubeIndex) => {

                    let cubeInValidCell = compareCubePostionWithImage(cubeIndex, game.getImageIndexes());

                    if(!cubeInValidCell){
                        console.log("Game over");
                    }
                    else if(cubesPerPhaseCounter < cubePerPhase){
                        let newCube = nextCube(cubeConfig);
                        sceneManager.addAndDrawElement(newCube);
                    }
                    else{
                        console.log("You win!");
                    }

                });

            }

        });

    });

    let mainLoop = () => {
        let elements = sceneManager.getElements(),
            cube = elements[elements.length -1];


        if(cube && cube instanceof Cube){
            let state = cube.getState();
            if(state.active){
                cube.viewElement.position.y -= 0.8
            }

        }



        sceneManager.getRenderer().render(sceneManager.getScene(),sceneManager.getCamera());
        requestAnimationFrame(mainLoop);
    };

    mainLoop();

}
