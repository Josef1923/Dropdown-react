import { useState } from "react";
import "./Dropdown.css";

/**
 * Composant Dropdown
 * @param {Array} options - Liste des options à afficher dans le dropdown au format {label: string, value: any}
 * @param {Function} onChange - Fonction appelée quand une option est sélectionnée, elle prend en paramètre la value de l'option sélectionnée * 
 */

function Dropdown({ options, onChange, icon, disabled = false}) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0] || null);

    const Toggle = () => {
        //Si le dropdown est désactivé, on ne fait rien
        if (disabled) {
            return;
        }
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
        <div className="jsWrapper">
            <div className="jsDropdown">
                <button className={`jsDropdownButton ${isOpen ? "open" : ""}`} 
                onClick={Toggle}
                disabled={disabled}>
                    {selectedOption.label || "Sélectionner une option"}
                    {icon && <span className="jsDropdownIcon">{icon}</span>}
                </button>
                {isOpen && (
                    <ul className="jsDropdownList">
                        {options.map((option, index) => (
                            <li key={index} onClick={() => onSelect(option)}>
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Dropdown;