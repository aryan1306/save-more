import { Offer } from "./Offer";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Vendor extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  VendorId: string;

  @Field()
  @Column()
  OrganizationName: string;

  @Field()
  @Column()
  VendorName: string;

  @Field()
  @Column("text")
  Address: string;

  @Field()
  @Column()
  AddressURL: string;

  @Field()
  @Column()
  City: string;

  @Field()
  @Column("varchar", { length: 255, unique: true })
  OrganizationEmail: string;

  @Field()
  @Column("varchar", { length: 10, unique: true })
  OrganizationPhone: string;

  @Column("text")
  Password: string;

  @Column({ default: false })
  isPartner: boolean;

  @Field()
  @Column({ nullable: true })
  VendorCode: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  isVerified: boolean;

  @OneToMany(() => Offer, (offer) => offer.vendor)
  offers: Offer[];
}
