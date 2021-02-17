import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExpiresAt1611864787962 implements MigrationInterface {
  name = "AddExpiresAt1611864787962";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_DATE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT now()`
    );
  }
}
