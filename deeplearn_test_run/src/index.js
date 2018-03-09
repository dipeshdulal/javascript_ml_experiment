import * as dl from 'deeplearn';

const a = dl.variable(dl.scalar(Math.random()))
const b = dl.variable(dl.scalar(Math.random()))
const c = dl.variable(dl.scalar(Math.random()))

const learning_rate = 0.01;
const optimizer = dl.train.sgd(learning_rate);

function predict(input) {
    
    return dl.tidy(function() {
    
        const x = dl.scalar(input);
        const ax2 = a.mul(x.square());
        const bx = b.mul(x);
        const y = ax2.add(bx).add(c);
        return y;

    });
}

function loss(prediction, actual){
    const error = dl.scalar(actual).sub(prediction).square();
    return error;
}

async function train(xs, ys, numIterations, done){
    let currentIteration = 0;

    for(let iter = 0; iter < numIterations; iter++){
        for(let i = 0; i < xs.length; i++){
            optimizer.minimize(() => {
                const pred = predict(xs[i]);
                const predLoss = loss(pred, ys[i]);
                return predLoss;
            });
        }

        // await dl.nextFrame();
    }

    done();
}

function test(xs, ys){
    dl.tidy(() => {
        const predictedYs = xs.map(predict);
        console.log('Expected', ys);
        console.log('Got', predictedYs.map((p) => p.dataSync()[0]) );
    }) 
}

const data = {
    xs : [0,1,2,3],
    ys : [1.1, 5.9, 16.8, 33.9]
}

console.log('Before training: using random coefficients');
test(data.xs, data.ys);
train(data.xs, data.ys, 50, () => {
    console.log(`After training: a = ${a.dataSync()}, b=${b.dataSync()}, c=${c.dataSync()}`);
    test(data.xs, data.ys);
}).then(a => {}).catch(e => console.log(e));