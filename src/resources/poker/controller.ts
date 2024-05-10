import { NextFunction, Request, Response } from 'express'
import logger from '../../common/logger'
import { Deck } from '../../entities/Deck'
import { Hand } from '../../entities/Hand'
import { Poker } from '../../games/Poker'

const { validationResult } = require('express-validator')

const poker = new Poker()

export const getHands = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deck = new Deck()

    const hands = [poker.generateHand(deck), poker.generateHand(deck)].map((hand) => hand.cards)

    res.status(200).json({ hands })
  } catch (error) {
    next(error)
  }
}

export const compareHands = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req)
    // if there is error then return Error
    if (!errors.isEmpty()) {
      logger.error(errors.array()[0]?.msg || errors.array()[0])
      return res.status(400).json({
        success: false,
        errors: errors.array()[0]?.msg || errors.array()[0],
      })
    }

    const hands = req.body.hands
    let hand1 = new Hand(hands[0])
    let hand2 = new Hand(hands[1])

    const result = poker.evaluate([hand1, hand2])
    if (result === 0) {
      res.status(200).json({ message: 'Hand 1 wins' })
    }
    if (result === 1) {
      res.status(200).json({ message: 'Hand 2 wins' })
    }
    if (result === -1) {
      res.status(200).json({ message: 'It is a tie' })
    }
  } catch (error) {
    next(error)
  }
}
