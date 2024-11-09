import { Block } from './Block';

export class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
  }

  createGenesisBlock() {
    return new Block(Date.now(), { message: 'Genesis Block' }, '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const block = new Block(
      Date.now(),
      data,
      this.getLatestBlock().hash
    );
    block.mineBlock(this.difficulty);
    this.chain.push(block);
  }

  deleteBlock(index) {
    if (index === 0 || index >= this.chain.length) return false;
    
    this.chain.splice(index, 1);
    
    // Rebuild chain connections after deletion
    for (let i = index; i < this.chain.length; i++) {
      const block = this.chain[i];
      const previousBlock = this.chain[i - 1];
      block.previousHash = previousBlock.hash;
      block.hash = block.calculateHash();
    }
    
    return true;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}