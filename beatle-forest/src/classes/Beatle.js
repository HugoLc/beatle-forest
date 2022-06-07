const Pm = 5; //mutation probability
class Beatle{
    #red;
    #green;
    #blue;
    constructor(enviroment){
        this.#red = Math.floor(Math.random() * 256);
        this.#green = Math.floor(Math.random() * 256);
        this.#blue =  Math.floor(Math.random() * 256);
        this.enviroment = enviroment;
    }

    set setColor(color){
        this.#red = color[0]
        this.#green = color[1]
        this.#blue = color[2]
    }

    get color(){
        return [this.#red, this.#green, this.#blue];
    }

    get fitness(){
            let redCompared = this.#red > this.enviroment[0] ? (this.#red - this.enviroment[0]): (this.#red - this.enviroment[0])*-1;
            let greenCompared = this.#green > this.enviroment[1] ? (this.#green - this.enviroment[1]): (this.#green - this.enviroment[1])*-1;
            let blueCompared = this.#blue > this.enviroment[2] ? (this.#blue - this.enviroment[2]): (this.#blue - this.enviroment[2])*-1;

            let totalValue = redCompared + greenCompared + blueCompared;

            let fitnessPercent = ((255 - totalValue)*100)/255; 
           
            //return(fitnessPercent);
            return(255 - totalValue);
   
    }

    procriate(beatle){
        return new Promise((resolve)=>{
            const myColor = this.color;
            const otherBeatleColor = beatle.color;

            const myColorFragment = myColor.slice(0,2);
            const otherColorFragment = otherBeatleColor.slice(-1);

            let babyBeatleColor =  myColorFragment.concat(otherColorFragment);
            const mutationValue = Math.floor(Math.random() * 100)
            if(mutationValue < Pm){
                console.log("houve mutação");
                babyBeatleColor = this.#mutate(babyBeatleColor)
            }

            resolve(babyBeatleColor)
        })
    }

    async #mutate(babyColor){
        const indexOfChange = Math.floor(Math.random() * 3);
        
        switch (indexOfChange) {
            case 0:
                babyColor[0] = Math.floor(Math.random() * 256);
                break;
            case 1:
                babyColor[1]= Math.floor(Math.random() * 256);
                break;
            case 2:
                babyColor[2] = Math.floor(Math.random() * 256);
                break;
            default:
                break;
        }
        return babyColor;
    }

}

export default Beatle;