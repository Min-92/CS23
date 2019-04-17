class Memory {

    constructor() {
        this.programText = new Uint16Array(0x10000);
        this.programHeap = new Uint16Array(0x10000);
        this.programCount = 0;
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

    locate(program) {
        for (let i = 0; i < program.length; i++) {
            this.programText[this.programCount] = program[i];
            this.programCount++;
        }
    }

    fetch(program_count) {
        return this.programText[program_count];
    }

    store(address, data) {
        this.programHeap[address - 0x10000] = data;
    }

    load(address) {
        return this.programHeap[address - 0x10000];
    }
}

const test = () =>{
    const testMemory = new Memory();
    const arr = [0x0000, 0x0001, 0x0002, 0x0003];
    
    testMemory.locate(arr);
    testMemory.store(0x10000, 0xFFFF);
    console.log(testMemory.fetch(testMemory.programCount - 1));
    console.log(testMemory.load(0x10000))
    
    console.log(testMemory.peek(0x0003));
    console.log(testMemory.peek(0x10000));
}

// test();

module.exports = Memory;

