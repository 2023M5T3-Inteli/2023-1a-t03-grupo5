import React, { useEffect, useState } from "react";
import "./profile-styles.scss";
import { Link } from "react-router-dom";
import userService from "../../../main/services/userService";

import imgProfile from '/public/imgProfile.png'
import Loading from "../../components/loading/loading";
import Card from "../../components/card/card";
import ProjectService from "../../../main/services/projectService";
import { toast } from "react-toastify";

//404 page
const Profile = () => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({
        name: '',
        area: '',
        habilities: [''],
        photoURL: ''
    });
    const [projects, setProjects] = useState<any>([])

    const getUser = async () => {
        const response = await userService.validate();
        console.log(response.data)

        if (response.status === 200) {
            response.data.habilities = JSON.parse(response.data.habilities)
            setUser(response.data)
            setLoading(false)
        }
        else {
            toast.error("Error to load the user profile")
        }
    }

    const getProjects = async () => {
        setLoading(true)
        let data = null
        const response = await ProjectService.filter(data);
        console.log(response)

        if (response.status === 200) {
            setProjects(response.data)
            setLoading(false)
        }
        else {
            toast.error("Error to load the project history")
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
                                <p className="linkedinText">www.linkedIn/victor</p>
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
                                <p className="positionText">Position at Ranking: 1st</p>
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
                                <div className="itemHighligth">
                                    <img className="imgHighlight" width={110} src={"/Ellipse2.png"}></img>
                                </div>
                                <div className="itemHighligth">
                                    <img className="imgHighlight" width={110} src={"/Ellipse2.png"}></img>
                                </div>
                                <div className="itemHighligth">
                                    <img className="imgHighlight" width={110} src={"/Ellipse2.png"}></img>
                                </div>
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
