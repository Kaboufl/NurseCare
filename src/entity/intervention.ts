import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Patient from "./patient";
import Personnel from "./personnel";
import Prestation from "./prestation";

import { setSeederFactory } from "typeorm-extension";
import { Faker } from "@faker-js/faker";

@Entity()
export default class Intervention {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("date")
  date: Date;

  @Column()
  lieu: string;

  @Column()
  id_facture: number;

  @Column()
  etat_facture: string;

  @Column("date")
  date_facture: Date;

  @Column("date")
  date_paiement: Date;

  @ManyToOne((type) => Patient, (Patient) => Patient.id)
  patient: Patient;

  @ManyToOne((type) => Personnel, (Personnel) => Personnel.id)
  personnel: Personnel;

  @OneToMany((type) => Prestation, (Prestation) => Prestation.id)
  prestations: Prestation[];
}

export const InterventionFActory = setSeederFactory(
  Intervention,
  (faker: Faker) => {
    const intervention = new Intervention();
    intervention.date = faker.date.recent();
    intervention.lieu = faker.location.streetAddress();
    intervention.id_facture = faker.number.int(20);
    intervention.etat_facture = faker.lorem.word();
    intervention.date_facture = faker.date.recent();
    intervention.date_paiement = faker.date.recent();
    return intervention;
  }
);
