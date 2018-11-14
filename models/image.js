export default class Image{
    constructor(viewElement, paintedIndexesArray){
        this.paintedIndexes = paintedIndexesArray.slice(0);
        this.viewElement = viewElement;
    };

    getViewElement(){
        return this.viewElement;
    }

   getPaintedIndexes(){
        return this.paintedIndexes
   }

   getPaintedIndexesLength(){
        return this.paintedIndexes.length
   }

}