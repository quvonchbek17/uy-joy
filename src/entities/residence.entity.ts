import { Entity, Column, OneToOne, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm'
import { BaseModel, Category, User }  from "@entities"

@Entity("residences")
export class Residence extends BaseModel {
    @Column({
        name: "description",
        type: "varchar"
    })
    description: string;

    @ManyToOne(type => User, user => user.residences)
    @JoinColumn({name: "user_id"})
    user: User;

    @ManyToMany(type => Category, category => category.residences)
    @JoinTable()
    categories: Category[]
}