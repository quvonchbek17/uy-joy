import { Entity, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany} from 'typeorm'
import { BaseModel, Category, User, File }  from "@entities"

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

    @OneToMany(type => File, file => file.residence)
    images: File[]
}