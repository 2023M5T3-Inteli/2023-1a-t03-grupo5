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
        habilities: '',
        photoURL: ''
    });
    const [projects, setProjects] = useState<any>([])

    const getUser = async () => {
        const response = await userService.validate();

        if (response.status === 200) {
            console.log(user)
            setUser(user)
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
        console.log(response.data)

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
                                <img className="imgProfile" src={imgProfile}></img>
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
                                <p className="tagTextTitle">Tags: </p>
                                <div className="tags">
                                    {/* <div className="tag">
                                        <p className="tagText">{user.habilities}</p>
                                    </div> */}
                                    <div className="tag">
                                        <p className="tagText">Tag 2</p>
                                    </div>
                                    <div className="tag">
                                        <p className="tagText">Tag 3</p>
                                    </div>
                                    <div className="tag">
                                        <p className="tagText">Tag 4</p>
                                    </div>
                                    <div className="tag">
                                        <p className="tagText">Tag 5</p>
                                    </div>
                                    <div className="tag">
                                        <p className="tagText">Tag 6</p>
                                    </div>
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
