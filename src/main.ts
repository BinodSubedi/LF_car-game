import Canvas from './Canvas'
import './style.css'
import {Line} from './Line'
import MainCar from './MainCar';
import Vehicle from './Vehicle';


const canvasDefaultHeight = 720;
const canvasDefaultWidth = 720;

const canvasOne = new Canvas(`${canvasDefaultHeight}px`,`${canvasDefaultWidth}px`,'canva','app')
const canvasElement = canvasOne.create()

canvasElement.style.background = 'black'

const ctx = canvasElement.getContext('2d');

// ctx!.fillStyle = 'green';

// const rect = ctx?.fillRect(0,0,100,100);

const lineDefaultHeight = 22;
const lineDefaultWidth = 10;

const defaultLineSeperation = 18;

const rectangle1 = new Line({x:(canvasElement.width /2) - lineDefaultWidth,y: defaultLineSeperation,totalLength: lineDefaultHeight, width: lineDefaultWidth, color:'white'}) 
rectangle1.drawLine(ctx!);


const rectangle2 = new Line({x:(canvasElement.width /2) - lineDefaultWidth,y: lineDefaultHeight+ defaultLineSeperation*2,totalLength: lineDefaultHeight, width: lineDefaultWidth, color:'white'}) 
rectangle2.drawLine(ctx!);


const rectangle3 = new Line({x:(canvasElement.width /2) - lineDefaultWidth,y: lineDefaultHeight*2 + defaultLineSeperation*3,totalLength: lineDefaultHeight, width: lineDefaultWidth, color:'white'}) 
rectangle3.drawLine(ctx!);


const rectangle4 = new Line({x:(canvasElement.width /2) - lineDefaultWidth,y: lineDefaultHeight*3 + defaultLineSeperation*4,totalLength: lineDefaultHeight, width: lineDefaultWidth, color:'white'}) 
rectangle4.drawLine(ctx!);

const lineArr = [rectangle1, rectangle2, rectangle3, rectangle4];

const mainCar = new MainCar(128, 110, 35, 35, './images/main_car.png');

const lane1Car = new Vehicle(24, 0, 35,35, './images/car_enemy_1.png');

const lane2Car = new Vehicle(128,0,35,35,'./images/car_enemy_2.png')

const lane3Car = new Vehicle(232,0,35,35,'./images/car_enemy_3.png')

const laneCarsArr = [lane1Car,lane2Car,lane3Car];

if (ctx != undefined) {

    mainCar.create(ctx);
    lane1Car.create(ctx);
    lane2Car.create(ctx);
    lane3Car.create(ctx);
}

enum CarGenerationStage{
    generated,
    idle,
}

let generatedState: CarGenerationStage = CarGenerationStage.idle;

// enum EndLineState{

//     Reached,
//     NotFound

// }

// let endLineStateLedger = {0:EndLineState.NotFound, 1:EndLineState.NotFound, 2:EndLineState.NotFound}

let randomCombination = [1,0,1]


const randomCombinationGenerator = ()=>{
    if(generatedState == CarGenerationStage.idle){

        generatedState = CarGenerationStage.generated;

        const one = Math.floor(Math.random() * 2);
        const two = Math.floor(Math.random() * 2);
        const three = Math.floor(Math.random() * 2);

        // const heightGainer = Math.floor(Math.random()*3);

        // heighFluctuater[heightGainer] = 1;


        randomCombination[0] = one;
        randomCombination[1] = two;
        randomCombination[2] = three;

        if(one == 1 && two == 1 && three == 1){

            const randomMixer = Math.floor(Math.random() *3); 

            randomCombination[randomMixer] = 0;

        } else if (one == 0 && two == 0 && three == 0) {

            const randomMixer = Math.floor(Math.random() * 3);

            randomCombination[randomMixer] = 1;


        }

        for(let i=0;i<randomCombination.length;i++){

            if(randomCombination[i] == 1){
                laneCarsArr[i].y = -30;
                break;
            }

        }


    }
    return;
}



const collisionDetection = (comparingCar: Vehicle) => {

    if (comparingCar.x == mainCar.x && comparingCar.y >= mainCar.y - (mainCar.height - 10)) {
        window.alert(`Game Over!!!  score::${score}`)
        score = 0
        // lane1Car.y = 0;
        // lane2Car.y = 0;
        // lane3Car.y = 0;

        laneCarsArr.forEach((el)=>{
            el.clear(ctx!);
            el.y = 0
        })

        generatedState = CarGenerationStage.idle;
    }
}

let initialCarSpeed = 0.5;

let score = 0

const updateFrames = () => {

    if (ctx == undefined) {
        return;
    }


    mainCar.clear(ctx);
    lane1Car.clear(ctx);
    lane2Car.clear(ctx);
    lane3Car.clear(ctx);

    ctx.font = "12px serif";
    ctx.fillStyle = 'white'
    ctx.fillText(score.toString(), 24,15, 30);
     

    lineArr.forEach((el)=>{
        el.updateLine({y: el.y - 1, ctx, resetHeight: lineDefaultHeight *3 + defaultLineSeperation*5})
    }) 


    randomCombinationGenerator();

    // mainCar.updateElementWithoutClear(128,110,ctx);
    mainCar.reserect(ctx);

    randomCombination.forEach((el,i)=>{

      
        switch(i){
            case 0:
                if(el == 1){
              
                lane1Car.updateElementWithoutClear(lane1Car.x,lane1Car.y+(initialCarSpeed),ctx);

                // if(lane1Car.x == mainCar.x && lane1Car.y == mainCar.y+5){
                //     window.alert('Game Over')
                // }
                collisionDetection(lane1Car);

                }
                break;
            case 1:
                if(el == 1){
                  
                    lane2Car.updateElementWithoutClear(lane2Car.x, lane2Car.y +(initialCarSpeed), ctx);
                    collisionDetection(lane2Car);
                }
                break;
            case 2:
                if (el == 1) {

                    lane3Car.updateElementWithoutClear(lane3Car.x, lane3Car.y + (initialCarSpeed), ctx);
                    collisionDetection(lane3Car);
                }
                break;


        }

        if (laneCarsArr[i].y == 160) {

            score++;

            //leveles
            switch(score){
                
                case 10:
                    initialCarSpeed += 0.5;
                    break;
                case 30:
                    initialCarSpeed += 1;
                    break;
                case 60:
                    initialCarSpeed += 1;
            }

            laneCarsArr[i].clear(ctx)
            laneCarsArr[i].y = 0;
            randomCombination[i] = 0;
            // el = 0;
        
        }

    })


    if(!(randomCombination[0] || randomCombination[1] || randomCombination[2])){

            generatedState = CarGenerationStage.idle;
        
        }



    // lane2Car.updateElementWithoutClear(128,0,ctx);
 
    requestAnimationFrame(updateFrames);

}


updateFrames();


window.addEventListener('keydown',(e)=>{
    switch(e.key){

        case "ArrowLeft":
            console.log('left');
            mainCar.moveLeft(ctx!);
            break;

        case "ArrowRight":
            console.log('right');
            mainCar.moveRight(ctx!)
            break;

    }
})