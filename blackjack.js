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
    return total;
}

function compTurn() {
    while (checkScore(cHand) < 17) {
        deal(cHand);
    }
    endGame();
}

function compareScore() {
    if (checkScore(cHand) == checkScore(pHand)) {
        ties++;
        gameRunning = false;
    } else if (checkScore(cHand) > checkScore(pHand)) {
        losses++;
        gameRunning = false;
    } else {
        wins++;
        gameRunning = false;
    }
}

function endGame() {
    if (checkScore(pHand) > 21) {
        losses++;
        gameRunning = false;
    }
    else if (checkScore(cHand) > 21) {
        wins++;
        gameRunning = false;
    }
    else {
        compareScore();
    }


}

function startGame() {
    if (gameRunning === false) {
        gameRunning = true;
        discard();
        refill();
        deal(pHand);
        deal(cHand);
        deal(pHand);
        
        if (gameRunning === true) {
            deal(cHand);
            let hitMe = document.createElement("button");
            let hitMeText = document.createTextNode("Hit");
            hitMe.appendChild(hitMeText);
            document.getElementById("buttonArea").appendChild(hitMe);

            let linebr = document.createElement("br");
            document.getElementById("buttonArea").appendChild(linebr);

            let stay = document.createElement("button");
            let stayText = document.createTextNode("Stay");
            stay.appendChild(stayText);
            document.getElementById("buttonArea").appendChild(stay);

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
    const node = document.getElementById("cpuCards");
    node.querySelectorAll('*').forEach(n => n.remove());
    const nodetwo = document.getElementById("playerCards");
    nodetwo.querySelectorAll('*').forEach(n => n.remove());
    startGame();
})