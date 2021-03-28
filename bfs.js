

function bfs(){
    let arr = getCordinate(startPoint);
    const q = [];
    q.push(arr);
    const visited = createVisitedArray();
    const parentMatrix = createParentArray();
    const parentArray = [];
    parentArray.push(-1);
    const vistedAnimation = [];
    startPoint.classList.remove("wall");
    endPoint.classList.remove("wall");
    
    while(q.length != 0){
        let curr = q.shift();
        let x = parseInt(curr[0]);
        let y = parseInt(curr[1]);
        let parentCurr = parentArray.shift();
        if(cellMatrix[x] != undefined && cellMatrix[x][y] != undefined && !visited[x][y] && !cellMatrix[x][y].classList.contains("wall")){
            visited[x][y] = true;
            vistedAnimation.push(cellMatrix[x][y])
            parentMatrix[x][y] = parentCurr
            if(cellMatrix[x][y] === endPoint){
                console.log("mill gaya" +  " bfs")
                AnimateSearch(vistedAnimation, parentMatrix, [x, y], true);
                return;
            }
            q.push([x + 1, y])
            parentArray.push([x, y]);
            q.push([x - 1, y])
            parentArray.push([x, y]);
            q.push([x, y + 1])
            parentArray.push([x, y]);
            q.push([x, y - 1])
            parentArray.push([x, y]);
        }
    }
    AnimateSearch(vistedAnimation, parentMatrix, [-1, -1], false);
}




