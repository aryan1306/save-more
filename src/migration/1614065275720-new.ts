import {MigrationInterface, QueryRunner} from "typeorm";

export class new1614065275720 implements MigrationInterface {
    name = 'new1614065275720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendor" DROP COLUMN "isExpired"`);
        await queryRunner.query(`ALTER TABLE "vendor" DROP COLUMN "VendorCode"`);
        await queryRunner.query(`ALTER TABLE "vendor" DROP COLUMN "expiresAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendor" ADD "expiresAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vendor" ADD "VendorCode" character varying`);
        await queryRunner.query(`ALTER TABLE "vendor" ADD "isExpired" boolean NOT NULL DEFAULT true`);
    }

}
