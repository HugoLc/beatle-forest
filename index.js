const Beatle = require('./src/classes/Beatle');
const chalk = require("chalk"),
    ctx = new chalk.Instance({level: 3})
const env = [23,255,50];
const populationLength = 10;
var population = [];


function generateInitialPopulation(){
    return new Promise((resolve) =>{
        for (let i = 0; i < populationLength; i++) {
            const beatle = new Beatle(env);
            const objBeatle = {
                beatle : beatle,
                fit :  beatle.fitness,
                color: beatle.color,
                rank: 0
            }
            population = [...population, objBeatle];
        }
        resolve()
    })
}

function sortPopulation(){
    return new Promise((resolve) =>{ 
        population.sort((a,b)=>{
            return b.fit - a .fit
        })
        resolve()
    })
}

function rankPopulation(){
    return new Promise((resolve)=>{
        let newRank = populationLength;
        population.forEach((e)=>{
            e.rank = newRank;
            newRank--
        })
        resolve()
    })
}

function distributeBeatles(){
    return new Promise((resolve)=>{
        let distributedBeatles =[]
        population.forEach((e)=>{
            let rank = e.rank;
            for (let i = 0; i < rank; i++) {
                distributedBeatles.push(e)
            }
        })
        
        resolve(distributedBeatles)
    })
}

function selectBeatles(){
    return new Promise(async (resolve)=>{
        let parents = []
        let dist = await distributeBeatles()
        dist.forEach((e)=>{
            console.log(e.color,e.rank)
        })
        let indexOne = Math.floor(Math.random() * dist.length+1);
        let indexTwo = Math.floor(Math.random() * dist.length+1);
        console.log(indexOne, indexTwo)
        while(dist[indexOne] === dist[indexTwo]){
            console.log(indexOne, indexTwo)
            indexTwo = Math.floor(Math.random() * dist.length);
        }
        parents = [dist[indexOne], dist[indexTwo]]
        resolve(parents)
    })
}

function aplyMutation(){
    return new Promise((resolve)=>{
        let randomIndex = Math.floor(Math.random() * population.length+1);
        while(randomIndex === 0 || randomIndex === 1){
            randomIndex = Math.floor(Math.random() * population.length+1);
        }

        population[randomIndex].beatle.mutate();
        resolve(population[randomIndex])
    })
}

async function main(){
    await generateInitialPopulation()
    await sortPopulation();
    console.log(ctx.bgRgb(env[0],env[1],env[2])("env",env))
    console.log("...")
    await rankPopulation();
    const parents = await selectBeatles();
    const baby = new Beatle(env);
    baby.setColor = await parents[0].beatle.procriate(parents[1].beatle);

    const mutant = await aplyMutation();

    // criar procriação e mutação proporcional ao numero da população. porcentagem

    /* console.log(ctx.rgb(babyColor[0],babyColor[1],babyColor[2])(babyColor));



    parents.forEach((element)=>{
        console.log(ctx.rgb(element.color[0],element.color[1],element.color[2]).bold(element.color, element.fit,element.rank))
    }) */
}

main()

