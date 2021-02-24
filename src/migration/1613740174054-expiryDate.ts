import { MigrationInterface, QueryRunner } from "typeorm";

export class expiryDate1613740174054 implements MigrationInterface {
  name = "expiryDate1613740174054";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vendor" ADD "expiresAt" TIMESTAMP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "vendor" DROP COLUMN "expiresAt"`);
  }
}
