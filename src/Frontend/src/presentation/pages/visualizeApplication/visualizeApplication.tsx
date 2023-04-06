import React from "react"
import "./visualizeApplication-styles.scss"
import { useState } from "react"
import Button from "../../components/button/button";

type Props = {
    closeModal: Function
  }  

  function closeModal() {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
      setIsOpen(true);
    }

    function closeModal() {
      setIsOpen(false);
    }

  }
const visualizeApplication: React.FC<Props> = (props: Props) => {



     
    return (
        
        <div id="visualize-Application">
            
            <div className="container">
                <h1>Application Preview</h1>
                <div className="info-person">
                    <p className="name">Pedro Baptisa</p>
                </div>
                <p className="question-p">Vaga de interesse</p> 
                <p>Desenvolvedor</p>
                <p className="question-p">Porque você deseja essa vaga?</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p className="question-p">Quais habilidade quer desenvolver?</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <div className="button-container grid-3">
                <Button type="default" size="medium" text="close" onClick={() => props.closeModal()}/>
                </div>
                
        
               
            </div>
            
        </div>

    )
}


export default visualizeApplication;