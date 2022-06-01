class Beatle{
    #red;
    #green;
    #blue;
    constructor(color, enviroment){
        this.#red = color ? color[0] : Math.floor(Math.random() * 256);
        this.#green = color ? color[1] : Math.floor(Math.random() * 256);
        this.#blue =  color? color[2] : Math.floor(Math.random() * 256);
        this.enviroment = enviroment;
    }

    get color(){
        return [this.#red, this.#green, this.#blue];
    }

    get fitness(){
        return new Promise(async(resolve) =>{
            let redCompared = this.#red > this.enviroment[0] ? (this.#red - this.enviroment[0]): (this.#red - this.enviroment[0])*-1;
            let greenCompared = this.#green > this.enviroment[1] ? (this.#green - this.enviroment[1]): (this.#green - this.enviroment[1])*-1;
            let blueCompared = this.#blue > this.enviroment[2] ? (this.#blue - this.enviroment[2]): (this.#blue - this.enviroment[2])*-1;

            console.log("redCompared",redCompared)

            let totalValue = redCompared + greenCompared + blueCompared;

            resolve(100 - totalValue);
        });
    }

    async procriate(beatle){
        let myColor = this.color();
        let otherBeatleColor = beatle.color;

        let myColorFragment = myColor.slice(-2);
        let otherColorFragment = otherBeatleColor.slice(1);

        let babyBeatleColor =  myColorFragment.concat(otherColorFragment);

        return babyBeatleColor;
    }

    async mutate(){

    }

}

module.exports = Beatle;