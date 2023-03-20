import React from "react";
import Input from "../../components/input/input";
import "./visualizeProject-styles.scss";
import EditIcon from "@mui/icons-material/Edit";
import Card from "../../components/card/card";
import { Grid, Row, Col } from "react-flexbox-grid";

// type Props = {
//   closeModal: Function;
//   openEdit: Function;
//   openApply: Function;
// }

const VisualizeProject: React.FC = () => {
  return (
    <Grid fluid>
      <Row className="visualize-project" >
        <Col
          xs={10}
          className="card-visualize">
          <Row around="sm">
          <Col xs={8} className="visualize-info">
            <h1>Project Title</h1>
            <p className="p-visualize">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <p className="p-visualize">Leader: Gabriel Batista</p>
            <p className="p-visualize">Co leader: Victor Santos</p>
            <Row className="tags-visualize">
              <h2>tags:</h2>
              <Col className="card-tag"><p className="tag-p">Python</p></Col>
            </Row>
          </Col>
          <Col className="line"></Col>
          <Col  xs={3} className="status-info">
              <Row className="peoples"><img width={20} height={40} src="../../../public/user.png"></img><p className="p-visualize">25/50</p></Row>
            <p className="p-visualize">Status: Available</p>
            <p className="p-visualize">Expiration date: 20/03/2023</p>
            <Col className="line2"></Col>
            <p className="p-visualize">Badge</p>
            <button></button>
          </Col>
          </Row>
        </Col>
      </Row>
    </Grid>
  );
};

export default VisualizeProject;

{
  /* <div onClick={() => props.openEdit()}>
              <EditIcon />
            </div> */
}
{
  /* <h2>Prazo para Inscrição: xx/xx/xx </h2> */
}

{
  /* <div className="visualize-project grid-12">
      <div className="card-visualize grid-12">
        <div className="grid-9 visualize-info">
        <h1>Project Title</h1>
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
          <p>Leader: Gabriel Batista</p>
          <p>Co leader: Victor Santos</p>
          </div>
          <div className="grid-3 status-info">
            <p>mariana silva</p>
        </div>
      </div> 
     </div>*/
}
