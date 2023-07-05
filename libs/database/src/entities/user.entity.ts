import { Exclude } from "class-transformer";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SubscriptionEntity } from "./subscription.entity";

export enum UserType{
    ADMIN='ADMIN',
    USER='USER'
}

@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: 'varchar', name: 'first_name', nullable: false
    })
    firstName: string;

    @Column({
        type: 'varchar', name: 'last_name', nullable: false
    })
    lastName: string;

    @Column({
        type: 'varchar', name: 'email', nullable: false, unique: true
    })
    email: string;

    @Column({
        type: 'varchar', name: 'mobile', nullable: false, unique: true
    })
    mobile: string;

    @Column({
        type: 'varchar', name: 'address', nullable: false, unique: true
    })
    address: string;

    @Column({
        type: 'varchar', name: 'password', nullable: false
    })
    @Exclude()
    password: string;

    @Column({
        type: 'text', name: 'access_token', nullable: true
    })
    @Exclude()
    accessToken: string;

    @Column({
        type: 'boolean', name: 'is_verified', nullable: true
    })
    isVerified: boolean;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'user_type',
        default: UserType.USER
    })
    userType: UserType;

    @Column({ name: 'last_login_at', type: 'timestamp', nullable: true, default: null })
    public lastLoginAt: Date | null;

    /*
    * Create and Update Date Columns
    */
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    public updatedAt!: Date;

    @OneToMany(() => SubscriptionEntity, (subscription) => subscription.userId)
    subscriptions: SubscriptionEntity[];

    @Column({
        type: 'varchar', name: 'otp', nullable: false
    })
    otp: string;
}