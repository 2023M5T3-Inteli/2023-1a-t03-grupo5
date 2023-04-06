import React, { useEffect, useState } from "react";
import "./profile-styles.scss";
import { Link } from "react-router-dom";
import userService from "../../../main/services/userService";
import { useSearchParams } from "react-router-dom";

import imgProfile from '/public/imgProfile.png'
import Loading from "../../components/loading/loading";
import Card from "../../components/card/card";
import ProjectService from "../../../main/services/projectService";
import { toast } from "react-toastify";
import UserService from "../../../main/services/userService";


//404 page
const Profile = () => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({
        name: '',
        area: '',
        habilities: [''],
        photoURL: '',
        highlights: '',
        linkedin: ''
    });
    const [projects, setProjects] = useState<any>([])
    const [highlights, setHighligths] = useState<any>([])
    const [ranking, setRanking] = useState<any>(null)

    const [searchParams, setSearchParams] = useSearchParams();


    const getUser = async () => {
        const userId = searchParams.get("userId");
        if (!userId) {
            const response = await userService.validate();
            console.log(response.data)

            if (response.status === 200) {
                response.data.habilities = JSON.parse(response.data.habilities)
                setUser(response.data)
                setHighligths(JSON.parse(response.data.highlights))
            }
            else {
                toast.error("Error to load the user profile")
            }
        } else {
            const response = await userService.findByID(userId);
            console.log(response.data)

            if (response.status === 200) {
                response.data.habilities = JSON.parse(response.data.habilities)
                setUser(response.data)
                setHighligths(JSON.parse(response.data.highlights))
                getRanking()
            }
            else {
                toast.error("Error to load the user profile")
            }
        }
    }

    const getProjects = async () => {
        setLoading(true)
        const response = await ProjectService.filter({ "name": "Project Teste 3" })
        // const response = await ProjectService.findAll()
        console.log(response)

        if (response.status === 201) {
            setProjects(response.data)
            setLoading(false)
        }
        else {
            toast.error("Error to load the project history")
        }
    }

    const getRanking = async (id?: string) => {
        setLoading(true)
        let response: any

        // if (id) {
        //     response = await UserService.getRanking(id)
        // }
        // else {
        //     response = await UserService.getRanking()
        // }
        
        response = await UserService.getRanking()

        if (response.status === 200) {
            setRanking(response.data)
            setLoading(false)
        }
        else {
            toast.error("Error to loading ranking")
        }
    }

    useEffect(() => {
        getUser()
        getProjects()
    }, []);

    return (
        <div className="profile">
            {loading && <Loading />}
            <div className="backgroundProfile">
                <div className="flexProfile">
                    <div className="first">
                        <div className="infosPessoal">
                            <div className="photo">
                                <img className="imgProfile" src={user.photoURL}></img>
                            </div>
                            {/* <div className="photo">
                                <img className="imgProfile" src={user.photoURL}></img>
                            </div> */}
                            <div className="nameDiv">
                                <h1 className="name">{user.name}</h1>
                            </div>
                            <div className="areaDiv">
                                <p className="area">{user.area}</p>
                            </div>
                            <div className="linkedinDiv">
                                <img width={36} src={"/linkedin.png"}></img>
                                <p className="linkedinText">{user.linkedin}</p>
                            </div>
                            {/* <div className="curriculumDiv">
                                <button className="btnCurriculum">
                                    <img width={28} src={"/share.png"}></img>
                                    <p className="curriculumText">Curriculum</p>
                                </button>
                            </div> */}
                        </div>
                    </div>
                    <div className="second">
                        <div className="ranking-container">
                            <div className="position">
                                {
                                    ranking &&
                                    <p className="positionText">Position at Ranking: {ranking.position}</p>
                                }
                            </div>
                            <div className="tagsDiv">
                                <p className="tagTextTitle">Habilities: </p>
                                <div className="tags">
                                    {/* <div className="tag">
                                        <p className="tagText">{user.habilities}</p>
                                    </div> */}
                                    {
                                        user.habilities.length > 0 && user.habilities[0] !== '' ?
                                            user.habilities.map((hability: string, index: number) => {
                                                return (
                                                    <div className="tag" key={`${hability}-${index}`}>
                                                        <p className="tagText">{hability}</p>
                                                    </div>
                                                )
                                            })
                                            :
                                            <div className="no-habilities">
                                                <p className="tagText">No habilities</p>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="highligths">
                            <div className="highligthsTitle">
                                <p className="highligthsTitleText">Highligths</p>
                                <img width={28} src={"/award.png"}></img>
                            </div>
                            <div className="highligthsDiv">
                                {
                                    highlights.length > 0 ?
                                        highlights.slice(0, 3).map((highlight: any, index: number) => {
                                            return (
                                                <div className="itemHighligth" key={`${highlight}-${index}`}>
                                                    <img className="imgHighlight" width={110} src={highlight.badge}></img>
                                                </div>
                                            )
                                        })
                                        : <p style={{ "marginTop": "20px", "marginBottom": "20px", "color": "white" }}>Você não possui Badges :(</p>
                                }
                                {/* <div className="itemHighligth">
                                    <img className="imgHighlight" width={110} src={"/Ellipse2.png"}></img>
                                </div>
                                <div className="itemHighligth">
                                    <img className="imgHighlight" width={110} src={"/Ellipse2.png"}></img>
                                </div>
                                <div className="itemHighligth">
                                    <img className="imgHighlight" width={110} src={"/Ellipse2.png"}></img>
                                </div>
                                <p>{JSON.stringify(highlights[0])}</p> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="divider"></div>

                <div className="history-title">
                    <p>History</p>
                </div>
                <div className="project-history">
                    {
                        projects.map((project: any, index: number) => {
                            return (
                                <Link to="/visualizeProject" state={{ projectId: project.projectId }} key={`${project.name}-${index}`}>
                                    <div className='project-container grid-6'>
                                        <Card {...project}></Card>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Profile;
