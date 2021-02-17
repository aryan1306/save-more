import { MigrationInterface, QueryRunner } from "typeorm";

export class test1611854693803 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);

    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdAt" date NOT NULL DEFAULT CURRENT_DATE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
  }
}
