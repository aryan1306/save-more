import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Agent extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  AgentId: string;

  @Field()
  @Column()
  AgentName: string;

  @Field()
  @Column()
  AgentCode: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
