import { useState } from "react";
import "./Dropdown.css";

/**
 * Composant Dropdown
 * @param {Array} options - Liste des options à afficher dans le dropdown au format {label: string, value: any}
 * @param {Function} onChange - Fonction appelée quand une option est sélectionnée, elle prend en paramètre la value de l'option sélectionnée * 
 */

function Dropdown({ options, onChange }) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0] || null);

    const Toggle = () => {
        setIsOpen(!isOpen);
    }

    //Fonction appelée lorsqu'on clique sur une option
    const onSelect = (option) => {
        //mise à jour de l'option sélectionnée
        setSelectedOption(option);
        //fermeture du dropdown
        setIsOpen(false);
        //Appel de la fonction onChange passée en props
        if (onChange) {
            onChange(option.value);
        }
    }

    return (
        <div className="dropdown">
            <button className={`dropdownButton ${isOpen ? "open" : ""}`} onClick={Toggle}>
                {selectedOption.label || "Sélectionner une option"}
            </button>
            {isOpen && (
                <ul className="dropdownList">
                    {options.map((option, index) => (
                        <li key={index} onClick={() => onSelect(option)}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dropdown;