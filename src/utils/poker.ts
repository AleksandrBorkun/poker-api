import { Hand } from '../entities/Hand'
import { POKER_RANK } from '../entities/Ranks'

export const evaluateHandRank = (hand: Hand): { rank: POKER_RANK; score: number } => {
  if (hand.cards.length !== 5) throw new Error('Hand must have 5 cards')
  hand.sort() // sort card before evaluating

  const cards = hand.cards

  let isStraight = true,
    isFlush = true,
    combinations = hand.combinations,
    rank = POKER_RANK.HIGH_CARD,
    score = rank * cards[4].value

  for (let i = 0; i < cards.length; i++) {
    const prev = cards[i - 1]
    const current = cards[i]

    // check for straight
    if (prev && current.value !== prev.value + 1) {
      // check for exception with low Ace
      if (i === 4 && current.value === 14 && prev.value === 5) {
        hand.swapFirstAndLast() // swap Ace and Two since Ace is low
        isStraight = isStraight // make sure we not rewrite the value
      } else {
        isStraight = false
      }
    }

    // check for flush
    if (prev && current.type !== prev.type) {
      isFlush = false
    }
  }

  if (isStraight) {
    rank = POKER_RANK.STRAIGHT
    if (isFlush) rank = POKER_RANK.STRAIGHT_FLUSH
    return { rank, score: cards[4].value * rank }
  }

  for (let [value, count] of combinations) {
    if (count === 4) {
      rank = POKER_RANK.FOUR_OF_A_KIND
      score = rank * value
      break
    }
    if (count === 3) {
      if (rank === POKER_RANK.ONE_PAIR) {
        rank = POKER_RANK.FULL_HOUSE
        score = calculateFullHouseScore(value, score / POKER_RANK.ONE_PAIR)
      } else {
        rank = POKER_RANK.THREE_OF_A_KIND
        score = value * rank
      }
    }
    if (count === 2) {
      if (rank === POKER_RANK.ONE_PAIR) {
        const prevValue = score / POKER_RANK.ONE_PAIR
        rank = POKER_RANK.TWO_PAIR
        score = calculateTwoPairScore(prevValue, value)
      } else if (rank === POKER_RANK.THREE_OF_A_KIND) {
        rank = POKER_RANK.FULL_HOUSE
        const threeOfKind = score / POKER_RANK.THREE_OF_A_KIND
        score = calculateFullHouseScore(threeOfKind, score / POKER_RANK.ONE_PAIR)
      } else {
        rank = POKER_RANK.ONE_PAIR
        score = value * rank
      }
    }
  }

  // check for flush
  if (isFlush && rank < POKER_RANK.FLUSH) {
    rank = POKER_RANK.FLUSH
    score = cards[4].value * rank
  }

  return { rank, score }
}

export const calculateTwoPairScore = (prevValue: number, value: number): number => {
  if (prevValue < value) return calculateTwoPairScore(value, prevValue) // make sure the highest pair is first

  return prevValue * POKER_RANK.TWO_PAIR * 100 + value
}

export const calculateFullHouseScore = (threeOfKindValue: number, pairValue: number): number => {
  return threeOfKindValue * POKER_RANK.FULL_HOUSE * 100 + pairValue
}
