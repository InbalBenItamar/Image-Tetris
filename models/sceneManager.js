export default class SceneManager{
    constructor(scene, camera, renderer){
        this.elements = [];
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
    }

    getScene(){
        return this.scene;
    }

    getCamera(){
        return this.camera;
    }

    getElements(){
        return this.elements;
    }

    getRenderer(){
        return this.renderer;
    }

    addAndDrawElement(element){
        this.addElement(element);
        this.drawElements([element]);
    }

    drawElements(elements){
        elements.forEach((el) => {
            if(Object.prototype.toString.call(el.viewElement) === '[object Array]'){
                el.viewElement.forEach((el) => {
                    this.scene.add(el)
                })
            }
            else{
                this.scene.add(el.viewElement);
            }
        })
    }

    addElement(element){
        this.elements.push(element);
    }

    addElements(elements){
        this.elements = Object.values(elements);
    }
}
