import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationInVendorOffer1611745410972 implements MigrationInterface {
    name = 'RelationInVendorOffer1611745410972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "offer" ("OfferId" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "ValidFrom" TIMESTAMP NOT NULL, "ValidTo" TIMESTAMP, "category" character varying NOT NULL, "OfferCode" character varying, "ValidCities" text array NOT NULL, "OfferTerms" text array NOT NULL, "vendorVendorId" uuid, CONSTRAINT "PK_eb467cd3d04b97c9aabb1427fca" PRIMARY KEY ("OfferId"))`);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_3778d5e837aa39189c4369fab74" FOREIGN KEY ("vendorVendorId") REFERENCES "vendor"("VendorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_3778d5e837aa39189c4369fab74"`);
        await queryRunner.query(`DROP TABLE "offer"`);
    }

}
