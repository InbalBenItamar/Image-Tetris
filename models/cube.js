export default class Cube{
    constructor(viewElement){
        this.viewElement = viewElement;
        this.state = {
            active: true,
            fixed: false,
            dimension: 2
        };

        this.getState = this.getState.bind(this);

    }

    getViewElement(){
        return this.viewElement;
    }


    getState(){
        return this.state;
    }

    getPosition(){
        return this.viewElement.position;
    }

    getWidth(){
        return this.viewElement.geometry.parameters.width;
    }

    setState(newState){
        this.state = Object.assign(this.state, newState);
    }

    setPosition(position){
        Object.keys(position).forEach((coordinate) => {
            this.viewElement.position[coordinate] = position[coordinate]
        });

    }


}