const Beatle = require('./src/classes/Beatle');
const chalk = require("chalk"),
    ctx = new chalk.Instance({level: 3})
const env = [Math.floor(Math.random() * 256),Math.floor(Math.random() * 256),Math.floor(Math.random() * 256)];
const populationLength = 30;
const stopPoint = 100;
var firstPopulation = [];
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
            firstPopulation = population;
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
    return new Promise(async (resolve)=>{
        let distributedBeatles =[]
        population.forEach((e)=>{
            let rank = e.rank;
            for (let i = 0; i < rank; i++) {
                distributedBeatles.push(e)
            }
        })
        //await sleep(500);
        resolve(distributedBeatles)
    })
}

function selectBeatles(){
    return new Promise(async (resolve)=>{
        let parents = []
        let dist = await distributeBeatles()
        
        let indexOne = Math.floor(Math.random() * dist.length);
        let indexTwo = Math.floor(Math.random() * dist.length);
        /* console.log('index',indexOne, indexTwo)
        console.log('parents',dist[indexOne], dist[indexTwo]) */
        while(dist[indexOne] === dist[indexTwo]){
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
        console.log("procriationList",procriationList)
        while(procriationList.length < populationLength){
            
            const parents = await selectBeatles();
            /////voltar
            const baby = await createBeatle();
            baby.setColor = await parents[0].beatle.procriate(parents[1].beatle);
            const babyObj = {
                beatle : baby,
                fit :  baby.fitness,
                color: baby.color,
                rank: 0
            }
            if(procriationList.indexOf(babyObj.color)===-1){
                procriationList = [...procriationList,babyObj]
            }
        }
        console.log('depois aqui')
        console.log("newPop", newPop)
        console.log("procriationList",procriationList);
        resolve(procriationList)
    })
}

async function main(){
    let counter = 0
    let topBeatle;
    let newTopBeatle;
    await generateInitialPopulation()
    while(counter < stopPoint){
        console.log("stop point",counter)
        population = await sortPopulation(population);
        
        
        await rankPopulation();
        newTopBeatle = population.slice(0,1)[0];
        
        topBeatle && console.log("sao iguais?", newTopBeatle.fit == topBeatle.fit)
        if(newTopBeatle && topBeatle){
            if (newTopBeatle.fit === topBeatle.fit) {
                counter++
            } else {
                topBeatle = newTopBeatle
                counter = 0
            }
        } else {
            topBeatle = newTopBeatle
        }

        console.log( "fui aqui")
        console.log('population',population)
        let topThree = population.slice(0,3)
        console.log( "topThree",topThree)
        newPopulation = await generateNewPopulation(topThree)
        //population = [];
        console.log("newPopulation",newPopulation)
        population = newPopulation;
        newPopulation = []
        
        /* newPopulation.forEach((e)=>{
            console.log(e.color)
        }) */

        /* console.log(ctx.rgb(babyColor[0],babyColor[1],babyColor[2])(babyColor));

        parents.forEach((element)=>{
            console.log(ctx.rgb(element.color[0],element.color[1],element.color[2]).bold(element.color, element.fit,element.rank))
        }) */
    }
    console.log('saí')
    console.clear();
    console.log("Primeira população")
    firstPopulation.forEach((element)=>{
        console.log(ctx.rgb(element.color[0],element.color[1],element.color[2]).bold(element.color, element.fit,element.rank))
    }) 

    console.log("Última população")
    population.forEach((element)=>{
        console.log(ctx.rgb(element.color[0],element.color[1],element.color[2]).bold(element.color, element.fit,element.rank))
        
    }) 
    console.log(ctx.bgRgb(env[0],env[1],env[2])("env",env))
    console.log("E melhor elemento foi solecionado")
    console.log(ctx.rgb(topBeatle.color[0],topBeatle.color[1],topBeatle.color[2]).bold(topBeatle.color, `fit: ${topBeatle.fit}%`, "rank", topBeatle.rank))
    
}

main()

