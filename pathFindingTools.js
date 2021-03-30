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

function create2DArray(){
    const parent = [];
    for(let i = 0; i <= numbersOfRows; i++)parent.push([])
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
var AnimateSearchTimer = 0;
var timer = 0;
function AnimatePath(path){
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
    n = Array.length - 1;
    timer =  function(){
        AnimateSearchTimer =  setInterval(() => {
            if(i >= n){
                clearInterval(AnimateSearchTimer)
                if(wannaPath){
                    let path = getThePath(parent, [a, b]);
                    AnimatePath(path);
                    pauseButton.disabled = true;
                }else{
                    resetButtons()
                }
            }
            if(Array[i] != startPoint && Array[i] != endPoint){
                if(Array[i].classList.contains("weight")){
                    Array[i].classList.add("visited-weight")
                }else {
                    Array[i].classList.remove("Empty-cell");
                    Array[i].classList.add("visited")
                }
            }
            i++;
        }, miliSec);
    }
    timer();
    return;
}


function createWeightedArray(a){
    const Array = [];
    for(let i = 0; i < numbersOfRows; i++){
        const rows = [];
        for(let j = 0;j < numberOfCols; j++){
            rows.push(a);
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
        clearInterval(AnimateSearchTimer);
        resetButtons();
        screenActivity = false;
        paused = true;
        changePause()
    }else{
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