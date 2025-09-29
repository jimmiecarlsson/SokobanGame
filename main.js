import {tileMap01} from "./SokobanBase.js";

/* Parse mapgrid free from space */
const mapping = {
  ' ': 'f',
  'W': 'wa',
  'P': 'pl',
  'G': 'go',
  'B': 'bl'
};

tileMap01.mapGrid = tileMap01.mapGrid.map(row =>
  row.map(cell => [ mapping[cell[0]] ?? cell[0] ])
);


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

document.addEventListener('DOMContentLoaded', (e) => {
    console.log("DOM laddad")
    initTheBoard();
})