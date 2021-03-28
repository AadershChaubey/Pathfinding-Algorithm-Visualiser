const clearButton = document.querySelector(".clear");
const chooseAlgo = document.querySelector(".algorithms");
const algoList = document.querySelector(".algo-list");
const choosenAlgo = chooseAlgo.querySelector("p")

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

function startSearch(){
    clear("visited")
    clear("path")
    findPathButton.disabled = true;
    clearButton.disabled = true;
    screenActivity = false;
    let text = chooseAlgo.innerText;
    if(text == "BFS")bfs();
    else if(text == "Dijkstra's") Djkstra();
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

