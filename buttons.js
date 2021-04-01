const clearButton = document.querySelector(".clear-btn");
const chooseAlgo = document.querySelector(".algorithms");
const algoList = document.querySelector(".algo-list");
const clearList = document.querySelector(".clear-list");
const choosenAlgo = chooseAlgo.querySelector("p")


clearButton.addEventListener("click", ()=>{
    
    
} )
// clear Button
clearButton.addEventListener("click", ()=>{
    let style = clearList.style;
    if(style.transform != "scale3d(1, 1, 1)"){
        style.transform = "scale3d(1, 1, 1)";
        style.zIndex = 1;
    }
    else {
        style.transform = "scale3d(1, 0, 1)";
        style.zIndex = -1;
    }
})

// clear Button list-li
const clearListLi = clearList.querySelectorAll(".clear-li");
clearListLi.forEach((element)=>{
    element.addEventListener("click", ()=>{
        if(element === document.querySelector("#clear-all")){
        clear("wall");
        clear("visited")
        clear("path")
        clear("weight")
        clear("fast-visited")
        clear("fast-path")
        }else if(element === document.querySelector("#clear-wall"))clear("wall")
        else if(element === document.querySelector("#clear-weight"))clear("weight")
        else {
            clear("visited")
            clear("path")
            clear("fast-visited")
            clear("fast-path")
        }
        
        screenActivity = true;
        usedBoard = false;
        instantPath = false;
        pauseButton.disabled = true;
        paused = false;
        changeClassPuaseButton();
    })
})


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
                // if(classes == "path" || classes == "fast-path"){
                //     let pathLine = cell.querySelector(".pathLineContainer");
                //     if(pathLine !== null)pathLine.remove()
                // }
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
    else if(text == "A* Search")AStar();
    else if(text == "DFS")dfs();
    else{
        findPathButton.innerText = "Choose Algorithm"
        findPathButton.style.color = "#f39999";
        resetButtons()
    } 
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

const algoListLi = algoList.querySelectorAll(".algo-li");

algoListLi.forEach((element)=>{
    element.addEventListener("click", ()=>{
        const text = element.innerText;
        if(text == "Breath First Search")chooseAlgo.querySelector("p").innerText ="BFS";
        else if(text == "Depth First Search")chooseAlgo.querySelector("p").innerText ="DFS";
        else choosenAlgo.innerText = text;
        findPathButton.innerText = "Find Path"
        findPathButton.style.color = "rgb(245, 224, 224)";
        algoListDisappear();
    })
})

const nav = document.querySelector("nav");
body.addEventListener("click", ()=>{
    const list =  window.event.srcElement.classList;
    if(list.contains("fa-chevron-down") || list.contains("algo-p") || list.contains("algorithms"))return;
    algoListDisappear()
})


function algoListDisappear(){
    let style = algoList.style;
    style.transform = "scale3d(1, 0, 1)";
    style.zIndex = -1;
}

