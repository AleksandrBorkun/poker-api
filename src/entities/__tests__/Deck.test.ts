import { Deck } from '../Deck'

describe('Deck', () => {
  it('should generate a deck of 52 cards', () => {
    // Arrange
    const deck = new Deck()
    // Act
    const cards = deck.cards
    // Assert
    expect(cards.length).toBe(52)
  })

  it('should draw a card from the deck', () => {
    // Arrange
    const deck = new Deck()
    // Act
    const card = deck.drawCard()
    // Assert
    expect(card).toBeDefined()
    expect(deck.cards.length).toBe(51)
  })

  it('should shuffle the deck', () => {
    // Arrange
    const deck = new Deck()
    const originalDeck = [...deck.cards]
    // Act
    deck.shuffle()
    // Assert
    expect(deck.cards).not.toEqual(originalDeck)
  })
})
