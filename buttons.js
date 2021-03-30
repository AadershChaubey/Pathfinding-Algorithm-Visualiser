const clearButton = document.querySelector(".clear");
const chooseAlgo = document.querySelector(".algorithms");
const algoList = document.querySelector(".algo-list");
const choosenAlgo = chooseAlgo.querySelector("p")


clearButton.addEventListener("click", ()=>{
    usedBoard = false;
    instantPath = false;
    pauseButton.disabled = true;
    paused = false;
    changePause()
    clear("wall");
    clear("visited")
    clear("path")
    clear("weight")
    clear("visited-weight")
    clear("fast-visited")
    clear("fast-path")
    previousStratClass = "Empty-cell";
    previousEndClass = "Empty-cell";
} )


const findPathButton = document.querySelector(".find-path");
findPathButton.addEventListener("click", ()=>{
    paused = false;
    changePause()
    stopButtons();
    startSearch()
})

function clear(classes){
    cellMatrix.forEach(rows=>{
        rows.forEach(cell=>{
            if(cell.classList.contains(classes)){
                cell.classList.remove(classes)
                cell.classList.add("Empty-cell")
            }
        })
    })
}

function startSearch(){
    clear("visited")
    clear("path")
    clear("fast-visited")
    clear("fast-path")
    let text = chooseAlgo.innerText;
    if(text == "BFS")bfs();
    else if(text == "Dijkstra's") Djkstra();
    else resetButtons()
}



chooseAlgo.addEventListener("click", ()=>{
    let style = algoList.style;
    if(style.transform != "scale3d(1, 1, 1)"){
        style.transform = "scale3d(1, 1, 1)";
        style.zIndex = 1;
    }
    else {
        style.transform = "scale3d(1, 0, 1)";
        style.zIndex = -1;
    }
})

const algoListLi = algoList.querySelectorAll("li");

algoListLi.forEach((element)=>{
    element.addEventListener("click", ()=>{
        const text = element.innerText;
        if(text == "Breath First Search")chooseAlgo.querySelector("p").innerText ="BFS";
        else choosenAlgo.innerText = text;
        
        algoListDisappear();
    })
})


function algoListDisappear(){
    let style = algoList.style;
    style.transform = "scale3d(1, 0, 1)";
    style.zIndex = -1;
}

