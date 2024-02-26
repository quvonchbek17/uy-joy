import { Entity, Column, OneToMany, OneToOne, ManyToMany, JoinColumn, JoinTable, ManyToOne } from 'typeorm'
import { BaseModel, Category, Residence } from "@entities"

@Entity("categoryproperties")
export class CategoryProperty extends BaseModel {

    @Column({
        name: 'name',
        type: "varchar"
    })
    name: string;

    @Column({
        name: 'type',
        type: "varchar"
    })
    type: string;

    @ManyToOne(type => Category, category => category.properties)
    @JoinColumn({name: "category_id"})
    category: Category


}