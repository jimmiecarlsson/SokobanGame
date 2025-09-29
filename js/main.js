import {tileMap01} from "./SokobanBase.js";

/* Init the game */

const initTheBoard = () => {
    let board = getElementById("board");
    board.innerHTML = '';
    for (let rows =0; rows<tileMap01.height; row++){
        for( let cols = 0; cols < tileMap01.width; cols++){
            let newEl = document.createElement("div")
        }

    }

}

initTheBoard();