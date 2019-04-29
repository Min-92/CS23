require('date-utils');

let workingDirectory = "local";
const repositoryList = {};
// [0]filename [1]tile [2]commit message
const remoteList = {};

class repository {
    constructor(name) {
        this.name = name;
        this.commitLog = [];
        this.area = {
            Working_Directory: [],
            Staging_Area: [],
            Git_Repository: []
        };
    }
}

class file {
    constructor(name, repository) {
        this.name = name;
        this.repository = repository;
        this.status = "Untracked";
    }
}

class remote {
    constructor(name) {
        this.name = name;
        this.commitLog = [];
        this.repository = [];
    }
}

class app {
    console() {
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

    getTime() {
        const date = new Date();
        return date.toFormat("YYYY-MM-DD HH24:MI:SS");
    }

    excuteCommand(commandArray) {
        const action = commandArray.shift();
        const regExp = /^init$|^status$|^checkout$|^new$|^add$|^commit$|^log$|^touch$|^push$|^clone$/;
        const matchRegExp = action.match(regExp);
        if (matchRegExp === null) {
            console.log("명령어가 올바르지 않습니다.");
        } else {
            if (matchRegExp[0] === "new") {
                this.newFile(...commandArray);
            } else if (matchRegExp[0] === "push") {
                this.pushRemote();
            } else {
                this[`${matchRegExp}`](...commandArray);
            }

        }
    }


    init(repositoryName) {
        if(this.checkRepositoryName(repositoryName)){
            console.log("중복된 이름입니다.");
            return;
        }
        const repo = new repository(repositoryName);
        repositoryList[`${repositoryName}`] = repo;
        console.log(`created ${repositoryName} repository.`);
    }

    newFile(fileName) {
        if (workingDirectory === "local") {
            console.log("저장소가 선택되지 않았습니다.");
            return;
        }
        const fl = new file(fileName, workingDirectory);
        repositoryList[`${workingDirectory}`].area.Working_Directory.push([fl, this.getTime()]);

    }

    status(repositoryName) {
        if (repositoryName === undefined) {
            if (workingDirectory === "local") {
                for (let i in repositoryList) {
                    console.log(`${repositoryList[i].name}/ `);
                }
            } else {
                this.printArea("Working_Directory");
                this.printArea("Staging_Area");
                this.printArea("Git_Repository");

            }
        } else if (repositoryName === "remote") {
            if (workingDirectory === "local") {
                console.log("선택된 저장소가 없습니다.");
            }
            const lastCommit = remoteList[workingDirectory].commitLog[remoteList[workingDirectory].commitLog.length - 1];
            console.log(`Last commit   "${lastCommit[2]}"`);
            console.log(`${lastCommit[0]}      ${lastCommit[1]} `);

        } else {
            if (this.checkRepoName(repositoryName)) {
                const fileList = [];
                const area = repositoryList[repositoryName].area;
                for (let i in area) {
                    area[i].forEach((element) => {
                        fileList.push(element[0].name);
                    })
                }

                console.log(`${repositoryName}/ ${fileList}`);
            } else {
                console.log("저장소 이름이 올바르지 않습니다.");
            }
        }

    }
    checkRepoName(name) {
        let result = false;
        for (let i in repositoryList) {
            if (repositoryList[`${i}`].name === name) {
                result = true;
            }
        }

        return result
    }

    checkout(repositoryName) {
        if (repositoryName === undefined) {
            workingDirectory = "local";
            return;
        }
        if (this.checkRepoName(repositoryName)) {
            workingDirectory = `${repositoryName}`;
            return;
        }

        console.log("저장소 이름이 올바르지 않습니다.");

    }

    checkFileName(fileName) {
        const fileList = [];
                const area = repositoryList[workingDirectory].area;
                for (let i in area) {
                    area[i].forEach((element) => {
                        fileList.push(element[0].name);
                    })
                }

        let result = false;
        fileList.forEach(name => {
            if (fileName === name) result = true;
        });
        return result;
    }
    // add
    add(fileName) {
        if (workingDirectory === "local") return console.log("저장소가 선택되지 않았습니다.");
        if (this.checkFileName(fileName)) {
            const area = repositoryList[workingDirectory].area;
            for (let i in area.Working_Directory) {
                if (area.Working_Directory[i][0].name === fileName) {
                    area.Working_Directory[i][0].status = "Staged";
                    const deletingArray = area.Working_Directory.splice(i, 1)[0]
                    deletingArray[1] = this.getTime();
                    area.Staging_Area.push(deletingArray);
                    break;
                }
            }
            this.printArea("Staging_Area");

        } else {
            console.log("파일 이름이 올바르지 않습니다.");
        }
    }

    commit(...commitComment) {
        if (workingDirectory === "local") return console.log("저장소가 올바르지 않습니다.");
        if (repositoryList[workingDirectory].area.Staging_Area.length === 0) {
            return console.log("No Staged file");
        }

        let commitMent = " ";
        commitComment.forEach((element) => {
            commitMent += element + " ";
        });
        const area = repositoryList[workingDirectory].area;
        const commitLog = repositoryList[workingDirectory].commitLog;
        console.log("---commit files/");
        for (let i in area.Staging_Area) {
            area.Staging_Area[i][0].status = "Unmodified";
            const deletingArray = area.Staging_Area[i];
            deletingArray[1] = this.getTime();
            area.Git_Repository.push(deletingArray);
            commitLog.push([deletingArray[0].name.toString(), deletingArray[1].toString(), commitMent.toString()]);
            console.log(`${deletingArray[0].name}     ${deletingArray[1]}`);
        }
        area.Staging_Area = [];
    }

    touch(fileName) {
        if (workingDirectory === "local") return console.log("저장소가 선택되지 않았습니다.");
        if (this.checkFileName) {
            const area = repositoryList[workingDirectory].area;
            for (let i in area.Git_Repository) {
                if (area.Git_Repository[i][0].name === fileName) {
                    area.Git_Repository[i][0].status = "Modified";
                    const deletingArray = area.Git_Repository.splice(i, 1)[0]
                    deletingArray[1] = this.getTime();
                    area.Working_Directory.push(deletingArray);
                    break;
                }
            }
            this.printArea("Working_Directory");

        } else {
            console.log("파일 이름이 올바르지 않습니다.");
        }
    }

    log() {
        if (repositoryList[workingDirectory].commitLog.length === 0) {
            console.log("로그가 없습니다.");
            return;
        }
        repositoryList[workingDirectory].commitLog.forEach((element) => {
            console.log(`commit   "${element[2]}"`);
            console.log(`${element[0]}      ${element[1]} `);
        })
    }

    printArea(areaName) {
        const area = repositoryList[workingDirectory].area;
        console.log(`---${areaName}/`);
        for (let i in area[areaName]) {
            console.log(`${area[areaName][i][0].name}    ${area[areaName][i][1]}`);
        }
    }

    pushRemote() {
        if (remoteList[workingDirectory] === undefined) {
            remoteList[workingDirectory] = new remote(workingDirectory);
        }
        const remoteRepo = remoteList[workingDirectory];
        const localRepo = repositoryList[workingDirectory];
        if (remoteRepo.commitLog.length === localRepo.commitLog.length) {
            console.log("push 할 데이터가 없습니다.");
            return;
        }
        remoteRepo.repository = localRepo.area.Git_Repository;
        console.log("push some commits...");
        for (let i = remoteRepo.commitLog.length; i <= localRepo.commitLog.length - 1; i++) {
            remoteRepo.commitLog.push(localRepo.commitLog[i]);
            console.log(`commit "${localRepo.commitLog[i][2]}" pushed`);
        }
    }

    checkRepositoryName(repoName){
        let result = false;
        for(let i in repositoryList){
            if(repositoryList[i].name === repoName){
                result = true;
            }
        }
        return result;
    }

    clone(repoName, localName) {
        if(this.checkRepositoryName(localName)){
            console.log("중복된 이름입니다.");
            return;
        }
        const repo = new repository(localName);
        repo.area.Git_Repository = remoteList[repoName].repository;
        repo.commitLog = remoteList[repoName].commitLog;
        repositoryList[localName] = repo;
        console.log(`cloning ${localName} repository from ${repoName}...`);
    }

    


}


const newApp = new app();
newApp.console();