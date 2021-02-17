import {MigrationInterface, QueryRunner} from "typeorm";

export class changeVIdinOffer1613368785850 implements MigrationInterface {
    name = 'changeVIdinOffer1613368785850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "vendorId"`);
        await queryRunner.query(`ALTER TABLE "offer" ADD "vendorId" uuid NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "vendorId"`);
        await queryRunner.query(`ALTER TABLE "offer" ADD "vendorId" character varying NOT NULL`);
    }

}
