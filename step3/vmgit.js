// 현재 디렉토리
let workingDirectory = "";

// 저장소
// // working directory/ staging area/ git repository/
// // 속한 파일 name, time
class repository {
    constructor() {
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
    constructor(repository){
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
            excuteCommand(commandArray);
            rl.prompt();
        });
    }

    excuteCommand(commandArray){
        const action = commandArray[0];
        this[`${action[0]}`](commandArray);
        
    }
    
    
    // init (name) {
        
        // }
    }
    
    // init (name)
    // //local name 저장소 공간 생성
    
    
    // status
    // // name - 저장소 내부 파일 상태 출력
    // // void 전체 저장소 목록 출력
    // // 체크아웃 이후 - working di
// // ---Working Directory/
// // readme    2019-03-26 09:28:05

// // ---Staging Area/
// // ---Git Repository/

// checkout 
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


console();
