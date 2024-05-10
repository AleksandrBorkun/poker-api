import { Request, Response } from 'express'

const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).send({
    error: `unknown endpoint\nplease use "/v1/poker/get-hands" to get random cards combination for 2 hands\nor "v1/poker/compare-hands" to check for the winning hand`,
  })
}

export default unknownEndpoint
