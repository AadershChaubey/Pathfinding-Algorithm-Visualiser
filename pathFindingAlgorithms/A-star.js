function AStar(){
    let found = false;
    let turns = 0;
    const parentMatrix = create2DArray();
    const vistedAnimation = [];
    const visited = createVisitedArray()
    const fn = createWeightedArray(Infinity);
    const alreadyInside = createVisitedArray();
    const smallestWeight = [];
    const startPointCordinate = getCordinate(startPoint);
    const endPointCordinate = getCordinate(endPoint);
    smallestWeight.push([0, startPointCordinate]); 
    parentMatrix[startPointCordinate[0]] [startPointCordinate[1]] = -1;

    const ParentG = create2DArray();
    ParentG[startPointCordinate[0]] [startPointCordinate[1]] = 0;
    while(smallestWeight.length != 0){
        smallestWeight.sort((a, b)=>{
            return a[0] - b[0];
        })
        let curr = smallestWeight.shift();
        let points = curr[0];
        let position = curr[1];
        let x = parseInt(position[0])
        let y = parseInt(position[1])
        let gValueCurr = ParentG[x][y] + 1;

        visited[x][y] = true;
        vistedAnimation.push(cellMatrix[x][y])
        let x1 = 0;
        let y1 = 0;
        
        if(!found){
            x1 = x;
            y1 = y - 1;
            doIt(x1, y1)
        }

        if(!found){
            x1 = x - 1;
            y1 = y;
            doIt(x1, y1)
        }

        if(!found){
            x1 = x + 1;
            y1 = y;
            doIt(x1, y1)
        }

        if(!found){
            x1 = x;
            y1 = y + 1;
            doIt(x1, y1)
        }

        function doIt(x1, y1){
            if(x1 >= 0 && cellMatrix[x1] !== undefined && y1 >= 0 && cellMatrix[x1][y1] !== undefined && !cellMatrix[x1][y1].classList.contains("wall") && !visited[x1][y1]){
                let node = cellMatrix[x1][y1];
                let gValue = gValueCurr;
                let hValue = modOf(endPointCordinate[0] - x1)  + modOf(endPointCordinate[1] - y1)
                if(node.classList.contains("weight"))gValue += 10;
                let pointsTemp = gValue + hValue + 1;   
                if(fn[x1][y1] > pointsTemp){
                    fn[x1][y1] = pointsTemp;
                    parentMatrix[x1][y1] = [x, y];
                    ParentG[x1][y1] = gValue;
                } 
               
                if(node === endPoint) found = true;
                if(!alreadyInside[x1][y1]){
                    smallestWeight.push([fn[x1][y1], [x1, y1]])
                    alreadyInside[x1][y1] = true;
                }
            }
        }
        if(found){
            console.log("mill gaya" + " A*")
            vistedAnimation.push(cellMatrix[x1][y1])
            AnimateSearch(vistedAnimation, parentMatrix, [x1, y1], true);
            return;
        }
    }
    AnimateSearch(vistedAnimation, parentMatrix, [-1, -1], false);
}

function modOf(a){
    if(a >= 0)return a;
    return -a;
}