import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1610453156437 implements MigrationInterface {
    name = 'InitialMigration1610453156437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phone" character varying(10) NOT NULL, "password" text NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
