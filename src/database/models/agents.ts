import { BuildOptions, DataTypes, Model, ModelDefined, Optional, Sequelize } from "sequelize";
import bcrypt from 'bcrypt';

const states = [
  "Amazonas", "Anzoátegui", "Apure", "Aragua", 
  "Barinas", "Bolívar", "Carabobo", "Cojedes", 
  "Delta Amacuro", "Falcón", "Guárico", "Lara", 
  "Mérida", "Miranda", "Monagas", "Nueva Esparta", 
  "Portuguesa", "Sucre", "Táchira", "Trujillo", 
  "Vargas", "Yaracuy", "Zulia"];

export const roles = ['manager', 'advisor'] as const;
export type Roles = typeof roles[number];

export interface AgentAttributes {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  state: string;
  role: Roles;
  address: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface AgentCreationAttributes extends Optional<AgentAttributes, 'id'> {};

export class AgentModel extends Model<AgentAttributes> implements AgentAttributes {
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public email!: string;
  public password!: string;
  public phone!: string;
  public state!: string;
  public role!: Roles;
  public address!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export type AgentStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): AgentModel;
};

export function AgentFactory(sequelize: Sequelize) {
  
  const agent: ModelDefined<AgentAttributes, AgentCreationAttributes> = sequelize.define('agent', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        isAlpha: true,
        notNull: true,
        notEmpty: true
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        isAlpha: true,
        notNull: true,
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notNull: true,

      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        isNumeric: true
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notNull: true,
        isIn: [states]
      }

    },
    role: {
      type: DataTypes.ENUM,
      values: roles,
      allowNull: false,
      unique: false,
      validate: {
        notNull: true,
        isIn: [roles]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notNull: true,
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  }, {
    tableName: 'agents',
    hooks: {
      beforeSave: async (agent: AgentModel, options) => {

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(agent.password, salt);

        agent.password = hash;
      }
    },
  });

  return agent;

}