import { Entity, Column, OneToMany, OneToOne } from 'typeorm'
import { BaseModel, Residence } from "@entities"

@Entity("users")
export class User extends BaseModel {

    @Column({
        name: 'name',
        type: "varchar"
    })
    name: string;

    @Column({
        name: 'surname',
        type: "varchar"
    })
    surname: string;

    @Column({
        name: 'phone',
        type: 'varchar',
        unique: true
    })
    phone: string;

    @Column({
        name: 'password',
        type: 'varchar'
    })
    password: string;

    @OneToMany(type => Residence, residence => residence.user)
    residences: Residence[]


}