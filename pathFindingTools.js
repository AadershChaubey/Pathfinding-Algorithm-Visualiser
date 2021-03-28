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

function AnimatePath(path){
    let miliSec = 20;
    let i = path.length - 1;
    const animate = setInterval(() => {
        if(i < 0){
            findPathButton.disabled = false;
            clearButton.disabled = false;
            screenActivity = true;
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
   
    let miliSec = 20;
    console.log(Array.length)
    if(Array.length <= 2){
         console.log("clearButton")
        findPathButton.disabled = false;
        clearButton.disabled = false;
        screenActivity = true;
        return;
    }
    let i = 1;
    let n = 0;
    if(wannaPath)n = Array.length - 2
    else n = Array.length - 1;
    const AnimateSearchTime =  setInterval(() => {
        if(i >= n){
            clearInterval(AnimateSearchTime)
            if(wannaPath){
                let path = getThePath(parent, [a, b]);
                AnimatePath(path);
            }else{
                findPathButton.disabled = false;
                clearButton.disabled = false;
                screenActivity = true;
            }
        }
        if(Array[i].classList.contains("weight")){
            Array[i].classList.add("visited-weight")
        }else {
            Array[i].classList.remove("Empty-cell");
            Array[i].classList.add("visited")
        }
        i++;
    }, miliSec);
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