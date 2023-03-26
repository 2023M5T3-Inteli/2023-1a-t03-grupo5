import React, { useState, useEffect } from "react";
import axios from "axios";

function Formulario() {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        axios.get("https://api.exemplo.com/opcoes")
            .then(response => {
                setOptions(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post("https://api.exemplo.com/enviar", { opcao: selectedOption })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Selecione uma opção:
                <select value={selectedOption} onChange={handleSelectChange}>
                    <option value="">Selecione uma opção</option>
                    {options.map(option => (
                        <option key={option.id} value={option.valor}>{option.nome}</option>
                    ))}
                </select>
            </label>
            <button type="submit">Enviar</button>
        </form>
    );
}

export default Formulario;
