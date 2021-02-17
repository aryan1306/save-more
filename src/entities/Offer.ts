import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vendor } from "./Vendor";

@ObjectType()
@Entity()
export class Offer extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  OfferId: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  offerType: string;

  @Field()
  @Column({ type: "timestamp" })
  ValidFrom: Date;

  @Field({ nullable: true })
  @Column({ type: "timestamp", nullable: true })
  ValidTo: Date;

  @Field()
  @Column({ nullable: true })
  discountValue: number;

  @Field()
  @Column()
  category: string;

  @Field()
  @Column({ nullable: true })
  OfferCode: string;

  @Field(() => [String])
  @Column("text", { array: true })
  ValidCities: string[];

  @Field(() => [String], { nullable: true })
  @Column("text", { array: true, nullable: true })
  BranchAddress: string[];

  @Field()
  @Column("uuid")
  vendorId: string;

  @Field()
  @Column("text", { nullable: true })
  OfferTerms: string;

  @Field()
  @ManyToOne(() => Vendor, (vendor) => vendor.offers)
  vendor: Vendor;
}
