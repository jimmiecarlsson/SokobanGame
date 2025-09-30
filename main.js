import {tileMap01} from "./SokobanBase.js";

let myMap = tileMap01.mapGrid;
const myHeight = tileMap01.height;
const myWidth = tileMap01.width;

/* Parse mapgrid free from space, p, b and large letters*/
const mapping = {
  ' ': 'fl',
  'W': 'wa',
  'P': 'pl',
  'G': 'go',
  'B': 'bl'
};

myMap = myMap.map(row =>
  row.map(cell => [ mapping[cell[0]] ?? cell[0] ])
);

const totalGoals = myMap.flat().filter(cell => cell[0] === 'go').length;

let playerRow = myMap.findIndex(row => row.some(cell => cell[0] === 'pl'));
let playerCol = myMap[playerRow].findIndex(cell => cell[0] === 'pl');
let playerPos = { row: playerRow, col: playerCol };

/* Init the game */
const initTheBoard = () => {
    let board = document.getElementById("board");
    board.innerHTML = '';

    for (let rows =0; rows<myHeight; rows++){

        for( let cols = 0; cols < myWidth; cols++){
            let newEl = document.createElement("div")
            newEl.classList.add("boardgrid", myMap[rows][cols]);
            board.appendChild(newEl);
        }
    }
}

function getDirection(move) {
  const dRow = move === 'up' ? -1 : move === 'down' ? 1 : 0;
  const dCol = move === 'left' ? -1 : move === 'right' ? 1 : 0;
  return { dRow, dCol };
}

function checkWin() {
  const blocksOnGoals = myMap.flat().filter(cell => cell[0] === 'bl_go').length;
  return blocksOnGoals === totalGoals;
}


const moveplayer = (move) => {
  const oldRow = playerPos.row;
  const oldCol = playerPos.col;

  const {dRow, dCol} = getDirection(move);
  const newRow = oldRow + dRow;
  const newCol = oldCol + dCol;

  const checkTarget = myMap[newRow][newCol][0];

    if(checkTarget === 'wa'){
      return; //Kolla om det är en vägg returnera inget
    }
    
    if (checkTarget === 'fl' || checkTarget === 'go') {
      if (myMap[oldRow][oldCol][0] === 'pl_go') {
        myMap[oldRow][oldCol] = ['go']        
      } else {
        myMap[oldRow][oldCol] = ['fl']
      }

      if (checkTarget === 'go') {
        myMap[newRow][newCol] = ['pl_go']
      } else {
        myMap[newRow][newCol] = ['pl']
      }
    
      playerPos = {row: newRow, col: newCol };

    } else if (checkTarget === 'bl' || checkTarget === 'bl_go') {
      const blockRow = newRow + dRow;
      const blockCol = newCol + dCol;
      const blockTarget = myMap[blockRow][blockCol][0];

      if (blockTarget === 'fl' || blockTarget === 'go'){

        myMap[blockRow][blockCol] = blockTarget === 'go' ? ['bl_go'] : ['bl'];

        if (myMap[oldRow][oldCol][0] === 'pl_go') {
          myMap[oldRow][oldCol] = ['go'];
        } else {
          myMap[oldRow][oldCol] = ['fl'];
        }

        myMap[newRow][newCol] = checkTarget === 'bl_go' ? ['pl_go'] : ['pl'];

        playerPos = { row: newRow, col: newCol }

      } else {
        return;
      }

    }

    initTheBoard();

    if (checkWin()) {
      alert("🎉 Du vann!");
    };

}


document.addEventListener('DOMContentLoaded', (e) => {
    initTheBoard();
})

document.addEventListener('keydown', (e) => {
    //console.log("Key pressed:", e.key, e.code);
    if (e.code === 'KeyW' || e.key === 'ArrowUp') return moveplayer('up');
    if (e.code === 'KeyS' || e.key === 'ArrowDown') return moveplayer('down');
    if (e.code === 'KeyD' || e.key === 'ArrowRight') return moveplayer('right');
    if (e.code === 'KeyA' || e.key === 'ArrowLeft') return moveplayer('left');

})