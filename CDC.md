# Projet NurseCare

Le cabinet d’infirmiers NurseCare, situé à Toulouse, propose des prestations de soins au
cabinet et à domicile chez les patients en faisant la demande (ayant des difficultés à se
déplacer, par exemple).
Le cabinet est composé de plusieurs catégories d’employé(e)s :
- Le personnel soignant : une dizaine de d’infirmier(e)s diplômé(e)s, parfois
accompagnés dans leurs interventions par des stagiaires en formation
- Le personnel administratif : 2 secrétaires médical(e)s en charge du suivi administratif
et comptable des prestations
- Un directeur de cabinet, responsable du recrutement du personnel et du contrôle de
gestion du cabinet
Actuellement, ce sont les secrétaires médical(e)s qui gèrent le standard téléphonique du
cabinet. Lorsqu’un patient appelle / envoie un email pour demander une prestation à
domicile, ils consultent les agendas des infirmier(e)s et affectent le rendez-vous à un
infirmier(e) (via un classeur Excel qui est stocké sur le serveur du cabinet). Elles gèrent
également les annulations de rendez-vous si le patient n’est plus en capacité d’être
disponible à son rendez-vous.
Le matin, les infirmier(e)s consultent le document et préparent leur tournée du jour en
ajoutant les adresses manuellement dans une application de déplacement sur leur
smartphone (Google Maps, MapQuest, Waze...).
Ils se rendent ensuite à chacune des interventions qui leur sont assignées, et pratiquent une
ou plusieurs prestations de soin au patient concerné.
Une prestation de soin a un nom et un prix fixé, et fait partie d’une grille dont un extrait vous
est communiqué (voir annexe 1).
Si l’infirmier est accompagné(e) d’un(e) stagiaire, il / elle peut décider de faire pratiquer une
prestation à celui / celle-ci. Il doit dans ce cas remplir un bon d’observation sur la qualité de
sa prestation afin de noter sa progression.
Ces bons sont fournis par les différents organismes de formation des stagiaires et portent
les informations suivantes :
- date/ heure de l’intervention
- nom et prénom du stagiaire
- prestation effectuée
- note sur 5 (1 à 5)
- un commentaire sur la prestation du stagiaire

Une fois leur intervention finie, l’infirmier(e) produit une facture. Il en remet un exemplaire au
patient et en conserve un autre pour le confier au personnel administratif à la fin de sa
tournée.
En rentrant au cabinet, le personnel soignant remet ses factures au personnel administratif
qui doit les traiter (enregistrement dans le PGI du cabinet pour enregistrer la comptabilité).
Le directeur quant à lui s’occupe de gérer les factures (du suivi avec la CPAM / les
organismes complémentaires de santé), du recrutement du personnel de santé, ainsi que du
contrôle de gestion du cabinet (estimer les parts de soin de telles ou telles prestations). Il est
également le responsable officiel des stagiaires du cabinet, il consulte régulièrement les
bons d’observation de ses stagiaires afin de faire le point avec eux.

## Problématiques

NurseCare a des difficultés pour organiser facilement ses tournées de soin à domicile de
ses patients.
Le personnel soignant (infirmier(e)s) se plaint de plusieurs problèmes :
- Il est obligé d’aller tôt le matin au cabinet afin de récupérer la liste de leur RDVs, ce
qui leur fait perdre du temps dans les bouchons
- Il est dans l’incapacité de consulter les mises à jour de leur RDVs du lendemain
pendant leur journée de travail, les empêchant de planifier leur temps libre
- Il perd du temps en début de journée à saisir les adresses de leur tournée, et doivent
eux-mêmes ordonner leurs RDVs en fonction de la distance (quitte à devoir appeler
les patients et changer l’heure du rendez-vous, ce qui déplait aux patients)
- Il perd du temps lors des interventions à remplir les bons d’observation des stagiaires
car ceux-ci (selon l’organisme de formation de rattachement qui les suit) ne sont pas
standardisés (alors qu’ils portent tous les mêmes informations)
De même, le personnel administratif (secrétaires médical(e)s) n’est également pas satisfait
de l’organisation actuelle :
- Il doit sans cesse modifier le fichier des rendez-vous en fonction des appels des
patients, et ce fichier ne peut être consulté par plusieurs personnes en même temps
(occasionnant du temps perdu, voire des oublis de mise à jour lorsque le fichier reste
verrouillé)
- Il a un retard considérable dans le traitement des factures de prestation des
infirmiers car il reçoit l’ensemble des factures le soir et n’a qu’une journée pour traiter
l’intégralité des factures de la veille
Le directeur quant à lui rencontre les difficultés suivantes :
- Il a des difficultés à évaluer ses besoins en termes de recrutement : il souhaiterait
pouvoir déterminer facilement si le personnel soignant est surchargé ou non, afin
d’adapter ses recrutements temporaires en fonction des besoins (vaccins en période
de grippe par exemple)
- Il souhaiterait également disposer d’outils d’aide à la décision pour gérer son cabinet
: il voudrait notamment pouvoir visualiser facilement les pourcentages de prestations
par domaine, ou visualiser la note moyenne des stagiaires par organisme de
formation

## Cahier des charges

Suite aux sollicitations de ses employés, et face à ses propres problématiques, le directeur a
décidé de missionner des étudiants de l’ESICAD pour analyser les difficultés que son
entreprise rencontre et proposer un système d’informations adapté.
Le but des étudiants est donc de répondre aux besoins de NurseCare et de développer un
démonstrateur applicatif (ou Proof of Concept (PoC)) qui répond au cahier des charges
suivant.
Les infirmier(e)s souhaitent pouvoir :
- Consulter leur agenda prévisionnel de rendez-vous (une liste des rendez-vous leur
étant assigné, classée par ordre chronologique ascendant)
- Récupérer l’itinéraire de leur rendez-vous de la journée facilement (ou, à minima, la
liste ordonnée des adresses à visiter) à partir de leur adresse de domicile
- Facturer facilement leur patient (en générant un fichier PDF qui leur sera envoyé par
email ou imprimé (ils ont une imprimante et un PC portables à disposition)
- Remplir des bons d’observation des prestations des stagiaires et les centraliser
Les secrétaires médical(e)s souhaitent pouvoir :
- Saisir / mettre à jour rapidement un rendez-vous d’intervention
- Annuler rapidement un rendez-vous (et mettre à jour la tournée de l’infirmier(e)
concerné(e))
- Désigner une intervention “traitée” administrativement (lorsque la facture est
correctement intégrée dans le PGI du cabinet)
Le directeur souhaite pouvoir :
- Avoir un tableau de bord qui lui indique l’activité de son cabinet (le volume et
montant total de prestations par domaine effectuées sur une période donnée)
- Suivre le délai d’intégration des factures par le personnel administratif afin de pouvoir
anticiper ses recrutements d’infirmier(e)s
- Suivre le délai d’intégration des factures par le personnel administratif afin de pouvoir
anticiper ses recrutements de secrétaires médical(e)s
- Consulter les bons d’observation de ses stagiaires
- Afficher des moyennes par organisme de formation de rattachement

## Livrables

Afin que le travail des étudiants puisse être valorisé, le cabinet NurseCare s’attend à
recevoir les éléments suivants :
- Les modèles conceptuels et logiques de données (MCD / MLD)
- Le schéma relationnel de la base de données (Script SQL)
- Le code-source de l’application
- Un schéma architectural décrivant la solution proposée
- Une documentation fonctionnelle du démonstrateur (expliquant les options
disponibles et le fonctionnement de l’application)
