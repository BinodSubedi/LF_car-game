import Vehicle from "./Vehicle";


export default class MainCar extends Vehicle{

    constructor(x:number,y:number,height:number,width:number, src:string){
        super(x,y,height,width,src);
    }

    moveLeft(ctx:CanvasRenderingContext2D){

        if(this.x == 24){
            return;
        }

        this.clear(ctx);
        this.updateElementWithoutClear(this.x == 128 ? 24 : 128, this.y, ctx);


    }

    moveRight(ctx:CanvasRenderingContext2D){

        if(this.x == 232){
            return;
        }
        this.clear(ctx);
        this.updateElementWithoutClear(this.x == 24 ? 128 : 232, this.y,ctx);

    }

}