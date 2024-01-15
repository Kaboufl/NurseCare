import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { BonObservation } from "./bonobservation"
import { Intervention } from "./intervention"
import { Soin } from "./soin"

@Entity()
export class Prestation {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    commentaire: string

    @OneToMany((type) => Soin, (Soin) => Soin.id)
    soins: Soin["nom"]

    @ManyToOne((type) => Intervention, (Intervention) => Intervention.id)
    intervention: Intervention["id"]


    @ManyToOne((type) => BonObservation, (BonObservation) => BonObservation.prestation)
    bonobservation: BonObservation[]
}