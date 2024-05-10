import { Card, CARD_TYPE, CARD_VALUE } from './Card'

export class Deck {
  cards: Card[]
  constructor() {
    this.cards = []

    // generates new set of cards
    for (let type in CARD_TYPE) {
      if (!isNaN(parseInt(type))) continue // skip the number keys due to enum nature in TS
      for (let value in CARD_VALUE) {
        if (!isNaN(parseInt(value))) continue
        this.cards.push(new Card(type as CARD_TYPE, value as unknown as CARD_VALUE)) // yeah, TS is not perfect :D
      }
    }
  }

  addCard(card: Card) {
    this.cards.push(card)
  }

  drawCard() {
    return this.cards.pop()
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
    }
  }
}
