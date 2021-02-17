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
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column("varchar", { length: 255, unique: true })
  email: string;

  @Field()
  @Column("varchar", { length: 10, unique: true })
  phone: string;

  @Column("text")
  password: string;

  @Field()
  @Column({ default: false })
  isPrime: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @Column("timestamp", { nullable: true })
  expiresAt: Date;

  @Column({ default: false })
  isVerified: boolean;
}
