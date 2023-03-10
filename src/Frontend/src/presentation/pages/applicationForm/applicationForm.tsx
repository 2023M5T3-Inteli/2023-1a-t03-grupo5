import React from "react"
import "./applicationForm-styles.scss"
import { useState } from "react"


const TelaApplicationForm = () => {

    return (
        <div id="application_form">

            <h1>Formulário de inscrição</h1>
            <p>Vaga de interesse</p>
            <input className="vaga" type="text" placeholder="Vaga" />
            <p>Porque você deseja essa vaga?</p>
            <textarea className="motivacaoVaga" />
            <p>Quais habilidade quer desenvolver?</p>
            <input className="desenvolverHabilidades" type="text" />
            <button>Finalizar</button>
        </div>
    )
}


export default TelaApplicationForm;