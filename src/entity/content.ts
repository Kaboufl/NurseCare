import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

export abstract class Content {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nom: string
}