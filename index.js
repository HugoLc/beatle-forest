const Beatle = require('./src/classes/Beatle');

const env = [23,255,50]

const b1 = new Beatle(undefined, env);
const b2 = new Beatle(undefined, env);

console.log("env", env);
console.log("cor b1", b1.color);
console.log("cor b2", b2.color);
console.log("///////////////");
console.log("fit b1", b1.fitness);
console.log("fit b2", b2.fitness);


