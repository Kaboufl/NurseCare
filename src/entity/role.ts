import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { setSeederFactory } from "typeorm-extension";
import { Faker } from "@faker-js/faker";

@Entity()
export default class Role {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  nom: string;
}

export const RoleFactory = setSeederFactory(Role, (faker: Faker) => {
  const role = new Role();
  role.nom = faker.lorem.word();
  return role;
});
