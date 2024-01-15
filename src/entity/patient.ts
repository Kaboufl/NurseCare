import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Intervention } from "./intervention"

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nom: string

    @Column()
    prenom: string
    
    @Column()
    adresse: string 

    @Column({length:10})
    tel: number

    @ManyToOne((type) => Intervention, (Intervention) => Intervention.id)
    interventions: Intervention[]
}