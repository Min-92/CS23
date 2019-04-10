
let prgCnt = 0;

let programText = new Array();
let programHeap = new Array();


function peek(address){
    if(address >= 0 && address <= 0xFFFF){
    
        return programText[address];

    }else if(address > 0xFFFF && address <= 0x1FFFF){
    
        return programHeap[address-0x10000];

    }else{
        throw 'out of range exception';
    }
}

function locate(program){
    for(let i = 0; i < program.length; i++){
        programText[prgCnt] = program[i];
        prgCnt++;
    }
}

function fetch(program_count){
    return programText[program_count];
}

function store(address, data){
    programHeap[address-0x10000] = data;
}

function load(address){
    return programHeap[address-0x10000];
}


// console.log(fetch(prgCnt-1));nn

function testMemory(){
    
    let arr = new Array();
    arr = [0x0000, 0x0001, 0x0002,0x0003];
    
    locate(arr);
    store(0x10000, 0xFFFF);
    console.log(fetch(prgCnt-1));
    console.log(load(0x10000))

    console.log(peek(0x0003));
    console.log(peek(0x10000));

}

testMemory();

