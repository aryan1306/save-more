import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCreatedAtField1611475277013 implements MigrationInterface {
    name = 'AddCreatedAtField1611475277013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
    }

}
