import { type } from "os";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { ServiceTypeEntity } from "./service-type.entity";
import { MembershipEntity } from "./membership.entity";

export enum PaymentMode {
    CASH = 'CASH',
    GOOGLE_PAY = 'GOOGLE PAY'
};


@Entity('subscription')
export class SubscriptionEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: 'uuid', name: 'id_user', nullable: false
    })
    userId: string;

    @Column({
        type: 'uuid', name: 'id_service_type', nullable: false
    })
    serviceTypeId: string;

    @Column({
        type: 'uuid', name: 'id_membership', nullable: false
    })
    membershipId: string;

    @Column({
        type: 'int', name: 'price', nullable: false
    })
    price: number;

    @Column({
        type: 'int', name: 'spent_days', nullable: false
    })
    spentDays: number;

    @Column({
        type: 'int', name: 'total_days', nullable: false
    })
    totalDays: number;

    @Column({
        type: 'varchar', name: 'payment_mode', nullable: false
    })
    paymentMode: PaymentMode;

    @Column({
        type: 'timestamp', name: 'start_date', nullable: false
    })
    startDate: Date;

    @Column({
        type: 'timestamp', name: 'end_date', nullable: false
    })
    endDate: Date;

    // @OneToOne(type => UserEntity)
    // @JoinColumn({name: 'id_user'})
    // user: UserEntity;

    @OneToOne(type => ServiceTypeEntity)
    @JoinColumn({ name: 'id_service_type' })
    serviceType: ServiceTypeEntity;

    @OneToOne(type => MembershipEntity)
    @JoinColumn({ name: 'id_membership' })
    membership: MembershipEntity;

    @ManyToOne(type => UserEntity, user => user.id)
    @JoinColumn({ name: 'id_user' })
    user: UserEntity;


    /*
    * Create and Update Date Columns
    */
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    public updatedAt!: Date;
}