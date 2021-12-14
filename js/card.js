import {sleep} from "./util.js";

export class Card {
    constructor(game, name, htmlElem, id) {
        this.id = id
        this.game = game
        this.name = name
        this.htmlElem = htmlElem
        this.selected = false

        this.htmlElem.addEventListener("click", () => {
            this.select()
        })
    }


    select() {
        if (this.game.isFrozen || this.htmlElem.classList.contains("flipped") || this.selected)
            return

        this.flipCard()
        this.selected  = true
        if (this.game.cardCouple.length < 2) {
            this.game.cardCouple.push(this)
        }
        if (this.game.cardCouple.length === 2) {

            let match = this.game.cardCouple[0].name === this.game.cardCouple[1].name
            let cards = this.game.cardCouple
            this.game.cardCouple = []
            this.game.nbTry++
            if (match)
                this.game.nbFound++
            else {
                this.game.isFrozen = true
                sleep(2000).then(() => {
                    cards[0].unSelect()
                    cards[1].unSelect()
                    this.game.isFrozen = false
                })
            }
            this.game.checkWin()

        }
    }

    unSelect(){
        this.flipCard()
        this.selected = false

    }

    flipCard() {
        this.htmlElem.classList.toggle('flipped')
        sleep(300).then(() => {
            this.htmlElem.style.background = this.htmlElem.classList.contains("flipped") ? "url(img/persos/" + this.name + ".jpeg) center / cover no-repeat" : ""
        })
    }

    reset() {
        this.flipCard()
    }
}
