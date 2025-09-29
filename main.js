import {tileMap01} from "./SokobanBase.js";

/* Parse mapgrid free from space, p, b and large letters*/
const mapping = {
  ' ': 'fl',
  'W': 'wa',
  'P': 'pl',
  'G': 'go',
  'B': 'bl'
};

tileMap01.mapGrid = tileMap01.mapGrid.map(row =>
  row.map(cell => [ mapping[cell[0]] ?? cell[0] ])
);

const myMap = tileMap01.mapGrid;


/* Init the game */
const initTheBoard = () => {
    let board = document.getElementById("board");
    board.innerHTML = '';
    for (let rows =0; rows<tileMap01.height; rows++){
        for( let cols = 0; cols < tileMap01.width; cols++){
            let newEl = document.createElement("div")
            newEl.classList.add("boardgrid", tileMap01.mapGrid[rows][cols]);
            board.appendChild(newEl);
        }

    }

}

let playerRow = tileMap01.mapGrid.findIndex(row =>
  row.some(cell => cell[0] === 'pl')
);

let playerCol = tileMap01.mapGrid[playerRow].findIndex(cell => cell[0] === 'pl');

let playerPos = { row: playerRow, col: playerCol };


const moveplayer = (move) => {
    const oldRow = playerPos.row;
    const oldCol = playerPos.col;

    if (move == 'up') { playerPos.row = (playerPos.row -1)};
    if (move == 'down') { playerPos.row = (playerPos.row + 1)};
    if (move == 'left') { playerPos.col = (playerPos.col - 1)};
    if (move == 'right') { playerPos.col = (playerPos.col + 1)};

    myMap[oldRow][oldCol] = ['fl'];
    myMap[playerPos.row][playerPos.col] = ['pl']
    initTheBoard();
}


document.addEventListener('DOMContentLoaded', (e) => {
    initTheBoard();
})

document.addEventListener('keypress', (e) => {

    if (e.key == 'w') return moveplayer('up');
    if (e.key == 's') return moveplayer('down');
    if (e.key == 'd') return moveplayer('right');
    if (e.key == 'a') return moveplayer('left');
    
})