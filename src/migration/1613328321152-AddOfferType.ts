import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOfferType1613328321152 implements MigrationInterface {
    name = 'AddOfferType1613328321152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" ADD "offerType" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "offerType"`);
    }

}
