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

        if (!isOpen) {
            const index = options.findIndex(option => option === selectedOption);
            setFocusedList(index);
        }
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

        if ((e.key === "ArrowDown" || e.key === "ArrowUp") && e.altKey) {
            e.preventDefault();
            Toggle();
            if (!isOpen) {
                setFocusedList(0);
            }
            return;

        }

        if (!isOpen) {
            // Si le menu n'est pas ouvert, on gère les touches fléchées pour changer l'option sélectionnée
            // on recupère l'index de l'option sélectionnée dans le tableau d'options
            const currentIndex = options.findIndex(option => option === selectedOption);

            if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                e.preventDefault();
                if (currentIndex < options.length - 1) {
                    const next = currentIndex + 1;
                    setSelectedOption(options[next]);
                    onChange?.(options[next].value);
                }
                return;
            }

            if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                e.preventDefault();
                if (currentIndex > 0) {
                    const prev = currentIndex - 1;
                    setSelectedOption(options[prev]);
                    onChange?.(options[prev].value);
                }
                return;
            }

            if (e.key === "Home" || e.key === "PageUp") {
                e.preventDefault();
                setSelectedOption(options[0]);
                onChange?.(options[0].value);
                return;
            }

            if (e.key === "End" || e.key === "PageDown") {
                e.preventDefault();
                const lastIndex = options.length - 1;
                setSelectedOption(options[lastIndex]);
                onChange?.(options[lastIndex].value);
                return;
            }
        }

        if (isOpen) {
            if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                e.preventDefault();
                //Si prev n'est pas le dernier élément de la liste, on l'incrémente de 1 sinon on le met à la dernière option de la liste
                setFocusedList(prev => {
                    const next = prev < options.length - 1 ? prev + 1 : options.length - 1;
                    return next;
                });
            }
            // Si prev n'est pas le premier élément de la liste, on le décrémente de 1 sinon on le met à 0
            if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                e.preventDefault();
                setFocusedList(prev => {
                    const next = prev > 0 ? prev - 1 : 0;
                    return next;
                });
            }

            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                if (!isOpen) { // déclenche si le menu est fermé
                    setIsOpen(true); // ouvre le menu
                    const index = options.findIndex(option => option === selectedOption);
                    setFocusedList(index); // focus l'option sélectionnée 
                }
                else if (focusedList >= 0) {
                    onSelect(options[focusedList]);//permet de sélectionner l'option focusée par le clavier
                }
            }

            if (e.key === "Escape") {
                setIsOpen(false);
            }

            if (e.key === "Home" || e.key === "PageUp") {
                e.preventDefault();
                setFocusedList(0);
            }
            
            if (e.key === "End" || e.key === "PageDown") {
                e.preventDefault();
                setFocusedList(options.length - 1);
            }
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


    // useEffect pour gérer le focus sur l'élément de la liste à l'ouverture du menu
    useEffect(() => {
            if (isOpen && typeof focusedList === "number") {
            liRefs.current[focusedList]?.scrollIntoView({ block: "nearest" });
        }
    }, [isOpen, focusedList]);

    return (

        <div className="jsWrapper">
            <div className="jsDropdown"
                onKeyDown={handleKeyDown}
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