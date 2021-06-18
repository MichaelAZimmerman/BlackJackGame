let deck= [];
let discard=[];
let pHand=[];
let cHand=[];
let suitList = ["club", "heart", "diamond", "spade"]
let faceList = ["jack","king","queen"]

for (i = 0; i < 4; i++){
    for (j = 2; j < 10; j++){
        deck.push({value:j, suit: suitList[j], face: j})
    }
    for (let j = 0; j < 3; j++){
        deck.push({value: 10, face: faceList[j], suit: suitList[i]})
    }
    deck.push({value: 11, suit: suitList[i], face: "ace"})

}

shuffle(deck);
console.log(deck);
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function deal(hand){
    hand.push(deck.pop())
}
