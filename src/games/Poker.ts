import { Deck } from '../entities/Deck'
import { Hand } from '../entities/Hand'
import { evaluateHandRank } from '../utils/poker'
import { BaseGame } from './BaseGame'

export class Poker extends BaseGame {
  evaluate(hands: Hand[]): number {
    if (hands.length < 2) throw new Error('Poker game requires at least 2 hands')
    if (hands.length > 2) throw new Error('Not implemented yet for more than 2 hands')
    return this.evaluateTwoHands(hands)
  }

  generateHand(deck: Deck): Hand {
    deck.shuffle()
    const hand = new Hand()
    for (let i = 0; i < 5; i++) {
      hand.addCard(deck.drawCard())
    }
    return hand
  }

  private evaluateTwoHands(hands: Hand[]): number {
    if (hands.length !== 2) throw new Error('Can only evaluate 2 hands at a time')

    const hand1Rank = evaluateHandRank(hands[0])
    const hand2Rank = evaluateHandRank(hands[1])

    if (hand1Rank.rank > hand2Rank.rank) return 0
    if (hand1Rank.rank < hand2Rank.rank) return 1

    // if both hands have the same rank, compare the score
    if (hand1Rank.score > hand2Rank.score) return 0
    if (hand1Rank.score < hand2Rank.score) return 1

    // if both hands have the same rank and score
    return this.getBestHighestCardHand(hands[0], hands[1])
  }

  private getBestHighestCardHand(hand1: Hand, hand2: Hand): number {
    const hand1Cards = hand1.cards.filter((card) => hand1.combinations.get(card.value) === 1)
    const hand2Cards = hand2.cards.filter((card) => hand2.combinations.get(card.value) === 1)

    if (hand1Cards.length !== hand2Cards.length)
      throw new Error('Ooops, something went wrong! Probably hands has different ranks')

    for (let i = hand1Cards.length - 1; i >= 0; i--) {
      if (hand1Cards[i].value > hand2Cards[i].value) return 0
      if (hand1Cards[i].value < hand2Cards[i].value) return 1
    }
    return -1
  }
}
