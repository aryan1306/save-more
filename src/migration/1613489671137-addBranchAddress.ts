import {MigrationInterface, QueryRunner} from "typeorm";

export class addBranchAddress1613489671137 implements MigrationInterface {
    name = 'addBranchAddress1613489671137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" ADD "BranchAddress" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "BranchAddress"`);
    }

}
