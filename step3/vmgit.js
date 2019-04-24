require('date-utils');
const date = new Date(); 


// 현재 디렉토리
let workingDirectory = "local";
const repositoryList = {};

// 저장소
// // working directory/ staging area/ git repository/
// // 속한 파일 name, time
class repository {
    constructor(name) {
        this.name = name;
        this.fileArray = [];
        this.area = {
            Working_Directory: [],
            Staging_Area: [],
            Git_Repository: [] 
        };
    }
}


// 파일
// // untracked / unmodified/ modified/ staged
// // name, 소속 저장소
class file {
    constructor(name,repository){
        this.name = name;
        this.repository = repository;
        this.status = "Untracked";
    }
}

class app{
    // // 프롬프트 이용
    // // 자동 반복
    // // checkout 시 프롬프트 변경
    // 콘솔
    console () {
        const readline = require("readline");
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        rl.setPrompt(`${workingDirectory}/>`);
        
        rl.prompt();
        rl.on("line", line => {
            const commandArray = line.split(" ");
            this.excuteCommand(commandArray);
            rl.setPrompt(`${workingDirectory}/>`);
            rl.prompt();
        });
    }

    getTime(){
        return date.toFormat("YYYY-MM-DD HH24:MI:SS");
    }

    excuteCommand(commandArray){
        const action = commandArray.shift();
        const regExp = /^init$|^status$|^checkout$|^new$/;
        const matchRegExp = action.match(regExp);
        if(matchRegExp === null){
            console.log("명령어가 올바르지 않습니다.");
        }else{
            if(matchRegExp[0] === "new"){
                this.newFile(...commandArray);
            }else{
                this[`${matchRegExp}`](...commandArray);
            }

        }
    }
    
    
    init(repositoryName) {
        const repo = new repository(repositoryName);
        repositoryList[`${repositoryName}`] = repo;
        console.log(`created ${repositoryName} repository.`);
    }
    
    // new
    newFile(fileName){
        if(workingDirectory === "local"){
            console.log("저장소가 선택되지 않았습니다.");
            return;
        }
       const fl = new file(fileName,workingDirectory);
       repositoryList[`${workingDirectory}`].fileArray.push(fileName);
       repositoryList[`${workingDirectory}`].area.Working_Directory.push([fl,this.getTime()]);
        
    }
// (name) checkout 으로 파일선택후, 해당 디렉토리에 파일 생성 ,상태 untracked
    
    status(repositoryName){
        if(repositoryName === undefined){
            if(workingDirectory === "local"){
                for(let i in repositoryList){
                    console.log(`${repositoryList[i].name}/ `);
                }
            }else{
                let area;
                console.log("---Working Directory/");
                area = repositoryList[workingDirectory].area.Working_Directory;
                for(let i in area){
                    console.log(`${area[i][0].name}    ${area[i][1]}`);
                }
                console.log("---Staging Area/");
                area = repositoryList[workingDirectory].area.Staging_Area;
                for(let i in area){
                    console.log(`${area[i][0].name}    ${area[i][1]}`);
                }
                console.log("---Git Repository/");
                area = repositoryList[workingDirectory].area.Git_Repository;
                for(let i in area){
                    console.log(`${area[i][0].name}    ${area[i][1]}`);
                }
            }
        }else{
            if(this.checkRepoName(repositoryName)){
                console.log(`${repositoryName}/ ${repositoryList[repositoryName].fileArray}`);
            }else{
                console.log("저장소 이름이 올바르지 않습니다.");
            }
        }

    }
checkRepoName(name){
    let result = false;
    for(let i in repositoryList){
        if(repositoryList[`${i}`].name === name){
            result = true;
        } 
    }

    return result
}

// checkout 
checkout(repositoryName){
    if(repositoryName === undefined){
        workingDirectory = "local";
        return;
    }
    if(this.checkRepoName(repositoryName)){
        workingDirectory = `${repositoryName}`;
        return;
    }

    console.log("저장소 이름이 올바르지 않습니다.");
    
}
// //(name)  해당 저장소 선택, 프롬프트에 추가 /name/>
// // void 초기상태로 이동 , 프롬프트 />



checkFileName(fileName){    
    const fileArray = repositoryList[workingDirectory].fileArray;
    let result = false;
    fileArray.forEach(name =>{
        if(fileName === name) result = true;
    });   
    return result;
}
// add
// add(fileName){
//     if(this.checkFileName){
//         area = repositoryList[workingDirectory].area.Working_Directory;



//     }else{
//         console.log("파일 이름이 올바르지 않습니다.");
//     }


// }
// // (name) 해당 파일 satging area 로 이동 가정, satgin area 출력

// commit
// // (log) staging area 있는 파일을 모두 git repositor 에 등록한다
// ///커밋된 파일들을 커밋 시간과 함께 unmodified 상태로 표시, log 에 저장
// //hello/>commit make readme file
// // ---commit files/
// // readme    2019-03-26 09:29:25

// Touch
// //(name) 이미 커밋한 파일상태를modified 상태로 표시, workding 목록에 표시

// log
// //커밋한 파일들 목록을 커밋 로그와 함께 출력

// // commit "make readme file"
// // readme    2019-03-26 09:29:25
}


const newApp = new app();
newApp.console();