import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Agent } from '../database';
import { AgentAttributes } from '../database/models/agents';
import config from '../config/config';

export default {
  signUp,
  signIn,
  getAllAgents
}

async function signUp(newAgentData: any) {

  const newAgentInstance = await Agent.create(newAgentData);

  const { password, ...newAgent } = newAgentInstance.get();

  return newAgent;


}

async function signIn({ email, reqPass }: { email: string; reqPass: string; }) {

  if (!email || !reqPass) {
    return;
  }

  const agent = await Agent.findOne({ where: { email } });

  if (!agent) {
    return;
  }

  const { password, ...agentResponse } = agent.get();

  const isPasswordValid = await comparePassword(reqPass, password);

  if (!isPasswordValid) {
    return;
  }

  const token = createToken(agent.get());

  return {
    agent: agentResponse,
    token
  }
}

async function getAllAgents() {

  const agents = await Agent.findAll({
    attributes: ["password", "id", "firstname", "lastname", "email", "phone", "state", "role", "address", "createdAt", "updatedAt"]
  });

  return agents;
}

const comparePassword = async (requestPassword: string, agentPassword: string) => {
  return await bcrypt.compare(requestPassword, agentPassword);
}

const createToken = (agent: AgentAttributes) => {
  return jwt.sign({ id: agent.id, role: agent.role }, config.jwtSecret, {
    expiresIn: 28800
  });
}