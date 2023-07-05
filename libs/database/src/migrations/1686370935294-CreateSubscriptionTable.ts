import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateSubscriptionTable1686370935294 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE IF NOT EXISTS subscription(
                id uuid DEFAULT uuid_generate_v4() NOT NULL,
                id_user uuid,
                id_service_type uuid,
                id_membership uuid,
                start_date TIMESTAMP DEFAULT NULL,
                end_date TIMESTAMP DEFAULT NULL,
                spent_days INT,
                total_days INT,
                price INT,
                payment_mode VARCHAR,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                PRIMARY KEY(id),
                CONSTRAINT subscription_user_id FOREIGN KEY (id_user) REFERENCES "user"(id),
                CONSTRAINT subscription_service_id FOREIGN KEY (id_service_type) REFERENCES service_type(id),
                CONSTRAINT subscription_membership_id FOREIGN KEY (id_membership) REFERENCES membership(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE subscription;
        `);
    }

}
