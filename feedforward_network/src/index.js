import FeedForward from './FeedForward';

let ff = new FeedForward(2,4,1);

let data = [
    {inputs: [0.1, 0.1], outputs: [0.1]},
    {inputs: [0.1, 1], outputs: [0.1]},
    {inputs: [1, 0.1], outputs: [0.1]},
    {inputs: [1,1], outputs: [1]},
]

async function train(){
    for(let i = 0; i < 100000; i++){
        var rand = data[Math.floor(Math.random() * data.length)];
        console.log(ff.train(rand.inputs, rand.outputs, 0.1));
    }
}
console.log(process);

train().then(a => {
    for(let i = 1; i <= 25; i++){
        let a = [];
        for(let j = 1; j <= 25; j++){
            let d = ff.forwardPass([i/25, j/25]).valueOf()[0][0];
            d = Math.round(d);
            if(d === 0){
                a.push('\x1b[33m') 
                a.push('\u2588');
            }else{
                a.push('\x1b[31m') 
                a.push('\u2588');
            }
            a.push('\x1b[0m');
        }
        console.log(a.join(''));
    }

})