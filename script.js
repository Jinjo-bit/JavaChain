calculateHash(); {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
}


// structure of block data
class Block {
    constructor(timestamp, data, previousHash = '') {
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        //the cacluatlion must end to make sure data is assigned correctetly before the next calculation is performed
        this.hash = this.calculateHash();
    }
    calculateHash() {
        return SHA256(this.previousHash+ this.timestamp + JSON.stringify(this.data)).toString();
    }
}

// the blockchain is blocks, so it's put as an array
class BlockChain {
    constructor() {
        this.chain = [];
    }
}

//Genesisblock, ig they need to be created by hand apparetly
createGenesisBlock(); {
    return new Block("2022-04-09 00:00:00", "Genesis block of simple chain", "");
}
//basically creates the geneisis block
class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }
}

class BlockChain {
    getLatestBlock() {
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        //The old hash has the same value as the new block
        newBlock.previousHash = this.getLatestBlock().hash;
        //refeshes the hash value of a new block
        newBlock.hash = newBlock.calculateHash(); 
        //Add new blocks to the chain；
        this.chain.push(newBlock); 
    }
}

let simpleChain = new BlockChain();
simpleChain.addBlock(new Block("2022-04-09 00:00:01", {amount: 10}));
simpleChain.addBlock(new Block("2022-04-09 00:00:02", {amount: 20}));

console.log("is the chain valid? " + simpleChain.isChainValid());
// Tamper with the second block
simpleChain.chain[1].data = {amount: 15};
simpleChain.chain[1].hash = simpleChain.chain[1].calculateHash();
// Then, recalculate the third block
simpleChain.chain[2].previousHash = simpleChain.chain[1].hash;
simpleChain.chain[2].hash = simpleChain.chain[2].calculateHash();
console.log("is the chain still valid? " + simpleChain.isChainValid());
console.log(JSON.stringify(simpleChain, null, 4));