function dfs(){
    let arr = getCordinate(startPoint);
    const q = [];
    q.push(arr);
    const visited = createVisitedArray();
    const parentMatrix = create2DArray();
    parentMatrix[arr[0]][arr[1]] = -1;
    const vistedAnimation = [];
    let lastCell = null
    if(!dfsRecursion(arr[0], arr[1])) AnimateSearch(vistedAnimation, parentMatrix, [-1, -1], false);
    else AnimateSearch(vistedAnimation, parentMatrix, lastCell, true);
 
    function dfsRecursion(x, y){
        if(cellMatrix[x] == undefined || cellMatrix[x][y] == undefined || visited[x][y] || cellMatrix[x][y].classList.contains("wall"))return false;
        if(cellMatrix[x][y] === endPoint){
            console.log("mill gaya" +  " dfs")
            lastCell = [x, y];
            
            return true;
        }
        let found = false;
        vistedAnimation.push(cellMatrix[x][y])
        visited[x][y] = true;
        
        
        
        if(!found){
            found = doIt(x, y + 1)
        }

        if(!found){
            found = doIt(x + 1, y)
        }

        if(!found){
            found = doIt(x - 1, y)
        }

        if(!found){
            found = doIt(x, y - 1)
        }
        if(!found)vistedAnimation.push(cellMatrix[x][y])
        function doIt(x1, y1){
            if(cellMatrix[x1] == undefined || cellMatrix[x1][y1] == undefined)return false;
            
            let foun = dfsRecursion(x1, y1)
            if(foun){
                parentMatrix[x1][y1] = [x, y];
            }
            return foun;
        }
        return found;

    }
}


