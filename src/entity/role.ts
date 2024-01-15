import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Personnel } from "./personnel"

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nom: string

    @ManyToOne((type) => Personnel, (Personnel) => Personnel.id)
    personnel: Personnel[]
}
