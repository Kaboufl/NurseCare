export interface Intervention {
    id: number
    date: string //date
    lieu: string
    facture: number
    etatFacture: boolean
    dateFacture: string //date
    datePaiement: string //date

}

export interface Prestation {
    id: number
    commentaire: string
    intervention: number
    soin: string
}

export interface BonObservation {
    id: number
    date: string //date
    heure: string //heure
    note: number
    commentaire: string
    personnel: string
    prestation: number
}

export interface Facture {
    id: number
    //à voir pour montant emetteur etc
}