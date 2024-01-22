import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Intervention from "./intervention";
import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";

@Entity()
export default class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  adresse: string;

  @Column({ length: 10 })
  tel: string;

  @OneToMany((type) => Intervention, (Intervention) => Intervention.id)
  interventions: Intervention[];
}

export const PatientFactory = setSeederFactory(Patient, (faker: Faker) => {
  const patient = new Patient();
  patient.nom = faker.person.lastName();
  patient.prenom = faker.person.firstName();
  patient.adresse = faker.location.streetAddress();
  patient.tel = faker.helpers.fromRegExp(/0[1-9][0-9]{8}/);
  return patient;
});
