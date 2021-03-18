import { Request, Response } from "express";
import { Agent } from '../database';

export const signUp = async (req: Request, res: Response) => {
  
  try {
    const newAgent = await Agent.create(req.body);

    return res.status(201).json({
      msg: 'Agent created successfully',
      agent: newAgent
    })

    
  } catch(err) {
    
    if (err.errors) {
      const error = err.errors[0];

      return res.status(400).json({
        error: {
          msg: error.message
        }
      })
    }

    console.log(err);

    return res.status(500).json('Internal Server Error');
  }
  
}

export const signIn = async (req: Request, res: Response) => {
  
}

export const getAllAgents = async (req: Request, res: Response) => {

  try {

    const agents = await Agent.findAll();

    res.status(200).json({
      agents
    })

  } catch(err) {
    console.log(err);
    res.status(500).json('Internal Server Error');
  }
}