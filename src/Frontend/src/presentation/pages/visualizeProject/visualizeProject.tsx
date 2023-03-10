import React from "react";
import Input from "../../components/Input";
import "./visualizeProject-styles.scss";

const VisualizeProject: React.FC = () => {
  return (
    <div className="visualize-project">
      <div className="grid-7 container-visualize">
        <div className="info-section">
          <h1 className="name-project">Project name</h1>
          <h2>Prazo para Inscrição: xx/xx/xx </h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <div className="skills-necessary">
            <h2 className="necessary-skills">Necessary Skills</h2>
            <div className="grid-4 ">
                <p className="skills-visualize">javaScript</p>
            </div>
            <div className="grid-4">
				<p className="skills-visualize">Python</p>
            </div>
            <div className="grid-4 ">
                <p className="skills-visualize">C++</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-5 info-project">
        <div className="project-owner-info">
          <h2 className="h2-owner">Project owner</h2>
          <p className="p-owner">Mariana Silva</p>
          <h4>Project area</h4>
          <p className="info-owner-p">desenvolvimento</p>
          <h4>Expect date</h4>
          <p className="info-owner-p">xx/xx/xxxx</p>
        </div>
      </div>
      <div className="grid-12 container-button">
          <button className="button-visuproject">Vacancies</button>
        </div>
    </div>
    
  );
};

export default VisualizeProject;
