import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1614181774282 implements MigrationInterface {
    name = 'Initial1614181774282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "agent" ("AgentId" uuid NOT NULL DEFAULT uuid_generate_v4(), "AgentName" character varying NOT NULL, "AgentCode" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_33c260faf455a7cb32534ab2769" PRIMARY KEY ("AgentId"))`);
        await queryRunner.query(`CREATE TABLE "vendor" ("VendorId" uuid NOT NULL DEFAULT uuid_generate_v4(), "OrganizationName" character varying NOT NULL, "VendorName" character varying NOT NULL, "Address" text NOT NULL, "City" character varying NOT NULL, "OrganizationEmail" character varying(255) NOT NULL, "OrganizationPhone" character varying(10) NOT NULL, "Password" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "isVerified" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_0303e9caa842586ef8b0b742438" UNIQUE ("OrganizationPhone"), CONSTRAINT "PK_8ef4b4e318192240779fd2bca4c" PRIMARY KEY ("VendorId"))`);
        await queryRunner.query(`CREATE TABLE "offer" ("OfferId" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "offerType" character varying NOT NULL, "ValidFrom" TIMESTAMP NOT NULL, "ValidTo" TIMESTAMP, "discountValue" integer, "category" character varying NOT NULL, "imgURL" text, "OfferCode" character varying, "ValidCities" text array NOT NULL, "vendorId" uuid NOT NULL, "OfferTerms" text, "vendorVendorId" uuid, CONSTRAINT "PK_eb467cd3d04b97c9aabb1427fca" PRIMARY KEY ("OfferId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(10) NOT NULL, "password" text NOT NULL, "isPrime" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "expiresAt" TIMESTAMP, "isVerified" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_3778d5e837aa39189c4369fab74" FOREIGN KEY ("vendorVendorId") REFERENCES "vendor"("VendorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_3778d5e837aa39189c4369fab74"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "offer"`);
        await queryRunner.query(`DROP TABLE "vendor"`);
        await queryRunner.query(`DROP TABLE "agent"`);
    }

}
