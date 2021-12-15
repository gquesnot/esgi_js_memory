"use strict";

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

    cards = {};
    cardCouple = [];// [Card, Card]
    nbTry = 0;
    nbFound = 0;
    _isFrozen = false;
    constructor() {
        // init html elements
        this.htmlCards = document.querySelectorAll('li');
        this.htmlResult = document.querySelector(".result");

        //dblClick on result = reset
        this.htmlResult.addEventListener("dblclick", ()=>{this.reset()});
        this.loadImages();
        this.newGame();
    }


    loadImages(){
        let body = document.querySelector("body");

        for (let cardName of this.cardsName){
            let img = document.createElement("img");
            img.classList.add("hide");
            img.src = "img/persos/" + cardName + ".jpeg";
            body.append(img);

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
        if (this.nbFound === this.cardsName.length){
            document.querySelector(".result strong").innerHTML = this.nbTry.toString();
            this.htmlResult.style.top = "0%";
        }
    }

    newGame(){
        this.cards = {};
        this.cardCouple = [];
        this.nbTry = 0;
        this.nbFound = 0;
        this._isFrozen = false;

        // array of unique id from 0 to 20 shuffled
        let ids = this.getShuffledArray();
        for (let i  = 0; i< 20;i++) {
            let id = ids[i];
            //0,0,1,1,etc
            let cardName = this.cardsName[Math.floor(i/2)];
            this.cards[id] = new Card(this, cardName,this.htmlCards[id], id);
        }
    }

    reset(){
        this.htmlResult.style.top = "-100%";
        for (let [idx, card] of Object.entries(this.cards)) {
            card.flipCard();
        }
        this.newGame();
    }

}
