import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateMembershipTable1686370904201 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS membership(
                id uuid DEFAULT uuid_generate_v4() NOT NULL,
                name VARCHAR,
                validity_days INT,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                PRIMARY KEY(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE membership;
        `);
    }

}
