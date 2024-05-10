import { Card, CARD_TYPE } from '../../entities/Card'
import { Deck } from '../../entities/Deck'
import { Hand } from '../../entities/Hand'
import { Poker } from '../Poker'

describe('Poker', () => {
  let hand1: Hand
  let hand2: Hand
  const poker = new Poker()

  beforeEach(() => {
    hand1 = new Hand()
    hand2 = new Hand()
  })
  describe('evaluate', () => {
    it('should return hand index with higher rank', () => {
      // Generate a hand with TWO_PAIR rank
      hand1.addCard(new Card(CARD_TYPE.HEARTS, 10))
      hand1.addCard(new Card(CARD_TYPE.CLUBS, 10))
      hand1.addCard(new Card(CARD_TYPE.DIAMONDS, 11))
      hand1.addCard(new Card(CARD_TYPE.SPADES, 11))
      hand1.addCard(new Card(CARD_TYPE.HEARTS, 12))

      // Generate a hand with ONE_PAIR rank
      hand2.addCard(new Card(CARD_TYPE.HEARTS, 10))
      hand2.addCard(new Card(CARD_TYPE.CLUBS, 10))
      hand2.addCard(new Card(CARD_TYPE.DIAMONDS, 11))
      hand2.addCard(new Card(CARD_TYPE.SPADES, 12))
      hand2.addCard(new Card(CARD_TYPE.HEARTS, 13))

      const result = poker.evaluate([hand1, hand2])
      expect(result).toBe(0)
    })

    it('should return hand index with higher score when both hands have the same rank', () => {
      // generate hand with low Ace STRAIGHT_FLUSH
      hand1.addCard(new Card(CARD_TYPE.HEARTS, 2))
      hand1.addCard(new Card(CARD_TYPE.HEARTS, 3))
      hand1.addCard(new Card(CARD_TYPE.HEARTS, 4))
      hand1.addCard(new Card(CARD_TYPE.HEARTS, 5))
      hand1.addCard(new Card(CARD_TYPE.HEARTS, 14))

      // generate hand with high Ace STRAIGHT_FLUSH
      hand2.addCard(new Card(CARD_TYPE.CLUBS, 10))
      hand2.addCard(new Card(CARD_TYPE.CLUBS, 11))
      hand2.addCard(new Card(CARD_TYPE.CLUBS, 12))
      hand2.addCard(new Card(CARD_TYPE.CLUBS, 13))
      hand2.addCard(new Card(CARD_TYPE.CLUBS, 14))

      const result = poker.evaluate([hand1, hand2])
      expect(result).toBe(1)
    })

    it('should return -1 when both hands have the same rank and score', () => {
      // generate hand with low Ace STRAIGHT_FLUSH
      hand1.addCard(new Card(CARD_TYPE.HEARTS, 2))
      hand1.addCard(new Card(CARD_TYPE.HEARTS, 3))
      hand1.addCard(new Card(CARD_TYPE.HEARTS, 4))
      hand1.addCard(new Card(CARD_TYPE.HEARTS, 5))
      hand1.addCard(new Card(CARD_TYPE.HEARTS, 14))

      // generate hand with low Ace STRAIGHT_FLUSH
      hand2.addCard(new Card(CARD_TYPE.CLUBS, 2))
      hand2.addCard(new Card(CARD_TYPE.CLUBS, 3))
      hand2.addCard(new Card(CARD_TYPE.CLUBS, 4))
      hand2.addCard(new Card(CARD_TYPE.CLUBS, 5))
      hand2.addCard(new Card(CARD_TYPE.CLUBS, 14))

      const result = poker.evaluate([hand1, hand2])
      expect(result).toBe(-1)
    })

    it('should return index of the hand with the best highest card', () => {
      // generate hand with TWO_PAIR rank
      hand1.addCard(new Card(CARD_TYPE.HEARTS, 10))
      hand1.addCard(new Card(CARD_TYPE.CLUBS, 10))
      hand1.addCard(new Card(CARD_TYPE.DIAMONDS, 11))
      hand1.addCard(new Card(CARD_TYPE.SPADES, 11))
      hand1.addCard(new Card(CARD_TYPE.HEARTS, 12))

      // generate hand with TWO_PAIR rank
      hand2.addCard(new Card(CARD_TYPE.HEARTS, 10))
      hand2.addCard(new Card(CARD_TYPE.CLUBS, 10))
      hand2.addCard(new Card(CARD_TYPE.DIAMONDS, 11))
      hand2.addCard(new Card(CARD_TYPE.SPADES, 11))
      hand2.addCard(new Card(CARD_TYPE.HEARTS, 13))

      const result = poker.evaluate([hand1, hand2])
      expect(result).toBe(1)
    })

    it('should throw an error when there is less than 2 hands', () => {
      expect(() => poker.evaluate([hand1])).toThrow('Poker game requires at least 2 hands')
    })

    it('should throw an error when there is more than 2 hands', () => {
      expect(() => poker.evaluate([hand1, hand2, hand1])).toThrow('Not implemented yet for more than 2 hands')
    })
  })

  describe('generateHand', () => {
    it('should generate a hand with 5 unique cards', () => {
      const deck = new Deck()
      const hand = poker.generateHand(deck)
      const uniqueCards = new Set(hand.cards)
      expect(uniqueCards.size).toBe(5)
      expect(deck.cards.length).toBe(47)
    })
  })
})
