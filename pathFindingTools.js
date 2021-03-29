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
    let miliSec = 0;
    if(Array.length <= 2){
        resetButtons()
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
                resetButtons()
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

function onTime(vistedAnimation, parent, [a, b], wannaPath){
    vistedAnimation.forEach((cell)=>{
        if(cell.classList == undefined)console.log("ye rha", cell)
        if(cell == undefined)console.log("ye rha cell", cell)
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
}
