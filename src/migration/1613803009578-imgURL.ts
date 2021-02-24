import {MigrationInterface, QueryRunner} from "typeorm";

export class imgURL1613803009578 implements MigrationInterface {
    name = 'imgURL1613803009578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "expiryIndex"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "imgURL"`);
        await queryRunner.query(`ALTER TABLE "vendor" ADD "imgURL" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendor" DROP COLUMN "imgURL"`);
        await queryRunner.query(`ALTER TABLE "offer" ADD "imgURL" text`);
        await queryRunner.query(`CREATE INDEX "expiryIndex" ON "vendor" ("expiresAt") `);
    }

}
