const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const winner = document.getElementById("winner");
const restart = document.getElementById("btn");

console.log(cells);
console.log(board);

// circle
// x

let turnX = true;
let xChoices = [];
let circleChoices = [];
let winnerFind = true;


// array to winner diciiton
const winnerSet = {
    xWinner: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ],
    circleWinner: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]
}


//function to win marching
function choiceChackX(choice) {
    let resultX = 0;
    for (let place of choice) {
        if (xChoices.includes(place)) {
            resultX += 1;
        } else {
            resultX = 0;
        }
    }
    return resultX;
}
function choiceChackO(choice) {
    let resultO = 0;
    for (let place of choice) {
        if (circleChoices.includes(place)) {
            resultO += 1;
        } else {
            resultO = 0;
        }
    }
    return resultO;
}

//turn of player
if (turnX) {
    board.classList.remove("circle");
    board.classList.add("x");
}

//playing part
const gameplay = function () {
    cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                if(cell.classList.contains("circle") || 
                    cell.classList.contains("x")){
                }else{
                    if (turnX && winnerFind) {
                        cell.classList.add("x");
                        xChoices.push(index + 1);
                        turnX = false;
                    } else if(winnerFind) {
                        cell.classList.add("circle");
                        circleChoices.push(index + 1);
                        turnX = true;
                    }
                }


                // viewing porpose
                if (turnX) {
                    board.classList.remove("circle");
                    board.classList.add("x");
                } else {
                    board.classList.remove("x");
                    board.classList.add("circle");
                }


                // winnerDermination
                for (let choice of winnerSet.xWinner) {
                    if (choiceChackX(choice) === 3) {
                        winner.innerText = "X win";
                        winnerFind = false;
                    }
                }
                for (let choice of winnerSet.circleWinner) {
                    if (choiceChackO(choice) === 3) {
                        winner.innerText = "O win";
                        winnerFind = false;
                    }
                }
                let drawCount = 0;
                for(let cell of cells){
                    if(cell.classList.contains('circle') ||
                    cell.classList.contains('x')){
                        drawCount += 1;
                    }else {
                        drawCount = 0;
                    }
                }
                if(drawCount === 9){
                    winner.innerText = "Draw";
                    winnerFind = false;
                }
            })
    })

}
gameplay();

restart.addEventListener('click',()=>{
    for(let cell of cells){
        cell.classList.remove('circle','x');
    }
    winner.innerText = "";
    xChoices = [];
    circleChoices = [];
    winnerFind = true;
    gameplay();
})


