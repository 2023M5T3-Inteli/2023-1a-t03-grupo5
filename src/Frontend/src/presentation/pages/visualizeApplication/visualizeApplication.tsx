import React from "react"
import "./visualizeApplication-styles.scss"
import { useState } from "react"


const visualizeApplication = () => {

    return (
        <div id="visualize-Application">

            <h1>Application Preview</h1>
            <div className="info-person">
                <p className="name-p">Person Name</p>
                <button>View profile</button>
            </div>
            <h3>Vaga de interesse</h3>
            <p>Desenvolvedor</p>
            <h3>Porque você deseja essa vaga?</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h3>Quais habilidade quer desenvolver?</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <button>Finalizar</button>
        </div>
    )
}


export default visualizeApplication;