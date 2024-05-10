import { Card, CARD_TYPE, CARD_VALUE } from '../../entities/Card'
import { Hand } from '../../entities/Hand'
import { POKER_RANK } from '../../entities/Ranks'
import { evaluateHandRank } from '../poker'

describe('evaluateHandRank', () => {
  let hand: Hand

  beforeEach(() => {
    hand = new Hand()
  })

  describe('check rank calculation', () => {
    it('should return STRAIGHT_FLUSH rank', () => {
      hand.addCard(new Card(CARD_TYPE.HEARTS, 10))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 11))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 12))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 13))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 14))

      const result = evaluateHandRank(hand)
      expect(result.rank).toBe(POKER_RANK.STRAIGHT_FLUSH)
    })

    it('should return STRAIGHT_FLUSH rank with low Ace', () => {
      hand.addCard(new Card(CARD_TYPE.HEARTS, 2))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 3))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 4))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 5))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 14))

      const result = evaluateHandRank(hand)
      expect(result.rank).toBe(POKER_RANK.STRAIGHT_FLUSH)
    })

    it('should return FOUR_OF_A_KIND rank', () => {
      hand.addCard(new Card(CARD_TYPE.HEARTS, 10))
      hand.addCard(new Card(CARD_TYPE.CLUBS, 10))
      hand.addCard(new Card(CARD_TYPE.DIAMONDS, 10))
      hand.addCard(new Card(CARD_TYPE.SPADES, 10))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 11))

      const result = evaluateHandRank(hand)
      expect(result.rank).toBe(POKER_RANK.FOUR_OF_A_KIND)
    })

    it('should return FULL_HOUSE rank', () => {
      hand.addCard(new Card(CARD_TYPE.HEARTS, 10))
      hand.addCard(new Card(CARD_TYPE.CLUBS, 10))
      hand.addCard(new Card(CARD_TYPE.DIAMONDS, 10))
      hand.addCard(new Card(CARD_TYPE.SPADES, 11))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 11))

      const result = evaluateHandRank(hand)
      expect(result.rank).toBe(POKER_RANK.FULL_HOUSE)
    })

    it('should return THREE_OF_A_KIND rank', () => {
      hand.addCard(new Card(CARD_TYPE.HEARTS, 10))
      hand.addCard(new Card(CARD_TYPE.CLUBS, 10))
      hand.addCard(new Card(CARD_TYPE.DIAMONDS, 10))
      hand.addCard(new Card(CARD_TYPE.SPADES, 11))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 12))

      const result = evaluateHandRank(hand)
      expect(result.rank).toBe(POKER_RANK.THREE_OF_A_KIND)
    })

    it('should return TWO_PAIR rank', () => {
      hand.addCard(new Card(CARD_TYPE.HEARTS, 10))
      hand.addCard(new Card(CARD_TYPE.CLUBS, 10))
      hand.addCard(new Card(CARD_TYPE.DIAMONDS, 11))
      hand.addCard(new Card(CARD_TYPE.SPADES, 11))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 12))

      const result = evaluateHandRank(hand)
      expect(result.rank).toBe(POKER_RANK.TWO_PAIR)
    })

    it('should return ONE_PAIR rank', () => {
      hand.addCard(new Card(CARD_TYPE.HEARTS, 10))
      hand.addCard(new Card(CARD_TYPE.CLUBS, 10))
      hand.addCard(new Card(CARD_TYPE.DIAMONDS, 11))
      hand.addCard(new Card(CARD_TYPE.SPADES, 12))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 13))

      const result = evaluateHandRank(hand)
      expect(result.rank).toBe(POKER_RANK.ONE_PAIR)
    })

    it('should return FLUSH rank', () => {
      hand.addCard(new Card(CARD_TYPE.HEARTS, 2))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 4))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 6))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 8))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 10))

      const result = evaluateHandRank(hand)
      expect(result.rank).toBe(POKER_RANK.FLUSH)
    })

    it('should return STRAIGHT rank', () => {
      hand.addCard(new Card(CARD_TYPE.HEARTS, 2))
      hand.addCard(new Card(CARD_TYPE.CLUBS, 3))
      hand.addCard(new Card(CARD_TYPE.DIAMONDS, 4))
      hand.addCard(new Card(CARD_TYPE.SPADES, 5))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 6))

      const result = evaluateHandRank(hand)
      expect(result.rank).toBe(POKER_RANK.STRAIGHT)
    })

    it('should return HIGH_CARD rank', () => {
      hand.addCard(new Card(CARD_TYPE.HEARTS, 2))
      hand.addCard(new Card(CARD_TYPE.CLUBS, 4))
      hand.addCard(new Card(CARD_TYPE.DIAMONDS, 6))
      hand.addCard(new Card(CARD_TYPE.SPADES, 8))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 10))

      const result = evaluateHandRank(hand)
      expect(result.rank).toBe(POKER_RANK.HIGH_CARD)
    })

    it('should return STRAIGHT rank with low Ace', () => {
      hand.addCard(new Card(CARD_TYPE.HEARTS, 2))
      hand.addCard(new Card(CARD_TYPE.CLUBS, 3))
      hand.addCard(new Card(CARD_TYPE.DIAMONDS, 4))
      hand.addCard(new Card(CARD_TYPE.SPADES, 5))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 14))

      const result = evaluateHandRank(hand)
      expect(result.rank).toBe(POKER_RANK.STRAIGHT)
    })
  })

  describe('check score calculation', () => {
    it('2 Aces should have higher score than 2 Kings', () => {
      hand.addCard(new Card(CARD_TYPE.HEARTS, 14))
      hand.addCard(new Card(CARD_TYPE.CLUBS, 14))
      hand.addCard(new Card(CARD_TYPE.DIAMONDS, 10))
      hand.addCard(new Card(CARD_TYPE.SPADES, 10))
      hand.addCard(new Card(CARD_TYPE.HEARTS, 10))

      const result = evaluateHandRank(hand)
      expect(result.score).toBeGreaterThan(POKER_RANK.ONE_PAIR * CARD_VALUE.KING)
    })
  })
})
