import { NextFunction, Request, Response } from "express";
import agentServices from '../services/agent.service';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {

  try {

    const newAgent = await agentServices.signUp(req.body);

    return res.status(201).json({
      msg: 'Agent created successfully',
      agent: newAgent
    })

  } catch (err) {

    next(err)
  }

}

export const signIn = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const user = await agentServices.signIn({ email: req.body.email, reqPass: req.body.password });

    if (user) {

      return res.header('auth-token', user.token).json({
        agent: user.agent,
        token: user.token
      });
      
    } else {
      return res.status(400).json({
        message: 'Email or password incorrect'
      })
    }
  } catch (err) {
    next(err)
  }
}

export const getAllAgents = async (req: Request, res: Response, next: NextFunction) => {

  try {

    const agents = await agentServices.getAllAgents();

    if (agents) {
      res.status(200).json({
        agents
      })
    }

  } catch (err) {
    next(err)
  }
}