const memory = require("./memory");
const myMemory = new memory();

class cpu {
    constructor() {
        this.register = {
            programCount: 0,
            R1: undefined,
            R2: undefined,
            R3: undefined,
            R4: undefined,
            R5: undefined,
            R6: undefined,
            R7: undefined
        }
        this.keyOfRegisterName = {
            "001": "R1",
            "010": "R2",
            "011": "R3",
            "100": "R4",
            "101": "R5",
            "110": "R6",
            "111": "R7"
        }
    }


    reset() {
        for (key in this.register) {
            this.register[key] = 0;
        }
    }

    fetch() {
        this.register.programCount++;
        return myMemory.fetch(this.register.programCount - 1);
    }


    processIR(IR) {
        const instructionArray = [];
        instructionArray.push(IR.slice(0, 4));

        if (instructionArray[0] === "1011") {
            instructionArray.push(IR.slice(4, 7));
            instructionArray.push(IR.slice(7));

        } else if (instructionArray[0] === "0010" || instructionArray[0] === "0100" || instructionArray[0] === "1000" || instructionArray[0] === "1010") {
            instructionArray.push(IR.slice(4, 7));
            instructionArray.push(IR.slice(7, 10));
            instructionArray.push(IR.slice(10, 11));
            instructionArray.push(IR.slice(11));
        } else {
            instructionArray.push(IR.slice(4, 7));
            instructionArray.push(IR.slice(7, 10));
            instructionArray.push(IR.slice(10, 13));
            instructionArray.push(IR.slice(13));
        }
        return instructionArray;
    }

    sub(param1, param2) {
        return (parseInt(param1, 2) - parseInt(param2, 2)).toString(2);
    }

    add(param1, param2) {
        return (parseInt(param1, 2) + parseInt(param2, 2)).toString(2);
    }

    and(param1, param2) {
        while (param1.length !== param2.length) {
            (param1.length > param2.length) ? "0" + param2 : "0" + param1;
        }
        let resultString = "";
        for (let i in param1) {
            resultString += (param2.charAt(i) && param1.charAt(i));
        }
        return resultString;
    }


    or(param1, param2) {
        while (param1.length !== param2.length) {
            (param1.length > param2.length) ? "0" + param2 : "0" + param1;
        }
        let resultString = "";
        for (let i in param1) {
            resultString += (param2.charAt(i) || param1.charAt(i));
        }
        return resultString;
    }

    execute(IR) {
        const instructionArray = this.processIR(IR.toString());
        switch (instructionArray[0]) {
            case "0001":
                this.register[this.keyOfRegisterName[instructionArray[1]]]
                    = myMemory.load(this.add(this.register[this.keyOfRegisterName[instructionArray[2]]], this.register[this.keyOfRegisterName[instructionArray[4]]]));
                break;
            case "0010":
                this.register[this.keyOfRegisterName[instructionArray[1]]]
                    = myMemory.load(this.add(this.register[this.keyOfRegisterName[instructionArray[2]]], instructionArray[4]));
                break;
            case "0011":
                myMemory.store(this.add(this.register[this.keyOfRegisterName[instructionArray[2]]], this.register[this.keyOfRegisterName[instructionArray[4]]]), this.register[this.keyOfRegisterName[instructionArray[1]]]);
                break;
            case "0100":
                myMemory.store(this.add(this.register[this.keyOfRegisterName[instructionArray[2]]], instructionArray[4]), this.register[this.keyOfRegisterName[instructionArray[1]]]);

                break;
            case "0101":
                this.register[this.keyOfRegisterName[instructionArray[1]]]
                    = this.and(this.register[this.keyOfRegisterName[instructionArray[2]]], this.register[this.keyOfRegisterName[instructionArray[4]]]);
                break;
            case "0110":
                this.register[this.keyOfRegisterName[instructionArray[1]]]
                    = this.or(this.register[this.keyOfRegisterName[instructionArray[2]]], this.register[this.keyOfRegisterName[instructionArray[4]]]);
                break;
            case "0111":
                this.register[this.keyOfRegisterName[instructionArray[1]]]
                    = this.add(this.register[this.keyOfRegisterName[instructionArray[2]]], this.register[this.keyOfRegisterName[instructionArray[4]]]);
                break;
            case "1000":
                this.register[this.keyOfRegisterName[instructionArray[1]]]
                    = this.add(this.register[this.keyOfRegisterName[instructionArray[2]]], instructionArray[4]);
                break;
            case "1001":
                this.register[this.keyOfRegisterName[instructionArray[1]]]
                    = this.sub(this.register[this.keyOfRegisterName[instructionArray[2]]], this.register[this.keyOfRegisterName[instructionArray[4]]]);
                break;
            case "1010":
                this.register[this.keyOfRegisterName[instructionArray[1]]]
                    = this.sub(this.register[this.keyOfRegisterName[instructionArray[2]]], instructionArray[4]);
                break;
            case "1011":
                this.register[this.keyOfRegisterName[instructionArray[1]]] = instructionArray[2];
                break;
        }
    }

    dump() {
        const dataOfRegister = [];
        for (let key in this.register) {
            dataOfRegister.push(this.register[key]);
        }
        return dataOfRegister;
    }
}


const myCpu = new cpu();


// 0x0000 MOV R4, 0xA0
// 0x0002 MOV R5, 0x02
// 0x0004 LOAD R1, R4, R5
// 0x0006 ADD R2, R1, #4
// 0x0008 SUB R3, R1, R2
// 0x000A STORE R3, R4, #4
myMemory.locate([
    "1011100010100000",
    "1011101000000010",
    "0001001100000101",
    "1000010001000100",
    "1001011001000010",
    "0100011100100100"]);

const simulator = () => {
    let programText = 0;
    programText = myCpu.fetch();
    myCpu.execute(programText);
    console.log(myCpu.dump());

    programText = myCpu.fetch();
    myCpu.execute(programText);
    console.log(myCpu.dump());

    programText = myCpu.fetch();
    myCpu.execute(programText);
    console.log(myCpu.dump());

    programText = myCpu.fetch();
    myCpu.execute(programText);
    console.log(myCpu.dump());

    programText = myCpu.fetch();
    myCpu.execute(programText);
    console.log(myCpu.dump());

    programText = myCpu.fetch();
    myCpu.execute(programText);
    console.log(myCpu.dump());

}
simulator();



