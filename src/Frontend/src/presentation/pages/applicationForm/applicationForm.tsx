import React, { useEffect } from "react"
import { useState } from "react"
import "./applicationForm-styles.scss"
import { Link } from "react-router-dom"
import Input from '../../components/input/input'
import Button from '../../components/button/button'
import Ellipse from "/public/Ellipse2.png"
import Select from "../../components/select/select"

type Props = {
    closeModal: Function;
}

const ApplicationForm = (props: Props) => {

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


    const [rolesOptions, setRolesOptions] = useState([
        {
            value: "1",
            label: "DevOps (5 vacancies)"
        },
        {
            value: "2",
            label: "Design (3 vacancies)"
        }
    ])

    const [projectData, setProjectData] = useState({
        tags: ["python", "java", "c++", "php", "java-script"]
    });

    useEffect(() => {
        console.log(data)
    }, [data.why])

    return (
        <div className="application-form">
            <div className="container">
                <div className="grid-6 left-side">
                    <h1>Application Form</h1>
                    <div className="input-container">
                        <p>Role of interest</p>

                        <div className="select-vacancy-interest">
                            <Select
                                options={rolesOptions}
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
                            <p>XX/XX/XXXX</p>
                        </div>

                        <div className="end-date-calendar">
                            <p>End date</p>
                            <p>XX/XX/XXXX</p>
                        </div>
                    </div>

                    <div className="skills">
                        {
                            projectData.tags.map((tag: string) => {
                                return (
                                    <div className="tag grid-4">
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

                            <div className="role-habilit">
                                <p>Developer (3/5)</p>
                            </div>

                            <div className="role-habilit">
                                <p>Data Engineer (3/5)</p>
                            </div>

                            {/* <div className="role-habilit">
                                <p>Data Engineer (3/5)</p>
                            </div> */}
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