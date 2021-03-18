import { BuildOptions, Model, ModelDefined, Optional, Sequelize } from "sequelize";
export declare const roles: readonly ["manager", "advisor"];
export declare type Roles = typeof roles[number];
export interface AgentAttributes {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    state: string;
    city: string;
    role: Roles;
    address: string;
    createdAt: Date;
    updatedAt?: Date;
}
export interface AgentCreationAttributes extends Optional<AgentAttributes, 'id'> {
}
export declare class AgentModel extends Model<AgentAttributes> implements AgentAttributes {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    state: string;
    city: string;
    role: Roles;
    address: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export declare type AgentStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): AgentModel;
};
export declare function AgentFactory(sequelize: Sequelize): ModelDefined<AgentAttributes, AgentCreationAttributes>;
//# sourceMappingURL=agents.d.ts.map