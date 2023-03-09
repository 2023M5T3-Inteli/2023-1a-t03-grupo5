import React from "react";
import Input from "../../components/input/input";
import "./visualizeProject-styles.scss";

const VisualizeProject: React.FC = () => {
    return (
        <div className="">
            <div className="grid-6 visualize-project container-visualize">
                <h1>Project name</h1>
                <h3>Prazo para Inscrição: xx/xx/xx </h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <h2>Necessary Skills</h2>
            </div>
            <div className="grid-6 info-project">
                <h2>Project owner</h2>
                <p>Mariana Silva</p>
                <h3>Project area</h3>
                <p>desenvolvimento</p>
                <h3>Expect date</h3>
                <p>xx/xx/xxxx</p>
            </div>
        </div>
    )
}

export default VisualizeProject;