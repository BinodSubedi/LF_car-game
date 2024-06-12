class Canvas{
    height:string;
    width:string;
    private myClassName:string;
    private targetClassName:string;
    constructor(height:string, width:string, myClassName:string, targetClassName:string){

        this.height = height;
        this.width = width;
        this.myClassName = myClassName;
        this.targetClassName = targetClassName;
    }

    create(): HTMLCanvasElement {
        const canvasElement = document.createElement('canvas');
        canvasElement.classList.add(`.${this.myClassName}`);
        canvasElement.style.height = this.height;
        canvasElement.style.width = this.width;
        document.querySelector(`.${this.targetClassName}`)?.appendChild(canvasElement);
        return canvasElement
    }

}


export default Canvas;