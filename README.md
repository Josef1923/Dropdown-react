# Plugin Dropdown React

Ce composant est un menu déroulant.
Il permet aux utilisateurs de sélectionner une option parmi une liste

### Installation ###

Dans votre terminal:

```bash
npm install josef1923-dropdown-react
```

### Utilisation ###

Utilisation du component:

import Dropdown from "josef1923-dropdown-react";


import "josef1923-dropdown-react/src/Dropdown.css";


### Exemple ###

Le composant prend en parametre une liste d'options à afficher sous la forme d'un tableau.

1. Exemple de données :
```js
const state = [
  { label: "New York", value: "NY" },
  { label: "Los Angeles", value: "LA" },
  { label: "Chicago", value: "CH" }
]
```

2. Composant 

```jsx
<Dropdown 
options={option} 
onChange={(value) =>  console.log("Valeur sélectionnée :", value)}
/>
```

3. Options

| Prop       | Type         | Description                                      |
|------------|--------------|--------------------------------------------------|
| `options`  | `array`      | Liste des options à afficher                     |
| `onChange` | `function`   | Callback quand une valeur est sélectionnée       |
| `disabled` | `boolean`    | Si `true`, le dropdown est désactivé             |
| `icon`     | `JSX.Element`| Icône personnalisée affichée à droite du bouton  |

Exemple:

```jsx
import icon from "./assets/icon.svg";

<Dropdown 
  options={options} 
  disabled={true} 
  icon={<img src={icon}/>}
/>
```


### CSS ###

Conteneur global : jsWrapper


Conteneur dropdown : jsDropdown


Bouton de selection : jsDropdownButton


Bouton ouvert : jsDropDownButton .open


Liste : jsDropdownList


Eléments de la liste : jsDropdownList li


Hover : jsDropdownList li:hover
