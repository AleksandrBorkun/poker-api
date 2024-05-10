export const compareHandsSchema = {
  hands: {
    exists: {
      errorMessage: 'hands is required property',
    },
    isArray: {
      bail: true,
      options: { min: 2, max: 2 },
      errorMessage: 'Only 2 hands are allowed',
    },
  },
  'hands.*': {
    isArray: {
      bail: true,
      options: { min: 5, max: 5 },
      errorMessage: 'Hand should have 5 cards',
    },
    custom: {
      options: (value) => {
        const uniqueValues = new Set(value.map((card) => `${card.type}-${card.value}`))
        return uniqueValues.size === value.length
      },
      errorMessage: 'Hand should have unique cards',
    },
  },
  'hands.*.*.type': {
    isIn: {
      options: [['HEARTS', 'DIAMONDS', 'CLUBS', 'SPADES']],
    },
  },
  'hands.*.*.value': {
    isIn: {
      options: [
        ['TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'JACK', 'QUEEN', 'KING', 'ACE'],
      ],
    },
  },
}
