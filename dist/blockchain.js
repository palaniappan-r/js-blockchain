"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockData = exports.Block = exports.Blockchain = void 0;
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const sha256 = require('crypto-js/sha256');
class Blockchain {
    constructor() {
        this.chain = [this.createGenesis()];
        this.difficulty = 4;
        this.pendingData = [];
        this.blockSize = 3;
    }
    createGenesis() {
        return new Block([new blockData("", "Genesis Block")]);
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    minePending() {
        if (this.pendingData.length == this.blockSize) {
            let block = new Block(this.pendingData);
            this.addBlock(block);
            console.log();
            console.log("Block mined successfully");
            console.log("Block Hash : ", block.hash);
            console.log("prevBlockHash : ", block.prevHash);
            console.log("Nonce : ", block.nonce);
            console.log();
            this.pendingData = [];
        }
        else {
            console.log("Need more data before mining");
        }
    }
    viewUser(id) {
        let productList = [];
        this.chain.forEach(block => {
            block.data.forEach(blockData => {
                if (blockData.manufacturerID == id)
                    productList.push(blockData.productName);
            });
        });
        return productList;
    }
    addData(data) {
        if (blockData.verifyTransactions(data))
            this.pendingData.push(data);
    }
    addBlock(newBlock) {
        newBlock.index = this.getLatestBlock().index + 1;
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.pendingData = [];
        newBlock.hash = Block.calcHash(newBlock);
        this.chain.push(newBlock);
    }
    static isValid(bc) {
        for (let i = 1; i < bc.chain.length; i++) {
            const currentBlock = bc.chain[i];
            const prevBlock = bc.chain[i - 1];
            if (currentBlock.hash !== Block.calcHash(currentBlock) ||
                prevBlock.hash !== currentBlock.prevHash ||
                !Block.hasValidData(currentBlock)) {
                return false;
            }
        }
        return true;
    }
}
exports.Blockchain = Blockchain;
class Block {
    constructor(data, prevHash = ' ') {
        const date = new Date();
        this.index = 0;
        this.timestamp = date.toDateString() + " " + date.toTimeString();
        this.nonce = 0;
        this.data = data;
        this.hash = Block.calcHash(this);
        this.prevHash = prevHash;
    }
    static calcHash(block) {
        return sha256(block.prevHash + JSON.stringify(block.data) + block.nonce).toString();
    }
    mineBlock(difficulty) {
        console.log("Mining Block!");
        while (this.hash.substring(0, difficulty) !== Array(1 + difficulty).join("0")) {
            this.nonce++;
            this.hash = Block.calcHash(this);
        }
    }
    static hasValidData(block) {
        for (const d of block.data)
            if (!blockData.verifyTransactions(d))
                return false;
        return true;
    }
}
exports.Block = Block;
class blockData {
    constructor(manufacturerID, productName) {
        this.productName = productName;
        this.manufacturerID = manufacturerID;
        this.signature = '';
    }
    static calcHash(bd) {
        return sha256(JSON.stringify(bd.productName) + bd.manufacturerID).toString();
    }
    static signData(signingKey, bd) {
        if (signingKey.getPublic('hex') !== bd.manufacturerID) {
            throw new Error("ERROR : You can only sign under your manufacturerID.");
        }
        const hash = blockData.calcHash(bd);
        const sig = signingKey.sign(hash, 'base64');
        bd.signature = sig.toDER('hex');
    }
    static verifyTransactions(bd) {
        if (!bd)
            return true;
        if (bd.productName == "Genesis Block")
            return true;
        if (!bd.signature || bd.signature.length === 0 || bd.signature == "")
            throw new Error('No signature provided');
        if (!bd.manufacturerID || !bd.productName)
            return false;
        const publicKey = ec.keyFromPublic(bd.manufacturerID, 'hex');
        return publicKey.verify(blockData.calcHash(bd), bd.signature);
    }
}
exports.blockData = blockData;
const productChain = new Blockchain();
const peerList = [];
module.exports.Block = Block;
module.exports.Blockchain = Blockchain;
module.exports.blockData = blockData;
module.exports.productChain = productChain;
module.exports.peerList = peerList;
