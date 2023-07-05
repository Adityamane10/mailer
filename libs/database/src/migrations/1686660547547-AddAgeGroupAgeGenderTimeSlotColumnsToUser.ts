import { MigrationInterface, QueryRunner } from "typeorm"

export class AddAgeGroupAgeGenderTimeSlotColumnsToUser1686660547547 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD COLUMN age INT DEFAULT NULL,
            ADD COLUMN age_group VARCHAR DEFAULT NULL,
            ADD COLUMN gender VARCHAR DEFAULT NULL,
            ADD COLUMN time_slot VARCHAR DEFAULT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            DROP COLUMN age INT,
            DROP COLUMN age_group VARCHAR,
            DROP COLUMN gender VARCHAR,
            DROP COLUMN timeslot VARCHAR;
        `);
    }

}
