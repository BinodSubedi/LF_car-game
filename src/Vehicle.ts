export default class Vehicle{

    x:number;
    y:number;
    height:number;
    width:number;
    src:string;
    image: HTMLImageElement | null = null;

    constructor(x:number,y:number,height:number,width:number, src:string){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.src = src;

    }

    create(ctx: CanvasRenderingContext2D){

        const image = new Image()

        this.image = image;

        image.onload = () => {

            ctx.drawImage(image, this.x, this.y, this.height, this.width);

        }

        image.src = this.src;

    }

    clear(ctx: CanvasRenderingContext2D){

        ctx.clearRect(this.x,this.y, this.height, this.width);

    }

    reserect(ctx:CanvasRenderingContext2D){
        ctx.drawImage(this.image!,this.x, this.y, this.height, this.width);
    }

    updateElement(x:number,y: number,ctx: CanvasRenderingContext2D){

        ctx.clearRect(this.x, this.y, this.height,this.width);

        this.y = y;

        if(x !== null){

            this.x = x; 

        }

        // this.create(ctx);

        this.clear(ctx);


        ctx.drawImage(this.image!, x, y, this.height, this.width);

    }

    updateElementWithoutClear(x: number, y: number, ctx: CanvasRenderingContext2D) {

        this.x = x;
        this.y = y;

        ctx.drawImage(this.image!, x, y, this.height, this.width);

    }

}