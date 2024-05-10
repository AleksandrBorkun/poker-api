import supertest from 'supertest'
import app from '../../src/app'

const request = supertest(app)

describe('Checking the health of the app', () => {
  test('It should respond with a health check message', async () => {
    const response = await request.get('/')
    expect(response.body).toEqual({ 'health-check': 'OK: top level api working' })
    expect(response.status).toBe(200)
  })

  test('should return 2 hands with 5 cards each', async () => {
    const response = await request.get('/v1/poker/get-hands')
    expect(response.status).toBe(200)

    expect(response.body.hands.length).toBe(2)
    expect(response.body.hands[0].length).toBe(5)
    expect(response.body.hands[1].length).toBe(5)
  })

  test("should return 'Hand 1 wins' when hand 1 has a higher rank", async () => {
    const response = await request.post('/v1/poker/compare-hands').send({
      hands: [
        [
          { type: 'HEARTS', value: 'TEN' },
          { type: 'CLUBS', value: 'TEN' },
          { type: 'DIAMONDS', value: 'JACK' },
          { type: 'SPADES', value: 'JACK' },
          { type: 'HEARTS', value: 'QUEEN' },
        ],
        [
          { type: 'HEARTS', value: 'TEN' },
          { type: 'CLUBS', value: 'TEN' },
          { type: 'DIAMONDS', value: 'JACK' },
          { type: 'SPADES', value: 'QUEEN' },
          { type: 'HEARTS', value: 'KING' },
        ],
      ],
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Hand 1 wins' })
  })

  test("should return 'Hand 2 wins' when hand 2 has a higher rank", async () => {
    const response = await request.post('/v1/poker/compare-hands').send({
      hands: [
        [
          { type: 'HEARTS', value: 'TEN' },
          { type: 'CLUBS', value: 'TEN' },
          { type: 'DIAMONDS', value: 'JACK' },
          { type: 'SPADES', value: 'QUEEN' },
          { type: 'HEARTS', value: 'KING' },
        ],
        [
          { type: 'HEARTS', value: 'TEN' },
          { type: 'CLUBS', value: 'TEN' },
          { type: 'DIAMONDS', value: 'JACK' },
          { type: 'SPADES', value: 'JACK' },
          { type: 'HEARTS', value: 'QUEEN' },
        ],
      ],
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Hand 2 wins' })
  })

  test("should return 'It is a tie' when both hands have the same rank", async () => {
    const response = await request.post('/v1/poker/compare-hands').send({
      hands: [
        [
          { type: 'HEARTS', value: 'TEN' },
          { type: 'CLUBS', value: 'TEN' },
          { type: 'DIAMONDS', value: 'JACK' },
          { type: 'SPADES', value: 'JACK' },
          { type: 'HEARTS', value: 'QUEEN' },
        ],
        [
          { type: 'HEARTS', value: 'TEN' },
          { type: 'CLUBS', value: 'TEN' },
          { type: 'DIAMONDS', value: 'JACK' },
          { type: 'SPADES', value: 'JACK' },
          { type: 'HEARTS', value: 'QUEEN' },
        ],
      ],
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'It is a tie' })
  })

  test('should return 400 when hands are not provided', async () => {
    const response = await request.post('/v1/poker/compare-hands').send({})
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ success: false, errors: 'hands is required property' })
  })

  test("should return 400 when hands don't have 5 cards", async () => {
    const response = await request.post('/v1/poker/compare-hands').send({
      hands: [
        [
          { type: 'HEARTS', value: 'TEN' },
          { type: 'CLUBS', value: 'TEN' },
          { type: 'DIAMONDS', value: 'JACK' },
          { type: 'SPADES', value: 'JACK' },
        ],
        [
          { type: 'HEARTS', value: 'TEN' },
          { type: 'CLUBS', value: 'TEN' },
          { type: 'DIAMONDS', value: 'JACK' },
          { type: 'SPADES', value: 'JACK' },
          { type: 'HEARTS', value: 'QUEEN' },
          { type: 'HEARTS', value: 'QUEEN' },
        ],
      ],
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ success: false, errors: 'Hand should have 5 cards' })
  })

  test("should return 400 when hands don't have unique cards", async () => {
    const response = await request.post('/v1/poker/compare-hands').send({
      hands: [
        [
          { type: 'HEARTS', value: 'TEN' },
          { type: 'HEARTS', value: 'TEN' },
          { type: 'DIAMONDS', value: 'JACK' },
          { type: 'SPADES', value: 'JACK' },
          { type: 'HEARTS', value: 'JACK' },
        ],
        [
          { type: 'HEARTS', value: 'TEN' },
          { type: 'CLUBS', value: 'TEN' },
          { type: 'DIAMONDS', value: 'JACK' },
          { type: 'SPADES', value: 'JACK' },
          { type: 'HEARTS', value: 'QUEEN' },
        ],
      ],
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ success: false, errors: 'Hand should have unique cards' })
  })
})
