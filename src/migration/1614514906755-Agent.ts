import {MigrationInterface, QueryRunner} from "typeorm";

export class Agent1614514906755 implements MigrationInterface {
    name = 'Agent1614514906755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendor" ADD "AgentCode" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "vendor" ADD "hasPaid" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendor" DROP COLUMN "hasPaid"`);
        await queryRunner.query(`ALTER TABLE "vendor" DROP COLUMN "AgentCode"`);
    }

}
