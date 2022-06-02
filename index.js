const Beatle = require('./src/classes/Beatle');

const env = [23,255,50];
var population = [];


function generateInitialPopulation(){
    return new Promise((resolve) =>{
        for (let i = 0; i < 10; i++) {
            const beatle = new Beatle(env);
            population = [...population, beatle];

        }
        resolve()
    })
}

const teste = (a,b) => {
    return new Promise((resolve) =>{
        if (a.name > b.name) {
            resolve(1);
        }
        if (a.name < b.name) {
            resolve(-1);
        }
        // a must be equal to b
        resolve(0)
    })
}

function sortPopulation(){
    return new Promise((resolve) =>{ 
        console.log("OIII")
        population.sort(async (a,b)=>{
            const aFit =  a.fitness;
            const bFit =  b.fitness;
            console.log("aFit",aFit)
            console.log("bFit",bFit)
            teste(a,b)
            
        })
        resolve()
    })
}

async function main(){
    await generateInitialPopulation()
    population.forEach(element => {
        console.log( element.color)
    });
    await sortPopulation();
    console.log(".....")
    population.forEach(element => {
        console.log( element.color)
    });
}

main()

