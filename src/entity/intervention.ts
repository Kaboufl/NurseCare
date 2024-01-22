import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Patient from "./patient";
import Personnel from "./personnel";
import { Prestation } from "./prestation";

@Entity()
export default class Intervention {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("date")
  date: string;

  @Column()
  lieu: string;

  @Column()
  id_facture: number;

  @Column()
  etat_facture: string;

  @Column("date")
  date_facture: string;

  @Column("date")
  date_paiement: string;

  @ManyToOne((type) => Patient, (Patient) => Patient.id)
  patient: Patient;

  @ManyToOne((type) => Personnel, (Personnel) => Personnel.id)
  personnel: Personnel;

  @OneToMany((type) => Prestation, (Prestation) => Prestation.id)
  prestations: Prestation[];
}
