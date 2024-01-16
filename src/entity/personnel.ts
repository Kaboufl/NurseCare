import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Personnel {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nom: string

    @Column()
    prenom: string

    @Column()
    adresse: string

    @Column()
    tel: string
    
    @Column()
    etablissement: number

    @Column()
    role: number

    @Column()
    mail: string

    @Column()
    password: string
}