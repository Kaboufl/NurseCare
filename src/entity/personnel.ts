import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { setSeederFactory } from "typeorm-extension";
import { Faker } from "@faker-js/faker";

@Entity()
export default class Personnel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  adresse: string;

  @Column()
  tel: string;

  @Column()
  etablissement: number;

  @Column()
  role: number;

  @Column()
  mail: string;

  @Column()
  password: string;
}

export const PersonnelFactory = setSeederFactory(Personnel, (faker: Faker) => {
  const personnel = new Personnel();
  personnel.nom = faker.person.lastName();
  personnel.prenom = faker.person.firstName();
  personnel.adresse = faker.location.streetAddress();
  personnel.tel = faker.phone.number();
  personnel.etablissement = faker.number.int(20);
  personnel.role = faker.number.int(5);
  personnel.mail = faker.internet.email();
  personnel.password = faker.internet.password();
  return personnel;
});
