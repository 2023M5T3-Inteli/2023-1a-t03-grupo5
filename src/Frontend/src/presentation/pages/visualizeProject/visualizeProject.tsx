import React from "react";
import "./visualizeProject-styles.scss";
import EditIcon from "@mui/icons-material/Edit";
import Card from "../../components/card/card";
import UserIcon from '../../../../public/user.png'
import StarIcon from '../../../../public/star.png'
import AwardIcon from '../../../../public/award.png'
import Button from '../../components/button/button'
import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
import ProjectService from "../../../main/services/projectService";
import UserService from "../../../main/services/userService"
import Loading from "../../components/loading/loading";


// type Props = {
//   closeModal: Function;
//   openEdit: Function;
//   openApply: Function;
// }


const VisualizeProject: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [project, setProject] = useState({
    name: "Loading...", 
    description: "loading...",
    ownerId:"loading...",
    coleaderId: "loading...",
    status: "loading...",
    end:"xx/xx/xxx",
  })
  const [ownerName, setOwnerName] = useState("")
  const [coleaderName, setColeaderName] = useState("")

  const getUser = async (id: string) => {
    const response = await UserService.findByID("1d344c78-15d2-453d-848c-d31ac003cd48")
    console.log(response)

    return response
  }

  const getProject = async () => {
    const response = await ProjectService.findByID("d252a33c-5f3d-4194-a5b3-7241cfa738d6")
    setProject(response)
    console.log(response)
    
    let owner = await getUser(project.ownerId)
    let coleader = await getUser(project.coleaderId)

    setOwnerName(owner.name)
    setColeaderName(coleader.name)

    setLoading(false)
  }

  useEffect(() => {
    
    getProject()

  },[])

  return (
    <div className="visualize-project">
      {loading && <Loading />}
      <div className="container-visualize">
        <div className=" grid-8 project-info" >
        <div className=" project-start">
        <h1>{project.name}</h1>
        <img width={28} src={StarIcon} />
        </div>
        <p className="p-project">
            {project.description}
          </p>
          <p className="p-project">Leader: {ownerName}</p>
          <p className="p-project">Co leader: {coleaderName}</p>

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
            <div className="p-visualize"><p >Status: {project.status}</p></div>
          </div>

          <div className="info-visualize">
            <div className="icons-visualize"><img width={28} src={UserIcon} /></div>
            <div className="p-visualize"><p >Expiration date:</p>
            <p>{new Date(project.end).getMonth()}/{new Date(project.end).getDate()}/{new Date(project.end).getFullYear()}</p></div>
          </div>

          <div className="line2"></div>

          <div  className="info-down"> 

              <div className="badge-visualize badge-center">
                <img width={28} src={AwardIcon} />
                <p className="p-badge">Badge</p>
              </div>

              <div className="badge-center"><img className="image-bagde" src="/public/Ellipse2.png" /></div>

              <Link to="/applicationForm">
                <div className="badge-center"><Button type="default" text="Subscribe" size="large" /></div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
};

export default VisualizeProject
