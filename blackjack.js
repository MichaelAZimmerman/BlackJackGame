let deck = [];
let discardPile = [];
let pHand = [];
let cHand = [];
let suitList = ["club", "heart", "diamond", "spade"]
let faceList = ["jack", "king", "queen"]
let wins = 0;
let losses = 0;
let ties = 0;

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
    if (checkScore(hand) > 21){
        endGame()
    }
}

function discard() {
    while (cHand.length > 0) {
        discardPile.push(cHand.pop())
    }
    while (pHand.length > 0) {
        discardPile.push(pHand.pop())
    }
}

function refill() {
    while (discardPile.length > 0) {
        deck.push(discardPile.pop())
    }
    shuffle(deck);
}

function checkScore(hand) {
    let total = 0;
    for (let i= 0; i < hand.length; i++){
    total += hand[i].value}
    return total;
}

function compTurn(){
    while (checkScore(cHand) < 17){
        deal(cHand)
    }
    compareScore();
}

function compareScore(){
    if (checkScore(cHand) == checkScore(pHand)){
        ties++;
    } else if (checkScore(cHand) > checkScore(pHand)){
        losses++;
    } else{
    wins++;}
}

function endGame(){
    if (checkScore(pHand) > 21){
        losses++;
    }
    else{
        wins++;
    }
    
}