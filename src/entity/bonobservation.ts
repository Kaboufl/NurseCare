import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Personnel from "./personnel";
import { Prestation } from "./prestation";

@Entity()
export class BonObservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("datetime")
  date: string;

  @Column({ length: 1 })
  note: number;

  @Column()
  commentaire: string;

  @OneToMany((type) => Prestation, (Prestation) => Prestation.id)
  prestation: Prestation["id"];

  @ManyToOne((type) => Personnel, (Personnel) => Personnel.id)
  stagiaire: Personnel["nom"];
}
