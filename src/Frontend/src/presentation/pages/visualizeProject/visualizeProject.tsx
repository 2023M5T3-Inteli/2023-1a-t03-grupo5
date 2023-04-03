import React from "react";
import "./visualizeProject-styles.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "../../components/card/card";
import UserIcon from '../../../../public/user.png'
import StarIcon from '../../../../public/star.png'
import AwardIcon from '../../../../public/award.png'
import Button from '../../components/button/button'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProjectService from "../../../main/services/projectService";
import UserService from "../../../main/services/userService"
import Loading from "../../components/loading/loading";
import DeleteProject from "../deleteProject/deleteProject";
import Modal from "../../components/modal/modal";


// type Props = {
//   closeModal: Function;
//   openEdit: Function;
//   openApply: Function;
// }

type Props = {
  user: any;
}

const VisualizeProject: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [project, setProject] = useState<any>({
    name: "Loading...",
    description: "loading...",
    ownerId: "loading...",
    coleaderId: "loading...",
    status: "loading...",
    end: "xx/xx/xxx",
    tags: "",
    roles: ""
  })
  const [isOwner, setIsOwner] = useState(false)
  const [ownerName, setOwnerName] = useState("")
  const [coleaderName, setColeaderName] = useState("")

  const getUser = async (id: string) => {
    console.log(id)
    const response = await UserService.findByID(id)
  
    if(response.status === 200) {
      return response.data
    }

    return null
  }

  const getProject = async () => {
    console.log(location.state)
    const response = await ProjectService.findByID(location.state.projectId)
    response.data.tags = JSON.parse(response.data.tags)
    response.data.roles = JSON.parse(response.data.roles)
    setProject(response.data)
    console.log(response)

    let owner = await getUser(response.data.ownerId)
    let coleader = await getUser(response.data.coleaderId)

    setOwnerName(owner.name)
    setColeaderName(coleader.name)

    const user = await UserService.validate()

    if (user.data.id === response.data.ownerId || user.data.id === response.data.coleaderId) {
      console.log("is owner")
      setIsOwner(true)
    }
    console.log("not owner")

    {/*console.log(owner, coleader)*/}

    setLoading(false)
  }

  const deleteProject = async () => {
    setOpenDeleteModal(false)
    let response = await ProjectService.delete(project.projectId)
    console.log(response)
    // if(response) {
    //   navigate("/")
    // }
  }

  useEffect(() => {
    getProject()
  }, [])

  const toggleDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal)
  }

  return (
    <div className="visualize-project">
      {loading && <Loading />}
      <div className="container-visualize">
        <div className=" grid-8 project-info" >
          <div className=" project-start">
            <h1>{project.name}</h1>
            {/* <img width={28} src={StarIcon} /> */}
            {
              isOwner &&
              <>
                <Link to="/editProject" state={{ projectId: location.state.projectId }}>
                  <EditIcon className="edit-icon" />
                </Link>
                <div onClick={() => toggleDeleteModal()}>
                  <DeleteIcon className="delete-icon" />
                </div>
              </>
            }
          </div>
          {
            openDeleteModal && <Modal type="warning" closeModal={() => toggleDeleteModal()} content={<DeleteProject delete={() => deleteProject()} closeModal={() => toggleDeleteModal()} />} />
          }
          <p className="p-project">
            {project.description}
          </p>
          <p className="p-project">Leader: {ownerName}</p>
          <p className="p-project">Co leader: {coleaderName}</p>

          <div className="tags-visualize">
            <h2 className="h2-tag">Tags:</h2>
            {
              project.tags && project.tags.map((tag: string, index: number) => {
                return (
                  <div className="card-tag" key={`${tag}-${index}`}>
                    <p className="tag-p p-tag">{tag}</p>
                  </div>
                )
              })
            }
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

            <div className="info-down">

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
