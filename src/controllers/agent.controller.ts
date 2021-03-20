import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Agent } from '../database';
import { AgentAttributes } from '../database/models/agents';
import config from '../config/config';

const createToken = (agent: AgentAttributes) => {
  return jwt.sign({id: agent.id}, config.jwtSecret, {
    expiresIn: 28800
  });
}

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

  if (!req.body.email || !req.body.password) {
    return res.status(400).json({msg: 'Please send your email and password'});
  }

  const agent = await Agent.findOne({where: { email: req.body.email } });

  if (!agent) {
    return res.status(400).json({ msg: 'Invalid user or password' });
  }

  const { password, ...agentResponse } = agent.get();

  const isPasswordValid = await comparePassword(req.body.password, password);

  if (!isPasswordValid) {
    return res.status(400).json({ msg: 'Invalid user or password' });
  }

  const token = createToken(agent.get());

  return res.status(200).json({
    agent: agentResponse,
    token
  })

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

const comparePassword = async (requestPassword: string, agentPassword: string) => {
  return await bcrypt.compare(requestPassword, agentPassword);
}