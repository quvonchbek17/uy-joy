import { Entity, Column, OneToMany, OneToOne, ManyToMany, JoinColumn, JoinTable } from 'typeorm'
import { BaseModel, Residence } from "@entities"

@Entity("categories")
export class Category extends BaseModel {

    @Column({
        name: 'name',
        type: "varchar"
    })
    name: string;

    @Column({
        name: 'img',
        type: "varchar"
    })
    img: string;

    @ManyToMany(type => Residence, residence => residence.user)
    @JoinTable()
    residences: Residence[]


}