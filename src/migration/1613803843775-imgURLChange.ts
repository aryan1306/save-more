import {MigrationInterface, QueryRunner} from "typeorm";

export class imgURLChange1613803843775 implements MigrationInterface {
    name = 'imgURLChange1613803843775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendor" DROP COLUMN "imgURL"`);
        await queryRunner.query(`ALTER TABLE "offer" ADD "imgURL" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "imgURL"`);
        await queryRunner.query(`ALTER TABLE "vendor" ADD "imgURL" text`);
    }

}
