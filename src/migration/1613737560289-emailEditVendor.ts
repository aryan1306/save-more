import {MigrationInterface, QueryRunner} from "typeorm";

export class emailEditVendor1613737560289 implements MigrationInterface {
    name = 'emailEditVendor1613737560289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "vendor"."OrganizationEmail" IS NULL`);
        await queryRunner.query(`ALTER TABLE "vendor" DROP CONSTRAINT "UQ_2cdb917d46d2d6728f242666686"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendor" ADD CONSTRAINT "UQ_2cdb917d46d2d6728f242666686" UNIQUE ("OrganizationEmail")`);
        await queryRunner.query(`COMMENT ON COLUMN "vendor"."OrganizationEmail" IS NULL`);
    }

}
