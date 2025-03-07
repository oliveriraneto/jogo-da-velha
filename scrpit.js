const proximoplayer = document.querySelector(".proximoplayer");

let selected;
let Player = "X";

let Position = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

function init() {
    selected = [];

    proximoplayer.innerHTML = `JOGADOR DA VEZ: ${Player}`;

    document.querySelectorAll(".jogo button").forEach((item) => {
        item.innerHTML = "";
        item.addEventListener("click", newMove);
    });
}

init();

function newMove(e) {
    const index = e.target.getAttribute("data-i");
    e.target.innerHTML = Player;
    e.target.removeEventListener("click", newMove);
    selected[index] = Player;

    setTimeout(() => {
        check();
    }, 100);

    Player = Player === "X" ? "O" : "X";
    proximoplayer.innerHTML = `JOGADOR DA VEZ: ${Player}`;
}

function check() {
    let playerLastMove = Player === "X" ? "O" : "X";

    const items = selected
        .map((item, i) => [item, i])
        .filter((item) => item[0] === playerLastMove)
        .map((item) => item[1]);

    for (pos of Position) {
        if (pos.every((item) => items.includes(item))) {
            alert("O JOGADOR '" + playerLastMove + "' GANHOU");
            init();
            return;
        }
    }

    if (selected.filter((item) => item).length === 9) {
        alert("DEU EMPATE");
        init();
        return;
    }
}
