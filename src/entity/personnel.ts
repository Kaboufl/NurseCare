import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Personnel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  adresse: string;

<<<<<<< HEAD
    @Column({length:10})
    tel: string
    
    @OneToMany((type) => Etablissement, (Etablissement) => Etablissement.id)
    etablissement: Etablissement["nom"]
=======
  @Column()
  tel: string;
>>>>>>> 7b01d03ff5bdafa4dc3a42efda15f3e1a2506658

  @Column()
  etablissement: number;

  @Column()
  role: number;

  @Column()
  mail: string;

  @Column()
  password: string;
}
