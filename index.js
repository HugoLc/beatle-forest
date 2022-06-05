const Beatle = require('./src/classes/Beatle');
const chalk = require("chalk"),
    ctx = new chalk.Instance({level: 3})
const env = [23,255,50];
const populationLength = 10;
var population = [];
var newPopulation = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

function sortPopulation(pop){
    return new Promise((resolve) =>{ 
        pop.sort((a,b)=>{
            return b.fit - a .fit
        })
        resolve(pop)
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
        /* dist.forEach((e)=>{
            console.log(e.color,e.rank)
        }) */
        let indexOne = Math.floor(Math.random() * dist.length+1);
        let indexTwo = Math.floor(Math.random() * dist.length+1);
        //console.log(indexOne, indexTwo)
        while(dist[indexOne] === dist[indexTwo]){
            console.log(indexOne, indexTwo)
            indexTwo = Math.floor(Math.random() * dist.length);
        }
        parents = [dist[indexOne], dist[indexTwo]]
        resolve(parents)
    })
}

function createBeatle(){
    return new Promise((resolve)=>{
        const baby = new Beatle(env);
        resolve(baby)
    })
}

function generateNewPopulation(newPop){
    return new Promise(async (resolve)=>{
        let procriationList = newPop;
        while(procriationList.length < populationLength){
            const parents = await selectBeatles();
            const baby = await createBeatle();
            //console.log("parents",parents)
            await sleep(1000);


            ////////////////////////    CHECAR ERRO NESSA P
            baby.setColor = await parents[0].beatle.procriate(parents[1].beatle);
            const babyObj = {
                beatle : baby,
                fit :  baby.fitness,
                color: baby.color,
                rank: 0
            }
            procriationList.indexOf(babyObj.color)===-1 && procriationList.push(babyObj)
        }
        procriationList.forEach((e)=>{
            console.log(e)
        })
        resolve(procriationList)
    })
}

async function main(){
    let stopPoint = 0
    let topBeatle;
    let newTopBeatle;
    await generateInitialPopulation()
    while(stopPoint < 3){
        population = await sortPopulation(population);
        console.log(ctx.bgRgb(env[0],env[1],env[2])("env",env))
        console.log("...")
        await rankPopulation();
        newTopBeatle = population.slice(0,1);
        if (newTopBeatle === topBeatle) {
            stopPoint++
        } else {
            topBeatle = newTopBeatle
        }
        /* population.forEach((e)=>{
            console.log(e.color, e.rank)
        }) */
        console.log("newPopulation")
        newPopulation = population.slice(0,3)
        newPopulation.push(await generateNewPopulation(newPopulation))

        population = newPopulation;
        /* newPopulation.forEach((e)=>{
            console.log(e.color)
        }) */

        /* console.log(ctx.rgb(babyColor[0],babyColor[1],babyColor[2])(babyColor));

        parents.forEach((element)=>{
            console.log(ctx.rgb(element.color[0],element.color[1],element.color[2]).bold(element.color, element.fit,element.rank))
        }) */
    }
    
    console.log(ctx.bgCyanBright("E melhor elemento foi solecionado"))
    console.log(ctx.rgb(topBeatle.color[0],topBeatle.color[1],topBeatle.color[2]).bold(topBeatle.color, topBeatle.fit,topBeatle.rank))
}

main()

