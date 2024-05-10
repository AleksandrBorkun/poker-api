import { Deck } from '../entities/Deck'
import { Hand } from '../entities/Hand'

export abstract class BaseGame {
  /**
   * Evaluate the hands and return the winner
   * @param hands of @type Hand[]
   * @returns the index of the winning hand
   **/
  abstract evaluate(hands: Hand[]): number

  /**
   * Generate a hand from the deck
   * @param deck of @type Deck
   * @returns a hand of @type Hand
   **/
  abstract generateHand(deck: Deck): Hand
}
