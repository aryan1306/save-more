import {MigrationInterface, QueryRunner} from "typeorm";

export class EditOfferTerms1612555065582 implements MigrationInterface {
    name = 'EditOfferTerms1612555065582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" ADD "OfferTerms" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "OfferTerms"`);
    }

}
