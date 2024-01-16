import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Personnel {
    @PrimaryGeneratedColumn()
    id: number | undefined

    @Column()
    nom: string

}