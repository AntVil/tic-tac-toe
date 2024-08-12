const WON_ROW_1 = 0
const WON_ROW_2 = 1
const WON_ROW_3 = 2
const WON_COLUMN_1 = 3
const WON_COLUMN_2 = 4
const WON_COLUMN_3 = 5
const WON_DIAGONAL_1 = 6
const WON_DIAGONAL_2 = 7

let turn = 0;
let isPlayer1Turn = true;
let player1Mask = 0;
let player2Mask = 0;
let resultLineElement;
let score1Element;
let score2Element;
let gameElements;
let footerToggleElement;
let messageElement;

document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
});

window.onload = () => {
    resultLineElement = document.getElementById("resultLine");
    score1Element = document.getElementById("score1");
    score2Element = document.getElementById("score2");
    gameElements = document.getElementsByTagName("main")[0].children;
    footerToggleElement = document.getElementById("footer-toggle");
    messageElement = document.getElementById("message");
}

function playerMove(box, index) {
    let playerClass;
    let maskCase;
    let scoreElement;

    if (isPlayer1Turn) {
        playerClass = "player-1";
        player1Mask |= 1 << index;
        maskCase = getMaskCase(player1Mask);
        scoreElement = score1Element;
    } else {
        playerClass = "player-2";
        player2Mask |= 1 << index;
        maskCase = getMaskCase(player2Mask);
        scoreElement = score2Element;
    }

    box.classList.add(playerClass);

    if(maskCase !== -1) {
        resultLineElement.classList.add(`won-case-${maskCase}`, playerClass);
        scoreElement.innerText = parseInt(scoreElement.innerText) + 1;

        finishGame(`${playerClass} won!`);
        return
    }

    isPlayer1Turn = !isPlayer1Turn;
    turn++;

    if (turn === 9) {
        // tie
        finishGame("It's a tie.");
    }
}

function finishGame(message) {
    messageElement.innerText = message;
    footerToggleElement.checked = true;
}

function rematch() {
    for(let element of gameElements) {
        element.classList = "";
        element.checked = false;
    }
    player1Mask = 0;
    player2Mask = 0;
    turn = 0;
    footerToggleElement.checked = false;
}

function getMaskCase(mask) {
    let row1 = 0b000000111;
    let row2 = 0b000111000;
    let row3 = 0b111000000;
    let column1 = 0b001001001;
    let column2 = 0b010010010;
    let column3 = 0b100100100;
    let diagonal1 = 0b100010001;
    let diagonal2 = 0b001010100;

    if ((mask & row1) === row1) {
        console.log("WON_ROW_1")
        return WON_ROW_1;
    } else if ((mask & row2) === row2) {
        console.log("WON_ROW_2")
        return WON_ROW_2;
    } else if ((mask & row3) === row3) {
        console.log("WON_ROW_3")
        return WON_ROW_3;
    } else if ((mask & column1) === column1) {
        console.log("WON_COLUMN_1")
        return WON_COLUMN_1;
    } else if ((mask & column2) === column2) {
        console.log("WON_COLUMN_2")
        return WON_COLUMN_2;
    } else if ((mask & column3) === column3) {
        console.log("WON_COLUMN_3")
        return WON_COLUMN_3;
    } else if ((mask & diagonal1) === diagonal1) {
        console.log("WON_DIAGONAL_1")
        return WON_DIAGONAL_1;
    } else if ((mask & diagonal2) === diagonal2) {
        console.log("WON_DIAGONAL_2")
        return WON_DIAGONAL_2;
    } else {
        return -1;
    }
}
