# Plugin Dropdown React

Ce composant est un menu déroulant.
Il permet aux utilisateurs de sélectionner une option parmi une liste

### Installation ###

Dans votre terminal:

bash
npm install josef1923-dropdown-react

### Utilisation ###

Dans le fichier ou vous souhaitez utiliser le composant:

import Dropdown from "josef1923-dropdown-react";
import "josef1923-dropdown-react/src/Dropdown.css";


### Exemple ###

Le composant prend en parametre une liste d'options à afficher sous la forme d'un tableau.

const State = [
  { label: "New York", value: "new-york" },
  { label: "Los Angeles", value: "los-angeles" },
  { label: "Chicago", value: "chicago" }
]

<Dropdown options={options} onChange={(val) => console.log(val)} />


### CSS ###

Conteneur global : jsWrapper
Conteneur dropdown : jsDropdown
Bouton de selection : jsDropdownButton
Bouton ouvert : jsDropDownButton .open
Liste : jsDropdownList
Eléments de la liste : jsDropdownList li
Hover : jsDropdownList li:hover