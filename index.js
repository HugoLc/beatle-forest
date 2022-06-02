const Beatle = require('./src/classes/Beatle');

const env = [23,255,50]

const b1 = new Beatle(env);
const b2 = new Beatle(env);
console.log("POPULAÇÂO")
console.log("env", env);
console.log("cor b1", b1.color);
console.log("cor b2", b2.color);
console.log("///////////////");
console.log("PROCRIAÇÂO")
/* console.log("fit b1", b1.fitness);
console.log("fit b2", b2.fitness); */

const babyColor = async () => {
    const cor = await b1.procriate(b2)
    return cor;
}

const baby = new Beatle(env);
async function putbabyColor(){
    baby.setColor = await babyColor()
    console.log("cor bb",baby.color)
}

putbabyColor()
console.log("///////////////");
console.log("MUTAÇÂO")



