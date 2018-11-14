import {createKeyName} from "../src/controllers";

export default class Game {
    constructor(segmentWidth) {
        this.phase = 1;
        this.cellsMap = this.generateNewBoard(segmentWidth);
        this.board = {};
        this.image = {};
        this.cubes = [];
    }

    generateNewBoard(segmentWidth) {
        let map = {};
        let cubeWidth = segmentWidth;
        let xStartPoint = -250 + Math.round(segmentWidth/2);
        let yStartPoint =  250 - Math.round(segmentWidth/2);
        let counter = 0;

        for (let i = yStartPoint; i >= (yStartPoint * -1); i -= cubeWidth) {
            let str = "";
            for (let j = xStartPoint; j <= (xStartPoint * -1); j += cubeWidth) {
                let keyName = createKeyName(j, i);
                map[keyName] = ++counter;
                str += ` ${keyName}: ${counter}, `;
            }
            console.log(str);

        }


        return map;
    }

    getPhase() {
        return this.phase;
    }


    getImageIndexes() {
        return this.image.getPaintedIndexes();
    }

    getCubesPerPhase(){
        return this.image.getPaintedIndexesLength();
    }

    getCellsMap() {
        return this.cellsMap;
    }

    setNextPhase() {
        this.phase += 1;
    }

    addCube(cube){
        this.cubes.push(cube)
    }

    addElements(elements){
        this.board = elements["board"];
        this.image = elements["image"];
        this.cubes = [];
    }

}

