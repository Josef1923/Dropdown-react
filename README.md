# Plugin Dropdown React

Ce composant est un menu déroulant.
Il permet aux utilisateurs de sélectionner une option parmi une liste

### Installation ###

1. Récupérer le composant

Téléchargez ou clonez ce dépôt, puis placez les fichiers "Dropdown.jsx et  Dropdown.css" dans votre projet React dans le dossier des components.

2. Importer le composant dans votre projet

Dans le fichier où vous voulez l'utilsier :

import Dropdown from "chemin de l'emplacment du fichier.jsx"
import "chemin de l'emplacement du fichier.css"

### Utilisation ###

Le composant prend en parametre une lsite d'options à afficher sous la forme d'un tableau.

const State = [
  { label: "New York", value: "new-york" },
  { label: "Los Angeles", value: "los-angeles" },
  { label: "Chicago", value: "chicago" }
]

<Dropdown options={options} onChange={(val) => console.log(val)} />