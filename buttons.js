const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", ()=>{
    onTimePathFinding = false;
    clear("wall");
    clear("visited")
    clear("path")
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

function startSearch(){
    clear("visited")
    clear("path")
    findPathButton.disabled = true;
    clearButton.disabled = true;
    screenActivity = false;
    bfs()
    onTimePathFinding = true;
}

