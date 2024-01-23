import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BonObservation } from "./bonobservation";
import Intervention from "./intervention";
import { Soin } from "./soin";

@Entity()
export default class Prestation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commentaire: string;

  @ManyToOne((type) => Soin, (Soin) => Soin.id)
  soins: Soin;

  @ManyToOne((type) => Intervention, (Intervention) => Intervention.id)
  intervention: Intervention["id"];

  @ManyToOne(
    (type) => BonObservation,
    (BonObservation) => BonObservation.prestation
  )
  bonobservation: BonObservation[];
}
