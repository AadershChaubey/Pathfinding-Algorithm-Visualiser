const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", ()=>{
    clear("wall");
    clear("visited")
    clear("path")
    clear("weight")
    clear("visited-weight")
    previousStratClass = null;
    previousEndClass = null;
} )


const findPathButton = document.querySelector(".find-path");
findPathButton.addEventListener("click", startSearch)

function clear(classes){
    cellMatrix.forEach(rows=>{
        rows.forEach(cell=>{
            if(cell.classList.contains(classes)){
                cell.classList.remove(cell.classList[0]);
                cell.classList.add("Empty-cell")
            }
        })
    })
}

var bf = false;
function startSearch(){
    clear("visited")
    clear("path")
    findPathButton.disabled = true;
    clearButton.disabled = true;
    screenActivity = false;
    if(!bf)Djkstra();
    else bfs();
}

