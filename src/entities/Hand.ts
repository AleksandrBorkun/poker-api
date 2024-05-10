import { Card } from './Card'

export class Hand {
  readonly cards: Card[]
  readonly combinations: Map<number, number>

  constructor(cards: Card[] = []) {
    this.cards = []
    this.combinations = new Map()
    for (const card of cards) {
      this.addCard(new Card(card.type, card.value))
    }
  }

  sort() {
    this.cards.sort((a, b) => a.value - b.value)
  }

  swapFirstAndLast() {
    ;[this.cards[0], this.cards[4]] = [this.cards[4], this.cards[0]]
  }

  addCard(card: Card) {
    this.cards.push(card)
    this.sort()
    this.combinations.set(card.value, (this.combinations.get(card.value) || 0) + 1)
  }
}
