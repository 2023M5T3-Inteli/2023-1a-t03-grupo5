import React, { useEffect } from "react"
import { useState } from "react"
import "./applicationForm-styles.scss"
import { Link, useLocation } from "react-router-dom"
import Input from '../../components/input/input'
import Button from '../../components/button/button'
import Ellipse from "/public/Ellipse2.png"
import Select from "../../components/select/select"
import ProjectService from "../../../main/services/projectService"
import { toast } from "react-toastify"

type Props = {
    closeModal: Function;
}

const ApplicationForm = (props: Props) => {
    const location = useLocation()
    const [vacancies, setVacancies] = useState('');

    function submitApplicationForm() {
        console.log(`Vacancy of interest: ${vacancies}`);
    }

    function handleVacanciesChange(event: React.ChangeEvent<HTMLInputElement>) {
        setVacancies(event.target.value);
    }

    const [data, setData] = useState({
        roleId: "",
        why: "",
        habilities: ""
    });

    const [project, setProject] = useState<any>(null)
    const [roleOptions, setRoleOptions] = useState([
        {
            value: "",
            label: ""
        }
    ])

    const [projectData, setProjectData] = useState({
        tags: ["python", "java", "c++", "php", "java-script"]
    });

    const createRoleOptions = (data: any) => {
        let roles: any = []
        data.roles.map((item: any, index: number) => {
            console.log(item)
            item.role ?
                roles.push({
                    value: item.role,
                    label: `${item.role} (${item.vacancies} vacancies)`
                })
                :
                roles.push({
                    value: item.area,
                    label: `${item.area} (${item.vacancies} vacancies)`
                })
        })

        setRoleOptions(roles)
    }

    const getProject = async (id: string) => {
        let response = await ProjectService.findByID(id)

        if (response.status === 200) {
            response.data.roles = JSON.parse(response.data.roles)
            response.data.tags = JSON.parse(response.data.tags)
            setProject(response.data)
            console.log(response.data)
            createRoleOptions(response.data)
        }
        else {
            toast.error("Error to load the project")
        }
    }

    useEffect(() => {
        getProject(location.state.projectId)
    }, [])

    return (
        <div className="application-form">
            <div className="container">
                <div className="grid-6 left-side">
                    <h1>Application Form</h1>
                    <div className="input-container">
                        <p>Role of interest</p>

                        <div className="select-vacancy-interest">
                            <Select
                                options={roleOptions}
                                default="Choose role"
                                onChange={(value: string) => setData({ ...data, roleId: value })}
                                size='large'
                            />
                        </div>


                        <p>Why do you want this vacancy?</p>
                        <div >
                            <Input
                                className="input-want-vacancy"
                                placeholder={"Talk about it..."}
                                type={""}
                                size='large'
                                value={""}
                                onChange={(value: string) => setData({ ...data, why: value })}
                            />
                        </div>

                        <p>What skills do you want to develop?</p>
                        <div className="">
                            <Input
                                className="input-vacancy-skill"
                                placeholder={""}
                                type={""}
                                size='large'
                                value={""}
                                onChange={(value: string) => ({ ...data, habilities: value })}
                            />
                        </div>
                    </div>
                    <div>
                        <Button
                            type='default'
                            text='Submit'
                            size='medium'
                            onClick={submitApplicationForm()}
                        ></Button>
                    </div>
                </div>


                <div className="grid-6 right-side">

                    <div className="calendar">
                        <div className="start-date-calendar">
                            <p>Start date</p>
                            {
                                project &&
                                <p>
                                    {new Date(project.start).getDate()}/
                                    {new Date(project.start).getMonth() + 1}/
                                    {new Date(project.start).getFullYear()}
                                </p>
                            }
                        </div>

                        <div className="end-date-calendar">
                            <p>End date</p>
                            {
                                project &&
                                <p>
                                    {new Date(project.end).getDate()}/
                                    {new Date(project.end).getMonth() + 1}/
                                    {new Date(project.end).getFullYear()}
                                </p>
                            }
                        </div>
                    </div>

                    <div className="skills">
                        <p className="tags-txt">Tags:</p>
                        {
                            project &&
                            project.tags.map((tag: string, index: number) => {
                                return (
                                    <div className="tag grid-4" key={`${tag}-${index}`}>
                                        <div className="tag-container">
                                            <p>{tag}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }


                        {/* quando quero add mais uma linguagem é só criar uma div com o classname = language */}

                        {/* <div className="language">
                                <p>kkk</p>
                            </div> */}
                    </div>
                    <div className="roles">
                        <p className="role-txt">Roles:</p>
                        <div className="role-official">
                            {
                                project &&
                                project.roles.map((item: any, index: number) => {
                                    return (
                                        <div className="role-habilit grid-4">
                                            <p>{item.role ? item.role : item.area} (0/{item.vacancies})</p>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>

                    <div >
                        <img className="image-Ellipse" src={Ellipse} alt="" />
                    </div>
                </div>

            </div>
        </div >
    )
}


export default ApplicationForm;