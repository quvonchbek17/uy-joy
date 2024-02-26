import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm'
import { BaseModel } from './model.entity';
import { Residence } from './residence.entity';


@Entity("files")
export class File extends BaseModel {

    @Column({
        name: 'uploadName',
        type: 'varchar',
        unique: true,
        nullable: true
    })
    uploadName: string;

    @Column({
        name: 'name',
        type: 'varchar',
        nullable: true
    })
    name: string;

    @Column({
        name: 'type',
        type: 'varchar',
        nullable: true
    })
    type: string;

    @Column({
        name: 'size',
        type: 'varchar',
        nullable: true
    })
    size: string;

    @Column({
        name: 'url',
        type: 'varchar',
        nullable: true
    })
    url: string;

    @Column({
        name: 'userId',
        type: 'uuid',
        nullable: true
    })
    userId: string;

    @ManyToOne(() => Residence, residence => residence.images)
    residence: Residence;
}