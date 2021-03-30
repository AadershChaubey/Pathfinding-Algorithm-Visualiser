function getCordinate(element){
    for(let i = 0; i < numbersOfRows; i++){
        for(let j = 0; j < numberOfCols; j++){
            if(cellMatrix[i][j] == element){
                let arr = []
                arr.push(i)
                arr.push(j)
                return arr;
            }
        }
    }
}

function createVisitedArray(){
    const visited = [];
    for(let i = 0; i < numbersOfRows; i++){
        const visitedRows = [];
        for(let j = 0; j < numberOfCols; j++){
            visitedRows.push(false);
        }
        visited.push(visitedRows)
    }
    return visited;
}

function createParentArray(){
    const parent = [];
    for(let i = 0; i <= numbersOfRows; i++){
        const parentRows = [];
        for(let j = 0; j <= numberOfCols; j++){
            parentRows.push(null);
        }
        parent.push(parentRows)
    }
    return parent;
}

function getThePath(parent, endCordinate){
    let path = [];
    let currCordinate = endCordinate;
    let x = parseInt(currCordinate[0])
    let y = parseInt(currCordinate[1])
    while(parent[x][y] != -1){
        path.push(cellMatrix[parseInt(parent[x][y][0])][parseInt(parent[x][y][1])])
        currCordinate = parent[x][y];
        x = parseInt(currCordinate[0])
        y = parseInt(currCordinate[1])
    }
    path.pop();
    return path;
}

const pauseButton = document.querySelector(".pause");
const pauseIcon = document.querySelector(".play-icon");
pauseButton.disabled = true;
var AnimateSearchTime = 0;
var timer = 0;
function AnimatePath(path){
    console.log(path.length);
    let miliSec = 0;
    let i = path.length - 1;
    const animate = setInterval(() => {
        if(i < 0){
            resetButtons()
            clearInterval(animate);
            return;
        }
        let element = path[i];
        element.classList.remove("visited");
        element.classList.add("path");
        i--;
    }, miliSec);
}

function AnimateSearch(Array, parent, [a, b], wannaPath){
    if(instantPath){
        onTime(Array, parent, [a, b], wannaPath);
        return;
   }
   pauseButton.disabled = false;
    let miliSec = 0;
    if(Array.length <= 2){
        resetButtons()
        return;
    }
    let i = 1;
    let n = 0;
    if(wannaPath)n = Array.length - 2
    else n = Array.length - 1;
    timer =  function(){
        AnimateSearchTime =  setInterval(() => {
            console.log("set",i);
            console.log("AnimateSearchTime Running", AnimateSearchTime)
            if(i >= n){
                clearInterval(AnimateSearchTime)
                if(wannaPath){
                    console.log("ye ye ye")
                    let path = getThePath(parent, [a, b]);
                    AnimatePath(path);
                    pauseButton.disabled = true;
                }else{
                    resetButtons()
                }
            }
            if(Array[i] == undefined)console.log(i)
            if(Array[i].classList.contains("weight")){
                Array[i].classList.add("visited-weight")
            }else {
                Array[i].classList.remove("Empty-cell");
                Array[i].classList.add("visited")
            }
            i++;
        }, miliSec);
    }
    timer();
    return;
}


function createWeightedArray(){
    const Array = [];
    for(let i = 0; i < numbersOfRows; i++){
        const rows = [];
        for(let j = 0;j < numberOfCols; j++){
            rows.push(Infinity);
        }
        Array.push(rows);
    }
    return Array;
}

function onTime(vistedAnimation, parent, [a, b], wannaPath){
    vistedAnimation.forEach((cell)=>{
        if(cell != startPoint && cell != endPoint){
            cell.classList.remove("Empty-cell")
            cell.classList.remove("visited")
            cell.classList.add("fast-visited")
        }
    })

    if(wannaPath){
        const path = getThePath(parent, [a, b])
        path.forEach((cell)=>{
            cell.classList.remove("fast-visited")
            cell.classList.add("fast-path")
        })
    }
    resetButtons()
}

function resetButtons(){
    findPathButton.disabled = false;
    clearButton.disabled = false;
    screenActivity = true;
    findPathButton.classList.add("btn")
    findPathButton.classList.remove("btn-disable");
    clearButton.classList.add("btn")
    clearButton.classList.remove("btn-disable");
}

let paused = false;


pauseButton.addEventListener("click", ()=>{
    if(!paused){
        console.log("AnimateSearchTime deleted", AnimateSearchTime)
        clearInterval(AnimateSearchTime);
        resetButtons();
        paused = true;
        changePause()
    }else{
        console.log("timer button")
        stopButtons();
        timer();
        paused = false;
        changePause()
    }
})

function changePause(){
    if(paused){
        pauseIcon.classList.remove("fa-pause")
        pauseIcon.classList.add("fa-play")
    }else{
        pauseIcon.classList.remove("fa-play")
        pauseIcon.classList.add("fa-pause")
    }
}


function stopButtons(){
    findPathButton.disabled = true;
    clearButton.disabled = true;
    screenActivity = false;
    usedBoard =true;
    instantPath = false;
    findPathButton.classList.remove("btn")
    findPathButton.classList.add("btn-disable");
    clearButton.classList.remove("btn")
    clearButton.classList.add("btn-disable");
    
}