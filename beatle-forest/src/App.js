
import { useState, useEffect } from 'react';
import Beatle from './classes/Beatle'
/* 
import {ReactComponent as ReactLogo} from './desenho.svg'; */




function App() {

  const env = [Math.floor(Math.random() * 256),Math.floor(Math.random() * 256),Math.floor(Math.random() * 256)];
  const populationLength = 5;
  const stopPoint = 100;
  var firstPopulation = [];
  var population = [];
  var newPopulation = [];
  

  const [bestBeatle, setBestBeatle] = useState();
  const [fstPopulation, setfstPopulation] = useState()


  console.log("inicio",fstPopulation)

  function generateInitialPopulation(){
    return new Promise((resolve) =>{
        let auxPop = []
        for (let i = 0; i < populationLength; i++) {
            const beatle = new Beatle(env);
            const objBeatle = {
                beatle : beatle,
                fit :  beatle.fitness,
                color: beatle.color,
                rank: 0
            }
            auxPop = [...auxPop, objBeatle];
        }
        population = auxPop
        firstPopulation = []
        firstPopulation = population
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
        
        resolve(procriationList)
    })
  }
  async function main(){
    let counter = 0
    let topBeatle;
    let newTopBeatle;
    await generateInitialPopulation()
    while(counter < stopPoint){
        //console.log("stop point",counter)
        population = await sortPopulation(population);
        
        
        await rankPopulation();
        newTopBeatle = population.slice(0,1)[0];
        
        //topBeatle && console.log("sao iguais?", newTopBeatle.fit == topBeatle.fit)
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

        //console.log( "fui aqui")
        console.log('population',population)
        console.log('fpopulation',firstPopulation)
        let topThree = population.slice(0,3)
        //console.log( "topThree",topThree)
        newPopulation = await generateNewPopulation(topThree)
        //console.log("newPopulation",newPopulation)
        population = newPopulation;
        newPopulation = []
        
    }
    setBestBeatle(topBeatle);
    setfstPopulation(firstPopulation)
  }

  useEffect(() => {
    main()
  
  }, [])
  
  
  return (
    <>
      <div style={{
        minWidth:'500px',
        width: 'auto',
        minHeight: "500px", 
        height: 'auto', 
        backgroundImage: "url(./forest.svg)",
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundColor: `rgb(${env[0]},${env[1]},${env[2]})`,
      
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center'
        }}>
        <svg
          width='100px'
          height='100px'
          viewBox="0 0 210 297"
          xmlns="http://www.w3.org/2000/svg">
          <g
            id="layer1">
            <g
              id="g2330"
              style={{fill:"#ffffff"}}
              transform="matrix(4.7880742,0,0,3.7073962,-411.02842,-347.59243)">
              <path
                id="path2304"
                style={!bestBeatle?{  
                  stroke:"#ffffff",
                  strokeWidth:2,
                  strokeOpacity:1
                }:{
                  fill:`rgb(${bestBeatle.color[0]},${bestBeatle.color[1]},${bestBeatle.color[2]})`,
                  stroke:"#545454",
                  strokeWidth:2,
                  strokeOpacity:1
                }}
                d="M 98.191307,114.05264 87.332767,95.2451 M 116.9219,113.69399 127.78044,94.886444 M 107.7172,133.80495 v 38.87358 M 87.769831,133.35828 h 20.035309 m 0,0 h 20.17097 m 0.59803,8.67128 a 20.930674,30.797989 0 0 1 -20.93068,30.79799 20.930674,30.797989 0 0 1 -20.93067,-30.79799 20.930674,30.797989 0 0 1 20.93067,-30.79799 20.930674,30.797989 0 0 1 20.93068,30.79799 z" />
            </g>
          </g>
        </svg>
      </div>
      {console.log("pop",population)}
      {console.log("fpop",fstPopulation)}
      {fstPopulation && fstPopulation.map((beatle)=> <svg
          key= {Math.random()}
          width='30px'
          height='30px'
          viewBox="0 0 210 297"
          xmlns="http://www.w3.org/2000/svg">
          <g
            id="layer1">
            <g
              id="g2330"
              style={{fill:"#ffffff"}}
              transform="matrix(4.7880742,0,0,3.7073962,-411.02842,-347.59243)">
              <path
                id="path2304"
                style={{
                  fill:`rgb(${beatle.color[0]},${beatle.color[1]},${beatle.color[2]})`,
                  stroke:"#545454",
                  strokeWidth:2,
                  strokeOpacity:1
                }}
                d="M 98.191307,114.05264 87.332767,95.2451 M 116.9219,113.69399 127.78044,94.886444 M 107.7172,133.80495 v 38.87358 M 87.769831,133.35828 h 20.035309 m 0,0 h 20.17097 m 0.59803,8.67128 a 20.930674,30.797989 0 0 1 -20.93068,30.79799 20.930674,30.797989 0 0 1 -20.93067,-30.79799 20.930674,30.797989 0 0 1 20.93067,-30.79799 20.930674,30.797989 0 0 1 20.93068,30.79799 z" />
            </g>
          </g>
        </svg>
      

      )}
      
    </>
  );
  
}

export default App;
