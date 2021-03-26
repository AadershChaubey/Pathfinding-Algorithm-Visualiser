var screenActivity = true;
var onTimePathFinding = false;
// digning grid
const body = document.querySelector("body");
const widthOfCell = 25;
const container = document.querySelector("table");
const containerWidth = container.offsetWidth.toFixed(0);
const containerHieght = container.offsetHeight.toFixed(0);
const numberOfCols = (containerWidth / widthOfCell).toFixed(0);
const numbersOfRows = (containerHieght / widthOfCell).toFixed(0);
const cellMatrix = [];                                // All the cels will be stored in this
console.log(numbersOfRows, numberOfCols); 
for (let i = 0; i < numbersOfRows; i++) {
const row = document.createElement("tr");
const cellRow = [];
    for (let j = 0; j < numberOfCols; j++) {
        const cell = document.createElement("td");
        cell.classList.add("Empty-cell");
        row.append(cell);
        cellRow.push(cell);
    }
container.append(row);
cellMatrix.push(cellRow);
}

      
// assigning starting point and ending point

const startingPoint = cellMatrix[10][10]
startingPoint.classList.remove("Empty-cell");
startingPoint.classList.add("start");

const endingPoint = cellMatrix[10][30]
endingPoint.classList.remove("Empty-cell");
endingPoint.classList.add("end");

// draging of starting point

var startMouseDown = false;
var startPoint = document.querySelector(".start");
startPoint.addEventListener("mousedown", startPointMouseDownFunction)
var previousStratClass = null;
function startPointMouseDownFunction(){
    console.log(startPoint);
    startMouseDown = true;
    console.log("startPoint-up");
}

cellMatrix.forEach((row) => {
    row.forEach((cell) => {
        cell.addEventListener("mouseover", () => {
            if (screenActivity && startMouseDown && endPoint != cell) {
                startPoint.classList.remove("start");
                startPoint.classList.add(previousStratClass);
                startPoint.removeEventListener("mousedown", startPointMouseDownFunction);
                startPoint = cell;
                previousStratClass = startPoint.classList[0]
                startPoint.classList.remove(previousStratClass)
                startPoint.classList.add("start");
                startPoint.addEventListener("mousedown", startPointMouseDownFunction)
                if(onTimePathFinding) {
                    startSearch()
                }
            }
        });
    });
});

//  draging of ending Point

var endMouseDown = false;
var endPoint = document.querySelector(".end");
endPoint.addEventListener("mousedown", endPointMouseDownFunction)
var previousEndClass = null;
function endPointMouseDownFunction(){
    console.log(endPoint);
    endMouseDown = true;
    console.log("endPoint-up");
}

cellMatrix.forEach((row) => {
    row.forEach((cell) => {
        cell.addEventListener("mouseover", () => {
            if (screenActivity && endMouseDown  && startPoint != cell) {
                endPoint.classList.remove("end");
                endPoint.classList.add(previousEndClass)
                endPoint.removeEventListener("mousedown", endPointMouseDownFunction);
                endPoint = cell;
                previousEndClass = endPoint.classList[0];
                endPoint.classList.remove(previousEndClass);
                endPoint.classList.add("end");
                endPoint.addEventListener("mousedown", endPointMouseDownFunction)
            }
        });
    });
});


// making walls

var containerMouseDown = false;
container.addEventListener("mousedown", () => {
if(!startMouseDown && !endMouseDown)containerMouseDown = true;
});

body.addEventListener("mouseup", () => {
    containerMouseDown = false;
    startMouseDown = false;
    endMouseDown = false;
});

var cell = null;
cellMatrix.forEach((row) => {
    row.forEach((cellc) => {
        cellc.addEventListener("mouseover", () => {
        if (screenActivity && containerMouseDown) {
            cell = cellc;
            changeCellColor();
            cell = null;
        }
        });

        cellc.addEventListener("click", () => {
            if(screenActivity && cellc != startPoint && cellc != endPoint){
                cell = cellc;
                changeCellColor();
                cell = null;
            }
        });
    });
});

function changeCellColor() {
    // console.log(cell.classList);
    if (cell.classList.contains("Empty-cell")) {
        cell.classList.remove("Empty-cell");
        cell.classList.add("wall");
    } else if(cell.classList.contains("wall")){
        cell.classList.remove("wall");
        cell.classList.add("Empty-cell");
    }
    // console.log(cell.classList);
}
