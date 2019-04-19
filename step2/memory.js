module.exports = class Memory {

    constructor() {
        this.programText = new Array(0x10000);
        this.programHeap = new Array(0x10000);
    }

    peek(address) {
        if (address >= 0 && address <= 0xFFFF) {

            return this.programText[address];

        } else if (address > 0xFFFF && address <= 0x1FFFF) {

            return this.programHeap[address - 0x10000];

        } else {
            throw 'out of range exception';
        }
    }

    locate(program,programCount) {
        for (let i = 0; i < program.length; i++) {
            this.programText[i] = program[i];
        }
    }

    fetch(program_count) {
        return this.programText[program_count];
    }

    store(address, data) {
        this.programHeap[address] = data;
    }

    load(address) {
        if(this.programHeap[address] === undefined){
            return "0";
        }else{
            return this.programHeap[address].toString();
        }
    }
}
