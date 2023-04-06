import React from "react"
import "./visualizeProject-styles.scss"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import Card from "../../components/card/card"
import UserIcon from "../../../../public/user.png"
import StarIcon from "../../../../public/star.png"
import AwardIcon from "../../../../public/award.png"
import CalenderIcon from "../../../../public/calendar.png"
import Button from "../../components/button/button"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import ProjectService from "../../../main/services/projectService"
import UserService from "../../../main/services/userService"
import Loading from "../../components/loading/loading"
import DeleteProject from "./components/deleteProject/deleteProject"
import Modal from "../../components/modal/modal"
import { toast } from "react-toastify"
import FinishProject from "./components/finishProject/finishProject"
import { ethers } from "ethers";
import Contract from "../../../../../Blockchain/build/contracts/DellFactory.json";

// type Props = {
//   closeModal: Function
//   openEdit: Function
//   openApply: Function
// }
type Props = {
  user: any
}
const VisualizeProject: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openFinishModal, setOpenFinishModal] = useState(false)

  const [project, setProject] = useState<any>({
    name: "Loading...",
    description: "loading...",
    ownerId: "loading...",
    coleaderId: "loading...",
    status: "loading...",
    end: "xx/xx/xxx",
    tags: "",
    roles: "",
  })

  const [isOwner, setIsOwner] = useState(false)
  const [ownerName, setOwnerName] = useState("")
  const [coleaderName, setColeaderName] = useState("")
  const [meta, setMeta] = useState(false)
  const [alreadyMinted, setAlreadyMinted] = useState(false)

  const getUser = async (id: string) => {
    const response = await UserService.findByID(id)

    if (response.status === 200) {
      return response.data
    }
    return null
  }

  const getProject = async () => {
    const response = await ProjectService.findByID(location.state.projectId)
    response.data.tags = JSON.parse(response.data.tags)
    response.data.roles = JSON.parse(response.data.roles)
    setProject(response.data)
    console.log(response.data)

    let owner = await getUser(response.data.ownerId)

    if (owner) {
      setOwnerName(owner.name)
    }
    else {
      toast.error("Error to load project informations")
    }

    if (response.data.coleaderId) {
      let coleader = await getUser(response.data.coleaderId)
      setColeaderName(coleader.name)
    }

    const user = await UserService.validate()
    if (user.data.id === response.data.ownerId || user.data.id === response.data.coleaderId) {
      setIsOwner(true)
      user.data.highlights = JSON.parse(user.data.highlights)
      verifyIfAlreadyMinted(user.data, response.data);
    }

    setLoading(false)
  }

  const verifyIfAlreadyMinted = async (user: any, project: any) => {
    if (user.highlights) {
      user.highlights.map((highlight: any) => {
        if (highlight.projectId === project.projectId) {
          setAlreadyMinted(true)
        }
      })
    }
  }

  const deleteProject = async () => {
    setOpenDeleteModal(false)
    let response = await ProjectService.delete(project.projectId)
    // if(response) {
    //   navigate("/")
    // }
    if (response.status === 200) {
      navigate('/')
      toast.success("Delete project with success")
    }
    else {
      toast.error("Undeleted project")
    }

  }

  const transferNFT = async (image: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contractAddress = "0xD4cd70Ef63F0470917d07b6f297C6c8a73612B75";

    const contractInstance = new ethers.Contract(
      contractAddress,
      Contract.abi,
      signer
    );

    await contractInstance.mintAchievement(image);
  };

  const onSubmit = async () => {
    try {
      await transferNFT(project.badge);

      const achievement = {
        highlight: {
          "projectId": project.projectId,
          "badge": project.badge
        }
      }

      const response: any = await UserService.addHighligth(achievement)

      if (response.status === 201) {
        toast.success("NFT transfered with success")
        navigate(0)
      } else {
        toast.error("Error to add achievement")
      }
    } catch (error) {
      toast.error("Error to transfer NFT")
    }

  };

  const finishProject = async () => {
    let response = await ProjectService.finish(project.projectId)

    if (response.status === 200) {
      toast.success("Project finished with success")
      toggleFinishModal()
    }
    else {
      console.log(response)
      toast.error(`Error to finish the project - ${response.error}`)
    }
  }

  const toggleDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal)
  }

  const toggleFinishModal = () => {
    setOpenFinishModal(!openFinishModal)
  }

  const getAccount = async () => {
    if (!window.ethereum) {
      toast.error("Install MetaMask")
      return false;
    }
    try {
      const res = await window.ethereum.request({
        method: 'eth_accounts',
      });
      return res[0];
    } catch (err) {
      return false;
    }
  }

  const connectToMetamask = async () => {
    try {
      const res = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const mumbaiNetwork = "0x13881";
      if (window.ethereum.chainId !== mumbaiNetwork) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: mumbaiNetwork }],
        });
      }
      setMeta(true)
      toast.success("Connect with success")
    } catch (err) {
      toast.error("Error to connect to metamask")
    }
  };

  const getVacancies = () => {
    let vacancies = 0

    if (project.roles) {
      console.log(project.roles)
      project.roles.map((item: any, index: number) => {
        vacancies += +item.vacancies
      })

      let members = 0
      project.applies.map((apply: any, index: number) => {
        if (apply.status === "Approved") {
          members += 1
        }
      })

      return `(${members}/${vacancies})`
    }
  }

  useEffect(() => {
    getProject()

    let account: any;

    const get = async () => {
      account = await getAccount();

      console.log(account)

      if (account) { setMeta(true) }
    }

    get();
  }, [])

  return (
    <div className="visualize-project">
      {
        !meta &&
        <div className="btnMeta">
          <img src={"/MetaMask_Fox.png"} width={40}></img>
          <button onClick={() => { connectToMetamask() }}>Connect to Metamask</button>
        </div>
      }


      {loading && <Loading />}
      <div className={`container-visualize ${!meta && "showMeta"}`}>
        <div className=" grid-8 project-info">
          <div className=" project-start">
            <h1>{project.name}</h1>
            {/* <img width={28} src={StarIcon} /> */}
            {isOwner && project.status !== "Finished" && (
              <>
                <Link
                  to="/editProject"
                  state={{ projectId: location.state.projectId }}
                >
                  <EditIcon className="edit-icon" />
                </Link>
                <div onClick={() => toggleDeleteModal()}>
                  <DeleteIcon className="delete-icon" />
                </div>
              </>
            )}
          </div>


          {
            openDeleteModal && (
              <Modal
                type="warning"
                closeModal={() => toggleDeleteModal()}
                content={
                  <DeleteProject
                    delete={() => deleteProject()}
                    closeModal={() => toggleDeleteModal()}
                  />
                }
              />
            )
          }

          {
            openFinishModal && (
              <Modal
                type="warning"
                closeModal={() => toggleFinishModal()}
                content={
                  <FinishProject
                    finish={() => finishProject()}
                    closeModal={() => toggleFinishModal()}
                  />
                }
              />
            )
          }

          <p className="p-project">{project.description}</p>
          <p className="p-project">Leader: {ownerName}</p>
          {
            coleaderName.length > 0 &&
            <p className="p-project">Co leader: {coleaderName}</p>
          }
          <div className="tags-visualize">
            <h2 className="h2-tag">Tags:</h2>
            {project.tags &&
              project.tags.map((tag: string, index: number) => {
                return (
                  <div className="card-tag" key={`${tag}-${index}`}>
                    <p className="tag-p p-tag">{tag}</p>
                  </div>
                )
              })}
          </div>
          <div className="card-visualize-roles">
            <h2 className="h2-roles">Roles</h2>
            <div className="list-roles">
              {
                !loading && project.roles &&
                project.roles.map((item: any, index: number) => {
                  return (
                    <div className="roles-line" key={`${item.role}-${index}`}>
                      <div className="visualize-roles"><p className="p-roles">{item.area}</p></div>
                      {
                        item.area !== "Shadowing" &&
                        <div className="visualize-roles"><p className="p-roles">{item.role}</p></div>
                      }
                      <div className="visualize-roles"><p className="p-roles">{item.vacancies} vacancies</p></div>
                    </div>
                  )
                })
              }
            </div>
          </div>

          {
            project.feedback &&
            <div className="feedback"><strong>Reprove Feedback:</strong> {project.feedback}</div>
          }
        </div>

        <div className="line"></div>
        <div className="grid-4 right-side">
          <div className="status-info">
            <div className="info-visualize">
              <div className="icons-visualize">
                <img width={28} src={UserIcon} />
              </div>
              <div className="p-visualize">
                {
                  project.applies &&
                  <p>{getVacancies()}</p>
                }
              </div>
            </div>
            <div className="info-visualize">
              <div className="icons-visualize">
                <img width={28} src={AwardIcon} />
              </div>
              <div className="p-visualize">
                <p>Status: {project.status}</p>
              </div>
            </div>
            <div className="info-visualize">
              <div className="icons-visualize">
                <img width={28} src={CalenderIcon} />
              </div>
              <div className="p-visualize">
                <p>Project start:</p>
                <p>
                  {new Date(project.start).getDate() + 1}/
                  {new Date(project.start).getMonth() + 1}/
                  {new Date(project.start).getFullYear()}
                </p>
              </div>
            </div>
            <div className="info-visualize">
              <div className="icons-visualize">
                <img width={28} src={CalenderIcon} />
              </div>
              <div className="p-visualize">
                <p>Project end:</p>
                <p>
                  {new Date(project.end).getDate() + 1}/
                  {new Date(project.end).getMonth() + 1}/
                  {new Date(project.end).getFullYear()}
                </p>
              </div>
            </div>
            <div className="line2"></div>
            <div className="info-down">
              <div className="badge-visualize badge-center">
                <img width={28} src={AwardIcon} />
                <p className="p-badge">Badge</p>
              </div>
              <div className="badge-center">
                <img className="image-bagde" src={project.badge} />
                {/* <p>{project.badge}</p> */}
              </div>
              {
                !loading &&
                <>
                  {
                    isOwner && project.status !== "Finished" && project.status !== "Pending" && project.status !== "Reproved" &&
                    <div className="badge-center">
                      <Link to={"/registrations"} state={{ projectId: location.state.projectId }}>
                        <Button type="terceary" text="View applies" size="medium" onClick={() => false}/>
                      </Link>
                      <Button type="default" text="Finish project" size="medium" onClick={() => toggleFinishModal()} />
                    </div>
                  }
                  {
                    !alreadyMinted ?
                      meta ?
                        project.status === "Finished" &&
                        <div className="badge-center">
                          <Button type="default" text="Claim NFT" size="large" onClick={() => { onSubmit() }} />
                        </div>
                        : project.status === "Finished" &&
                        <div className="badge-center">
                          <p style={{ "color": "white", "fontSize": "20px" }}>You need to connect with Metamask</p>
                        </div>
                      :
                      <div className="badge-center">
                        <p style={{ "color": "white", "fontSize": "20px" }}>Already Minted</p>
                      </div>
                  }
                  {
                    !isOwner && project.status !== "Finished" &&
                    <Link to="/applicationForm" state={{ projectId: location.state.projectId }}>
                      <div className="badge-center">
                        <Button type="default" text="Subscribe" size="large" />
                      </div>
                    </Link>
                  }
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default VisualizeProject
