let deck = [];
let discardPile = [];
let pHand = [];
let cHand = [];
let suitList = ["club", "heart", "diamond", "spade"]
let faceList = ["jack", "king", "queen"]
let wins = 0;
let losses = 0;
let ties = 0;
let gameRunning = false;
let startButton = document.getElementById("startGame");
let hitButton = document.getElementById("hitMe");
let stayButton = document.getElementById("stay");

for (i = 0; i < 4; i++) {
    for (let j = 2; j <= 10; j++) {
        deck.push({ value: j, suit: suitList[i], face: j })
    }
    for (let j = 0; j < 3; j++) {
        deck.push({ value: 10, suit: suitList[i], face: faceList[j] })
    }
    deck.push({ value: 11, suit: suitList[i], face: "ace" })

}

console.log(deck);
shuffle(deck);
console.log(deck);

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function deal(hand) {
    if (deck.length < 10) {
        refill();
    }
    hand.push(deck.pop())
    if (checkScore(pHand) > 21) {
        endGame();
    }
    if (checkScore(hand) === 21) {
        endGame();
    }
}

function discard() {
    while (cHand.length > 0) {
        discardPile.push(cHand.pop());
    }
    while (pHand.length > 0) {
        discardPile.push(pHand.pop());
    }
}

function refill() {
    while (discardPile.length > 0) {
        deck.push(discardPile.pop());
    }
    shuffle(deck);
}

function checkScore(hand) {
    let total = 0;
    for (let i = 0; i < hand.length; i++) {
        total += hand[i].value
    }
    for (let i = 0; i < hand.length; i++) {
    if (total > 21 && hand[i].face === "ace"){
        total = total - 10
    }}
    return total;
}

function compTurn() {
    while (checkScore(cHand) < 17) {
        deal(cHand);
        for (i = cHand.length - 1; i < cHand.length; i++) {
        let cpuCard = document.createElement("div");
        let cardInfo = document.createTextNode(cHand[i].face + " of " + cHand[i].suit + "s");
        cpuCard.appendChild(cardInfo);
        cpuCard.classList.add("card")
        document.getElementById("cpuCards").appendChild(cpuCard);
        }
    }
    endGame();
}

function compareScore() {
    if (checkScore(cHand) == checkScore(pHand)) {
        ties++;
        gameRunning = false;
        hitButton.style.display = "none";
        stayButton.style.display = "none";
        startButton.style.display = "block";
        document.getElementById("ties").innerText = ties;
    } else if (checkScore(cHand) > checkScore(pHand)) {
        losses++;
        gameRunning = false;
        hitButton.style.display = "none";
        stayButton.style.display = "none";
        startButton.style.display = "block";
        document.getElementById("losses").innerText = losses;
    } else {
        wins++;
        gameRunning = false;
        hitButton.style.display = "none";
        stayButton.style.display = "none";
        startButton.style.display = "block";
        document.getElementById("wins").innerText = wins;
    }
}

function endGame() {
    if (checkScore(pHand) > 21) {
        losses++;
        gameRunning = false;
        hitButton.style.display = "none";
        stayButton.style.display = "none";
        startButton.style.display = "block";
        document.getElementById("losses").innerText = losses;
    }
    else if (checkScore(cHand) > 21) {
        wins++;
        gameRunning = false;
        hitButton.style.display = "none";
        stayButton.style.display = "none";
        startButton.style.display = "block";
        document.getElementById("wins").innerText = wins;
    }
    else {
        compareScore();
    }


}

function startGame() {
    if (gameRunning === false) {
        const node = document.getElementById("cpuCards");
        node.querySelectorAll('*').forEach(n => n.remove());
        const nodetwo = document.getElementById("playerCards");
        nodetwo.querySelectorAll('*').forEach(n => n.remove());

        startButton.style.display = "none";

        gameRunning = true;
        discard();
        refill();
        deal(pHand);
        deal(cHand);
        deal(pHand);

        if (gameRunning === true) {
            deal(cHand);
            startButton.style.display = "none";
            hitButton.style.display = "block";

            stayButton.style.display = "block";

        }
        for (i = 0; i < pHand.length; i++) {
            let playerCard = document.createElement("div");
            let cardInfo = document.createTextNode(pHand[i].face + " of " + pHand[i].suit + "s");
            playerCard.appendChild(cardInfo);
            playerCard.classList.add("card")
            document.getElementById("playerCards").appendChild(playerCard);
        }
        for (i = 0; i < cHand.length; i++) {
            let cpuCard = document.createElement("div");
            let cardInfo = document.createTextNode(cHand[i].face + " of " + cHand[i].suit + "s");
            cpuCard.appendChild(cardInfo);
            cpuCard.classList.add("card")
            document.getElementById("cpuCards").appendChild(cpuCard);
        }

    }
}

document.getElementById('startGame').addEventListener("click", function () {
    if(gameRunning === false){
    startGame();
    }
})

document.getElementById("hitMe").addEventListener("click", function () {
    deal(pHand);
    for (i = pHand.length - 1; i < pHand.length; i++) {
    let playerCard = document.createElement("div");
    let cardInfo = document.createTextNode(pHand[i].face + " of " + pHand[i].suit + "s");
    playerCard.appendChild(cardInfo);
    playerCard.classList.add("card")
    document.getElementById("playerCards").appendChild(playerCard);
    }
})

document.getElementById("stay").addEventListener("click", function () {
    compTurn();
})