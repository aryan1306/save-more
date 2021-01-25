import {MigrationInterface, QueryRunner} from "typeorm";

export class EditVendorandCreateAgent1611551197677 implements MigrationInterface {
    name = 'EditVendorandCreateAgent1611551197677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "agent" ("AgentId" uuid NOT NULL DEFAULT uuid_generate_v4(), "AgentName" character varying NOT NULL, "AgentCode" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_33c260faf455a7cb32534ab2769" PRIMARY KEY ("AgentId"))`);
        await queryRunner.query(`ALTER TABLE "vendor" ADD "isPartner" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "vendor" ADD "VendorCode" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendor" DROP COLUMN "VendorCode"`);
        await queryRunner.query(`ALTER TABLE "vendor" DROP COLUMN "isPartner"`);
        await queryRunner.query(`DROP TABLE "agent"`);
    }

}
