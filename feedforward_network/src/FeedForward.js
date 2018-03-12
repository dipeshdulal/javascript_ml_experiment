import * as math from 'mathjs'; 

export default class FeedForward{
    constructor(no_input, no_hidden, no_output){
        this.no_input = no_input;
        this.no_hidden = no_hidden;
        this.no_output = no_output;

        this.w_ih = math.random([no_hidden, no_input]);
        this.w_ho = math.random([no_output, no_hidden]);
        this.bias = math.random([no_hidden, 1]);
    }

    sigmoid(x){
        x = math.subtract(0,x);
        x = math.chain(x).exp().add(1).done();
        return math.dotDivide(1,x);
    }

    delSigmoid(x){
        let y = math.subtract(1, x);
        return math.dotMultiply(x, y);
    }

    // forward pass in the neural network
    forwardPass(inputs){
        this.input = math.matrix(inputs, "sparse");
        this.h_input = math.chain(this.w_ih).multiply(this.input).add(this.bias).done();
        this.h_output = this.sigmoid(this.h_input);

        let op = math.chain(this.w_ho).multiply(this.h_output).done();
        this.output = this.sigmoid(op);

        return this.output;
    }

    // backward propagation
    backPropagation(error, lr){

        let grad = math.chain(error)
                        .dotMultiply(lr)
                        .dotMultiply(this.delSigmoid(this.output))
                        .multiply(math.transpose(this.h_output))
                        .done();

        let error_ho = math.chain(this.w_ho).transpose().multiply(error).done();

        this.w_ho = math.subtract(this.w_ho, grad); 
        grad = math.chain(error_ho)
                    .dotMultiply(lr)
                    .dotMultiply(this.delSigmoid(this.h_output))
                    .multiply(math.transpose(this.input))
                    .done();
        
        this.w_ih = math.subtract(this.w_ih, grad);

        grad = math.chain(error_ho)
                   .dotMultiply(lr)
                   .dotMultiply(this.delSigmoid(this.h_output))
                   .done();
        this.bias = math.subtract(this.bias, grad);
        
    }

    // train
    train(inputs, outputs, lr){
        this.forwardPass(inputs);
        let output_act = math.matrix(outputs, "sparse");
        let error = math.subtract(this.output, output_act);
        this.backPropagation(error, lr);
        return error.valueOf();
    }
}