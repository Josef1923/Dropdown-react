import { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

function Dropdown({ options, onChange, icon, disabled = false }) {

    const [isOpen, setIsOpen] = useState(false); // pour savoir si le menu est ouvert ou non
    const [selectedOption, setSelectedOption] = useState(options[0] || null); // pour mettre à jour l'option sélectionnée dns la liste

    // const en vu de selcetionner l'option focusée par le clavier
    const [focusedList, setFocusedList] = useState(); // pour savoir quelle option est focusée par le clavier(option keyboard)

    // const pour avoir une référence sur chaque élément de la liste
    const liRefs = useRef([]);

    // Fonction pour gérer le clic sur le bouton du menu déroulant
    const Toggle = () => {
        if (disabled) return;
        setIsOpen(!isOpen);
    };

    // Fonction pour gérer la sélection d'une option
    const onSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onChange) { //on vérifie jsute au cas où onChange n'est pas défini pour éviter les erreurs
            onChange(option.value);
        }

    };

    const handleKeyDown = (e) => {
        if (disabled) return;

        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
            e.preventDefault(); 
            //Si prev n'est pas le dernier élément de la liste, on l'incrémente de 1 sinon on le met à la dernière option de la liste
            setFocusedList(prev => {
                const next = prev < options.length - 1 ? prev + 1 : options.length - 1;
                // Prends la référence du prochain élément (next) dans mon tableau de refs (liRefs.current) 
                // et fais en sorte qu’il devienne visible automatiquement en scrollant juste ce qu'il faut
                liRefs.current[next]?.scrollIntoView({ block: "nearest" });
                return next;
            });
        }
            // Si prev n'est pas le premier élément de la liste, on le décrémente de 1 sinon on le met à 0
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
            e.preventDefault();
            setFocusedList(prev => {
                const next = prev > 0 ? prev - 1 : 0;
                liRefs.current[next]?.scrollIntoView({ block: "nearest" });
                return next;
            });
        }

        if (e.key === "Enter" || e.key === " ") {         
            e.preventDefault()
            if (!isOpen) { // déclenche si le menu est fermé
                setIsOpen(true); // ouvre le menu
                setFocusedList(0); // met le focus sur la première option
            }
            else if (focusedList >= 0) { 
                onSelect(options[focusedList]);//permet de sélectionner l'option focusée par le clavier
            }
        }
 
        if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const outClickCloser = (e) => {
            if (isOpen && !e.target.closest(".jsDropdown")) {
                setIsOpen(false);
            }
        };
    
        document.addEventListener("mousedown", outClickCloser);
    
        return () => {
            document.removeEventListener("mousedown", outClickCloser);
        };
    }, [isOpen]);

    return (
      
        <div className="jsWrapper">
            <div className="jsDropdown"
                onKeyDown={handleKeyDown}
                tabIndex={0} // pour ne pas perdre le focus du menu déroulant
            >
                <button className={`jsDropdownButton ${isOpen ? "open" : ""}`}
                    onClick={Toggle}
                    disabled={disabled} //pour garder l'option de la version jquery
                >
                    {selectedOption.label || "Sélectionner une option"}
                    {icon && <span className="jsDropdownIcon">{icon}</span>}
                </button>
                {isOpen && (
                    <ul className="jsDropdownList">
                        {options.map((option, index) => (
                            <li
                                key={index}
                                ref={(el) => (liRefs.current[index] = el)} // on ajoute une référence à chaque élément de la liste
                                onClick={() => onSelect(option)}                               
                                className={index === focusedList ? "focused" : ""}                                
                            >
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