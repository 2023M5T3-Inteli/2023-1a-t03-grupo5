import React from "react"
import { useState, useEffect } from "react"
import "./approveProject.scss"
import { Link, useSearchParams } from "react-router-dom"
import Briefcase from "/public/briefcase.png"
import BadgeTag from "/public/award.png"
// import Users from "/public/users.png"
import ellipse from "/public/Ellipse2.png"
import Plus from "/public/plus.png"
import Button from '../../components/button/button'
import Calendar from '/public/Calendar.png'
import ProjectService from "../../../main/services/projectService"
import { toast } from 'react-toastify'

const ApproveProject = () => {
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams();
    const [project, setProject] = useState<any>({
        name: "",
        roles: [
            {
                area: "",
                role: "",
                vacancies: ''
            }
        ]
    })

    const getProject = async () => {
        let projectId = searchParams.get("projectId")
        console.log(projectId)

        if (projectId) {
            let response = await ProjectService.findByID(projectId)

            if (response.status === 200) {
                response.data.roles = JSON.parse(response.data.roles)
                response.data.tags = JSON.parse(response.data.tags)
                setProject(response.data)
                setLoading(false)
            }
            else {
                toast.error("Error to load the project")
            }
        }
    }

    const approveProject = async () => {
        let token = searchParams.get("token")

        console.log(token)
        if (token) {
            let response = await ProjectService.approve(token, "Approved")
            console.log(response)

            if (response.status === 200) {
                toast.success("Project approved with success")
            }
            else {
                toast.error("Error to approve the project")
            }
        }
    }

    useEffect(() => {
        getProject()
    }, [])

    const [projectTagsRoles, setProjectTagsRoles] = useState({
        rolesProject: ["Developer", "Scrum Master", "DevOps"]
    })

    return (
        <div id="approve_project">
            <div className="container">
                <div className="grid-7 left-side">

                    <h1>{project.name}</h1>

                    <div className="description-project">
                        <p>{project.description}</p>
                    </div>

                    <div className="roles">
                        <p>Roles:</p>
                        {
                            project.roles.map((item: any, index: number) => {
                                return (
                                    <div className="tag-roles" key={`${item.role}-${index}`}>
                                        <p>{item.area}</p>
                                        <p>{item.role}</p>
                                        <p>{item.vacancies} vacancies</p>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="dates grid-4">
                        <div className="name-date">
                            <div className="img-calendar">
                                <img src={Calendar} alt="" />
                            </div>
                            <div className="text-date">
                                <p>Start Date:</p>
                                <p>XX/XX/XXXX</p>
                            </div>
                        </div>

                        <div className="name-date">
                            <div className="img-calendar">
                                <img src={Calendar} alt="" />
                            </div>
                            <div className="text-date">
                                <p>End Date:</p>
                                <p>XX/XX/XXXX</p>
                            </div>
                        </div>

                        <div className="name-date">
                            <div className="img-calendar">
                                <img src={Calendar} alt="" />
                            </div>
                            <div className="text-date">
                                <p>Expiration Date:</p>
                                <p>XX/XX/XXXX</p>
                            </div>
                        </div>
                    </div>

                    <div className="tags grid-4">
                        <p>Tags:</p>
                        <div className="tags-languages">
                            <p>Python</p>
                        </div>
                        <div className="tags-languages">
                            <p>Java</p>
                        </div>
                        <div className="tags-languages">
                            <p>C#</p>
                        </div>
                    </div>
                </div>

                <div className="vertical-line"></div>

                <div className="grid-5 right-side">
                    <div className="leader">
                        <div className="briefcase-image">
                            <img src={Briefcase} alt="" />
                        </div>

                        <div className="names-leader">
                            <div className="role-leader">
                                <p>Leader: Felipe Saladys</p>
                            </div>
                            <div className="role-coleader">
                                <p>Coleader: Reinaldo Hagge</p>
                            </div>
                        </div>
                    </div>

                    <div >
                        <hr className="horizontal-line" />
                    </div>

                    <div className="nft">
                        <div className="badge">
                            <img className="badge-image" src={BadgeTag} alt="" />
                            <p>Badge</p>
                        </div>
                        <img className="nft-image" src={ellipse} alt="" />
                    </div>

                    <div className="buttons-aprove-refuse">
                        <div className="buttons-aprove">
                            <Button
                                type='default'
                                text='Approve'
                                size='medium'
                                onClick={() => approveProject()}
                            />
                        </div>

                        <div className="buttons-refuse">
                            <Button
                                type='cancel'
                                text='Refuse'
                                size='medium'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default ApproveProject;