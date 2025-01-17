import { NextFunction, Request, Response } from 'express'

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  // if user is authenticated in the session, carry on

  if (req.isAuthenticated()) {
    //console.log(req.user)
    return next()
  }

  // if they aren't redirect them to the home page
  res.redirect('/')
}
