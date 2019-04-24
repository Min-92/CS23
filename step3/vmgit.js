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

    excuteCommand(commandArray){
        const action = commandArray.shift();
        this[`${action}`](...commandArray);
    }
    
    
    init(repositoryName) {
        const repo = new repository(repositoryName);
        repositoryList[`${repositoryName}`] = repo;
        console.log(`created ${repositoryName} repository.`);
    }
    
    
    // status
    // // name - 저장소 내부 파일 상태 출력
    // // void 전체 저장소 목록 출력
    // // 체크아웃 이후 - working di
    status(repositoryName){
        if(repositoryName === undefined){
            if(workingDirectory == 'local'){
                for(let i in repositoryList){
                    console.log(`${repositoryList[i].name}/ `);
                }
            }else{

            }
        }else{
            console.log(`${repositoryName}/ ${repositoryList[repositoryName].fileArray}`);
        }

    }
// // ---Working Directory/
// // readme    2019-03-26 09:28:05

// // ---Staging Area/
// // ---Git Repository/
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
    }
    if(this.checkRepoName(repositoryName)){
        workingDirectory = `${repositoryName}`;
    }

    console.log("저장소 이름이 올바르지 않습니다.");
    
}
// //(name)  해당 저장소 선택, 프롬프트에 추가 /name/>
// // void 초기상태로 이동 , 프롬프트 />

// new
// // (name) checkout 으로 파일선택후, 해당 디렉토리에 파일 생성 ,상태 untracked


// add
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