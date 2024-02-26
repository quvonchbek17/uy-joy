import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1708935876310 implements MigrationInterface {
    name = 'Update1708935876310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT Now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT Now(), "uploadName" character varying, "name" character varying, "type" character varying, "size" character varying, "url" character varying, "userId" uuid, "residenceId" uuid, CONSTRAINT "UQ_ee61eddfa23a582cd2b3213408a" UNIQUE ("uploadName"), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categoryproperties" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT Now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT Now(), "name" character varying NOT NULL, "type" character varying NOT NULL, "category_id" uuid, CONSTRAINT "PK_4768a94a6029c9f53efa4e29759" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_8b5b5f9b711c1f9335e21789058" FOREIGN KEY ("residenceId") REFERENCES "residences"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categoryproperties" ADD CONSTRAINT "FK_abfaa609959329a953a59f1d18d" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categoryproperties" DROP CONSTRAINT "FK_abfaa609959329a953a59f1d18d"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_8b5b5f9b711c1f9335e21789058"`);
        await queryRunner.query(`DROP TABLE "categoryproperties"`);
        await queryRunner.query(`DROP TABLE "files"`);
    }

}
