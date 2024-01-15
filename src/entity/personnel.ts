import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Etablissement } from "./etablissement"
import { Role } from "./role"
import { Intervention } from "./intervention"
import { BonObservation } from "./bonobservation"

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

    @Column({length:10})
    tel: string
    
    @OneToMany((type) => Etablissement, (Etablissement) => Etablissement.id)
    etablissement: Etablissement["nom"]

    @OneToMany((type) => Role, (Role) => Role.id)
    role: Role["nom"]

    @ManyToOne((type) => Intervention, (Intervention) => Intervention.id)
    interventions: Intervention[]

    @ManyToOne((type) => BonObservation, (BonObservation) => BonObservation.id)
    bonsobservation: BonObservation[]
}