import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Etablissement {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nom: string
}