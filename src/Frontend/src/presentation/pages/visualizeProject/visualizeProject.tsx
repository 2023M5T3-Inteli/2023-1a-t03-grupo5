import React from "react";
import "./visualizeProject-styles.scss";
import EditIcon from "@mui/icons-material/Edit";
import Card from "../../components/card/card";
import UserIcon from '../../../../public/user.png'
import StarIcon from '../../../../public/star.png'
import AwardIcon from '../../../../public/award.png'
import Button from '../../components/button/button'


// type Props = {
//   closeModal: Function;
//   openEdit: Function;
//   openApply: Function;
// }

const VisualizeProject: React.FC = () => {
  return (
    <div className="visualize-project">
      <div className="container-visualize">
        <div className=" grid-8 project-info" >
        <div className=" project-start">
        <h1>Project Title</h1>
        <img width={28} src={StarIcon} />
        </div>
        <p className="p-project">
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
          <p className="p-project">Leader: Gabriel Batista</p>
          <p className="p-project">Co leader: Victor Santos</p>

          <div className="tags-visualize">
            <h2 className="h2-tag">Tags:</h2>
            <div className="card-tag">
              <p className="tag-p p-tag">Python</p>
            </div>
          </div>

        </div>
        <div className="line"></div>
        <div className="grid-4 right-side">
        <div className="status-info" >

          <div className="info-visualize">
            <div className="icons-visualize"><img width={28} src={UserIcon} /></div>
            <div className="p-visualize"><p >25/50</p></div>
          </div>

          <div className="info-visualize">
            <div className="icons-visualize"><img width={28} src={AwardIcon} /></div>
            <div className="p-visualize"><p >Status: Available</p></div>
          </div>

          <div className="info-visualize">
            <div className="icons-visualize"><img width={28} src={UserIcon} /></div>
            <div className="p-visualize"><p >Expiration date:</p>
            <p>23/02/2023</p></div>
          </div>

          <div className="line2"></div>

          <div  className="info-down"> 

            <div className="badge-visualize badge-center">
              <img width={28} src={AwardIcon} />
              <p className="p-badge">Badge</p>
            </div>
            
            <div className="badge-center"><img className="image-bagde" src="/public/Ellipse2.png"/></div>

            <div className="badge-center"><Button type="default" text="Subscribe" size="large" /></div>
          </div>
          </div>
          
        </div>
      </div>

    </div>

  );
};

export default VisualizeProject;
