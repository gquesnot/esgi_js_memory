import {Card} from "./card.js";

export class Memory{
    cardsName = [
        "aragorn",
        "boromir",
        "frodon",
        "gandalf",
        "gimli",
        "gollum",
        "legolas",
        "merry",
        "pipin",
        "sam",
    ];

    cards = {}
    cardCouple = [];
    try = 0
    found = 0
    freezeGame = false
    constructor() {

        this.htmlCards = document.querySelectorAll('li')
        this.result = document.querySelector(".result")
        this.result.addEventListener("dblclick", ()=>{this.reset()})
        this.loadImgs()
        this.newGame()

    }


    loadImgs(){
        let body = document.querySelector("body")

        for (let cardName of this.cardsName){
            let img = document.createElement("img")
            img.classList.add("hide")
            img.src = "img/persos/" + cardName + ".jpeg"
            body.append(img)

        }
    }



    getShuffledArray(){
        let ids = Array.from({length: 20}, (_, index) => index);
        let i = ids.length, j, temp;
        if ( i === 0 ) return this;
        while ( --i ) {
            j = Math.floor( Math.random() * ( i + 1 ) );
            temp = ids[i];
            ids[i] = ids[j];
            ids[j] = temp;
        }
        return ids;

    }


    checkWin(){
        if (this.found === this.cardsName.length){
            document.querySelector(".result strong").innerHTML = this.try.toString()
            this.result.style.top = "0%"
        }
    }

    newGame(){
        this.cards = {};
        this.cardCouple = [];
        this.try = 0
        this.found = 0
        this.freezeGame = false

        let ids = this.getShuffledArray()
        for (let i  = 0; i< 20;i++) {
            // 0 <= id <= 20
            let id = ids[i]
            let cardName = this.cardsName[Math.floor(i/2)]
            this.cards[id] = new Card(this, cardName,this.htmlCards[id], id)
        }
    }

    reset(){
        this.result.style.top = "-100%"
        for (let [idx, card] of Object.entries(this.cards)) {
            card.reset()
        }
        this.newGame()
    }

}
