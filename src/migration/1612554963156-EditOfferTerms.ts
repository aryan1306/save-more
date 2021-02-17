import {MigrationInterface, QueryRunner} from "typeorm";

export class EditOfferTerms1612554963156 implements MigrationInterface {
    name = 'EditOfferTerms1612554963156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "OfferTerms"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "expiresAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "expiresAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "expiresAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "expiresAt" date`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" date NOT NULL DEFAULT CURRENT_DATE`);
        await queryRunner.query(`ALTER TABLE "offer" ADD "OfferTerms" text array NOT NULL`);
    }

}
