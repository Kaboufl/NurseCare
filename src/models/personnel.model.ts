export interface RolePersonnel {
    id: number
    nom: number
}

export interface Etablissement {
    id: number
    nom: string
}

export interface Personnel {
    id: number
    nom: string
    prenom: string
    adresse: string
    tel: string
    etablissement: string
    role: string
}