import React, { useEffect } from "react"
import "./visualizeApplication-styles.scss"
import { useState } from "react"
import Button from "../../components/button/button";
import ProjectService from "../../../main/services/projectService";

type Props = {
  closeModal: Function;
  informations: any
}

const visualizeApplication: React.FC<Props> = (props: Props) => {
  console.log(props.informations)
  return (

    <div id="visualize-Application">

      <div className="container">
        <h1>Application Preview</h1>
        <div className="info-person">
          <p className="name">{props.informations.name}</p>
        </div>
        <p className="question-p">Interest role</p>
        <p>{props.informations.offerName}</p>
        <p className="question-p">Why do you want this role?</p>
        <p>{props.informations.why}</p>
        <p className="question-p">Which habilities do you like to develop?</p>
        <p>{props.informations.habilities}</p>
        <div className="button-container">
          <Button type="default" size="medium" text="Close" onClick={() => props.closeModal()} />
        </div>
      </div>
    </div>
  )
}


export default visualizeApplication;