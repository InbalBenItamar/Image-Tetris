
export default class Board{
    constructor(viewElement){
        this.paintedCells = [];
        this.viewElement = viewElement;
    };

    getPosition(){
        return this.viewElement.position;
    }

    getPaintedCells(){
        return this.paintedCells;
    }

    setPaintedCell(index){
        this.paintedCells.push(index)
    }

}