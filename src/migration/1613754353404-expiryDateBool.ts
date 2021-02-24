import {MigrationInterface, QueryRunner} from "typeorm";

export class expiryDateBool1613754353404 implements MigrationInterface {
    name = 'expiryDateBool1613754353404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendor" RENAME COLUMN "isPartner" TO "isExpired"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendor" RENAME COLUMN "isExpired" TO "isPartner"`);
    }

}
