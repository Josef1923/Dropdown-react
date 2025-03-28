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

1. Exemple de données :

const state = [
  { name: "New York", abbreviation: "NY" },
  { name: "Los Angeles", abbreviation: "LA" },
  { name: "Chicago", abbreviation: "CH" }
]

2. Adaptation :

const options = states.map((state) => ({
  label: state.name               // Ce qui sera affiché dans le menu déroulant
  value: state.abbreviation       // Ce qui sera renvoyé lors de la sélection
}));

3. Composant 

<Dropdown 
options={option} 
onChange={(value) =>  console.log("Valeur sélectionnée :", value)}
/>

4. Options

  - disbled (si vous passez true, le dropdown sera desactivé)
  <Dropdown options={options} disabled={true} />

  - Vous pouvez ajouter une icône à droite du bouton avec la props `icon`.
  import Icon from "./icon.svg";
  <Dropdown
  icon={<img src={Chevron} alt="chevron" />}
  />


### CSS ###

Conteneur global : jsWrapper
Conteneur dropdown : jsDropdown
Bouton de selection : jsDropdownButton
Bouton ouvert : jsDropDownButton .open
Liste : jsDropdownList
Eléments de la liste : jsDropdownList li
Hover : jsDropdownList li:hover