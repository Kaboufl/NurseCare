import { Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import { Soin } from "./soin"

@Entity()
export class CategorieSoin {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nom: string

    @OneToMany((type) => Soin, (Soin) => Soin.id)
    soins: Soin[]
}