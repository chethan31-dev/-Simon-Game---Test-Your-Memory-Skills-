let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let highScoreEl = document.getElementById("high-score");
let startBtn = document.getElementById("start-btn");

// Start Button for mobile and PC
startBtn.addEventListener("click", startGame);

document.addEventListener("keypress", startGame);

function startGame() {
    if (!started) {
        started = true;
        level = 0;
        gameSeq = [];
        userSeq = [];
        startBtn.style.display = "none";
        h2.innerText = `Level ${level}`;
        levelUp();
    }
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.getElementById(randColor);

    gameSeq.push(randColor);
    console.log(gameSeq);

    // Flash the sequence one by one
    gameSeq.forEach((color, index) => {
        setTimeout(() => {
            let btn = document.getElementById(color);
            gameFlash(btn);
        }, 500 * index);
    });
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press Start to play again.`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "black";
        }, 300);

        if (level > highScore) {
            highScore = level;
            highScoreEl.innerText = `Highest Score: ${highScore}`;
        }
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.id;
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => {
    btn.addEventListener("click", btnPress);
    btn.addEventListener("touchstart", btnPress); // mobile support
});

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    startBtn.style.display = "inline-block";
}
