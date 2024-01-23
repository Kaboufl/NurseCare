import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CategorieSoin } from "./categoriesoin";
import Prestation from "./prestation";

@Entity()
export class Soin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @ManyToOne((type) => CategorieSoin, (CategorieSoin) => CategorieSoin.id)
  categorie: CategorieSoin["nom"];

  @OneToMany((type) => Prestation, (Prestation) => Prestation.id)
  prestation: Prestation[];
}
