import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDiscountValue1613327101517 implements MigrationInterface {
    name = 'AddDiscountValue1613327101517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" ADD "discountValue" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "discountValue"`);
    }

}
