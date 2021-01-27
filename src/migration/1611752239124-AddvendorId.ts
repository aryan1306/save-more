import {MigrationInterface, QueryRunner} from "typeorm";

export class AddvendorId1611752239124 implements MigrationInterface {
    name = 'AddvendorId1611752239124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" ADD "vendorId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "vendorId"`);
    }

}
