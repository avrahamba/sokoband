'use strict';
//sokoband

var gBoard = [];
var gLevelBoard = [];
var gUser = null;
var gLevel = 0;
var gCountBox = 0;
var gCountBoxEnter = 0;
var gLevels = [
    [
        [1, 1, 1, 1, 1, 1],
        [1, 4, 0, 0, 0, 1],
        [1, 0, 0, 3, 0, 1],
        [1, 0, 0, 0, 2, 1],
        [1, 1, 1, 1, 1, 1]
    ],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 4, 4, 4, 1, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 3, 3, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 3, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 4, 4, 1, 0, 0, 0, 0, 2, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 3, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 3, 0, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
];

function initGame() {
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
    gLevelBoard = gLevels[0];
    loadBoard();
    renderBoard();
}


function loadBoard() {
    gBoard = [];
    for (var i = 0; i < gLevelBoard.length; i++) {
        gBoard[i] = gLevelBoard[i].slice();
    }
    gCountBox = 0;
    for (var i = 0; i < gLevelBoard.length; i++) {
        for (var j = 0; j < gLevelBoard[0].length; j++) {
            if (gLevelBoard[i][j] === 4) {
                gCountBox++;
            }
        }
    }
}

function move(ev) {
    var newUser = null;
    switch (ev.key) {
        case "ArrowUp":
            newUser = { i: gUser.i - 1, j: gUser.j };
            break;
        case "ArrowDown":
            newUser = { i: gUser.i + 1, j: gUser.j };
            break;
        case "ArrowLeft":
            newUser = { i: gUser.i, j: gUser.j - 1 };
            break;
        case "ArrowRight":
            newUser = { i: gUser.i, j: gUser.j + 1 };
            break;
        default:
            return;
    }
    refresh(newUser);
}

function refresh(newUser) {
    switch (gBoard[newUser.i][newUser.j]) {
        case 0:
        case 4:
            var last = 0;
            if (gLevelBoard[gUser.i][gUser.j] === 4) {
                last = 4;
            }
            gBoard[gUser.i][gUser.j] = (gLevelBoard[gUser.i][gUser.j] === 2) ? 0 : last;
            gBoard[newUser.i][newUser.j] = 2;
            gUser.i = newUser.i;
            gUser.j = newUser.j;
            break;
        case 3:
            if (gUser.j === newUser.j) {
                if (gUser.i > newUser.i) {
                    if (gBoard[newUser.i - 1][gUser.j] === 0) {
                        gBoard[newUser.i - 1][gUser.j] = 3;
                        gBoard[newUser.i][newUser.j] = 2;
                        var last = 0;
                        if (gLevelBoard[gUser.i][gUser.j] === 4) {
                            last = 4;
                            lassBox();
                        }
                        gBoard[gUser.i][gUser.j] = last;
                        gUser.i = newUser.i;
                        gUser.j = newUser.j;
                    }
                    if (gBoard[newUser.i - 1][gUser.j] === 4) {
                        gBoard[newUser.i - 1][gUser.j] = 3;
                        gBoard[newUser.i][newUser.j] = 2;
                        var last = 0;
                        if (gLevelBoard[gUser.i][gUser.j] === 4) {
                            last = 4;
                            lassBox();
                        }
                        gBoard[gUser.i][gUser.j] = last;
                        gUser.i = newUser.i;
                        gUser.j = newUser.j;
                        addBox();
                    }
                } else {
                    if (gBoard[newUser.i + 1][gUser.j] === 0) {
                        gBoard[newUser.i + 1][gUser.j] = 3;
                        gBoard[newUser.i][newUser.j] = 2;
                        var last = 0;
                        if (gLevelBoard[gUser.i][gUser.j] === 4) {
                            last = 4;
                            lassBox();
                        }
                        gBoard[gUser.i][gUser.j] = last;
                        gUser.i = newUser.i;
                        gUser.j = newUser.j;
                    }
                    if (gBoard[newUser.i + 1][gUser.j] === 4) {
                        gBoard[newUser.i + 1][gUser.j] = 3;
                        gBoard[newUser.i][newUser.j] = 2;
                        var last = 0;
                        if (gLevelBoard[gUser.i][gUser.j] === 4) {
                            last = 4;
                            lassBox();
                        }
                        gBoard[gUser.i][gUser.j] = last;
                        gUser.i = newUser.i;
                        gUser.j = newUser.j;
                        addBox();
                    }
                }
            } else if (gUser.i === newUser.i) {
                if (gUser.j > newUser.j) {

                    if (gBoard[newUser.i][newUser.j - 1] === 0) {
                        gBoard[newUser.i][newUser.j - 1] = 3;
                        gBoard[newUser.i][newUser.j] = 2;
                        var last = 0;
                        if (gLevelBoard[gUser.i][gUser.j] === 4) {
                            last = 4;
                            lassBox();
                        }
                        gBoard[gUser.i][gUser.j] = last;
                        gUser.i = newUser.i;
                        gUser.j = newUser.j;
                    }
                    if (gBoard[newUser.i][newUser.j - 1] === 4) {
                        gBoard[newUser.i][newUser.j - 1] = 3;
                        gBoard[newUser.i][newUser.j] = 2;
                        var last = 0;
                        if (gLevelBoard[gUser.i][gUser.j] === 4) {
                            last = 4;
                            lassBox();
                        }
                        gBoard[gUser.i][gUser.j] = last;
                        gUser.i = newUser.i;
                        gUser.j = newUser.j;
                        addBox();
                    }
                } else {

                    if (gBoard[newUser.i][newUser.j + 1] === 0) {
                        gBoard[newUser.i][newUser.j + 1] = 3;
                        gBoard[newUser.i][newUser.j] = 2;
                        var last = 0;
                        if (gLevelBoard[gUser.i][gUser.j] === 4) {
                            last = 4;
                            lassBox();
                        }
                        gBoard[gUser.i][gUser.j] = last;
                        gUser.i = newUser.i;
                        gUser.j = newUser.j;
                    }
                    if (gBoard[newUser.i][newUser.j + 1] === 4) {
                        gBoard[newUser.i][newUser.j + 1] = 3;
                        gBoard[newUser.i][newUser.j] = 2;
                        var last = 0;
                        if (gLevelBoard[gUser.i][gUser.j] === 4) {
                            last = 4;
                            lassBox();
                        }
                        gBoard[gUser.i][gUser.j] = last;
                        gUser.i = newUser.i;
                        gUser.j = newUser.j;
                        addBox();
                    }
                }
            }
            break;
        case 1:
            return;
    }

    renderBoard();

}

function addBox() {
    gCountBoxEnter++;
    if (gCountBoxEnter === gCountBox) {
        gCountBoxEnter = 0;
        gLevel++;
        if (gLevel === gLevels.length) {
            alert(`victory the Game`);
            elBoard = document.querySelector('.board').innerHTML = '';
            return;
        } else {
            alert(`victory level ${gLevel}`);
        }
        gLevelBoard = gLevels[gLevel];

        loadBoard();
        renderBoard();
    }
}

function lassBox() {
    gCountBoxEnter--;
}

function renderBoard() {
    var strHtml = ``;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {

            switch (gBoard[i][j]) {
                case 0:
                    strHtml += `<div class="cell c0"></div>`;
                    break;
                case 1:
                    strHtml += `<div class="cell c1"></div>`;
                    break;
                case 2:
                    strHtml += `<div class="cell c2"></div>`;
                    gUser = { i: i, j: j };
                    break;
                case 3:
                    strHtml += `<div class="cell c3"></div>`;
                    break;
                case 4:
                    strHtml += `<div class="cell c4"></div>`;
                    break;
            }
        }
        strHtml += `<div class='edge'></div>`;
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}
