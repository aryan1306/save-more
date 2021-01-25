import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateVendorEntity1611512391665 implements MigrationInterface {
    name = 'CreateVendorEntity1611512391665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vendor" ("VendorId" uuid NOT NULL DEFAULT uuid_generate_v4(), "OrganizationName" character varying NOT NULL, "VendorName" character varying NOT NULL, "Address" text NOT NULL, "AddressURL" character varying NOT NULL, "City" character varying NOT NULL, "OrganizationEmail" character varying(255) NOT NULL, "OrganizationPhone" character varying(10) NOT NULL, "Password" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "isVerified" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_2cdb917d46d2d6728f242666686" UNIQUE ("OrganizationEmail"), CONSTRAINT "UQ_0303e9caa842586ef8b0b742438" UNIQUE ("OrganizationPhone"), CONSTRAINT "PK_8ef4b4e318192240779fd2bca4c" PRIMARY KEY ("VendorId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vendor"`);
    }

}
