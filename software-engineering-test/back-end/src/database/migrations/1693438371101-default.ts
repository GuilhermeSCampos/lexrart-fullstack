import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1693438371101 implements MigrationInterface {
    name = 'Default1693438371101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blacklist" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, CONSTRAINT "PK_04dc42a96bf0914cda31b579702" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversations_historic" ("id" SERIAL NOT NULL, "text" text NOT NULL, "user_id" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bb870004186b222c89a633341dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "user_name" text NOT NULL, "password" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6" UNIQUE ("user_name"), CONSTRAINT "UQ_638bac731294171648258260ff2" UNIQUE ("password"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "conversations_historic" ADD CONSTRAINT "FK_ffed07c8c01084a113f161314a5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversations_historic" DROP CONSTRAINT "FK_ffed07c8c01084a113f161314a5"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "conversations_historic"`);
        await queryRunner.query(`DROP TABLE "blacklist"`);
    }

}
