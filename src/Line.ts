interface ILine{
    x:number;
    y:number;
    totalLength: number;
    // movementSpeed: number;
    width:number;
    color: string;

    drawLine:(ctx: CanvasRenderingContext2D)=> void;
    updateLine:(input:{y:number, ctx: CanvasRenderingContext2D, resetHeight:number})=> void;
}

export interface LineInput{
    x:number;
    y:number;
    totalLength:number;
    // movementSpeed:number;
    width:number;
    color:string;
}

export  class Line implements ILine{

    totalLength: number;
    // movementSpeed: number;
    width: number;
    x:number;
    y:number;
    color: string;

    constructor(input:LineInput){

        this.totalLength = input.totalLength;
        // this.movementSpeed = input.movementSpeed;
        this.width = input.width;
        this.x = input.x;
        this.y = input.y;
        this.color = input.color;

    }

    drawLine = (ctx: CanvasRenderingContext2D) => {

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y,this.width,this.totalLength);
    };

    updateLine = (input:{y:number, ctx: CanvasRenderingContext2D, resetHeight:number}):void => {


            if(input.y <= -10){

            // console.log('y::',this.y)

            // console.log(input.resetHeight)

                
                input.ctx.clearRect(this.x,this.y, this.width, this.totalLength);

                this.y = input.resetHeight;

                // console.log('window-inner-height::', window.innerHeight, input.ctx)

                this.drawLine(input.ctx)

            }else{
                
                input.ctx.clearRect(this.x,this.y, this.width, this.totalLength);

                this.y = input.y

                this.drawLine(input.ctx);

            }


    };

}