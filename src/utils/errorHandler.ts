import { Request, Response, NextFunction } from "express";

export function errorHandler(err, req: Request, res: Response, next: NextFunction) {

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({ message: 'Invalid Token' });
  }

  if (err.parent) {
    return res.status(400).json({
      error: {
        msg: err.parent.detail
      }
    })
  }

  if (err.errors) {
    const error = err.errors[0];

    if (error.message && error.message === 'Validation isIn on role failed') {
      return res.status(400).json({
        error: {
          msg: 'Invalid Role'
        }
      })
    }


    return res.status(400).json({
      error: {
        msg: 'chequear'
      }
    })    
    
  }
  console.log(err)
  // default to 500 server error
  return res.status(500).json({ message: 'Internal server error' });
}