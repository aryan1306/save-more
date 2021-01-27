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
  @Column({ type: "timestamp" })
  ValidFrom: Date;

  @Field()
  @Column({ type: "timestamp", nullable: true })
  ValidTo: Date;

  @Field()
  @Column()
  category: string;

  @Field()
  @Column({ nullable: true })
  OfferCode: string;

  @Field(() => [String])
  @Column("text", { array: true })
  ValidCities: string[];

  @Field(() => [String])
  @Column("text", { array: true })
  OfferTerms: string[];

  @Field()
  @Column()
  vendorId: string;

  @ManyToOne(() => Vendor, (vendor) => vendor.offers)
  vendor: Vendor;
}
