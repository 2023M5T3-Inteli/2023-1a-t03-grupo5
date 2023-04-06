import "./registrations-styles.scss";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "../../components/modal/modal";
import FeedbackRegistrantion from "./components/feedbackRegistrantion/feedbackRegistrantion";
import Button from "../../components/button/button";
import ModalConfirm from "./components/modalConfirm/modalConfirm";
import VisualizeApplication from "../visualizeApplication/visualizeApplication"
import ProjectService from "../../../main/services/projectService";
import { toast } from "react-toastify";
import UserService from "../../../main/services/userService";
import ApplyService from "../../../main/services/applyService";
import Loading from "../../components/loading/loading";


let Registrations = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [loading, setLoading] = useState(true)
    const [update, setUpdate] = useState(false)
    const [openFeedbackModal, setOpenFeedbackModal] = useState(false)
    const [actualApply, setActualApply] = useState<any>()
    const [openApplyModal, setOpenApplyModal] = useState(false)

    const [project, setProject] = useState<any>({
        applies: []
    })

    const toggleFeedbackModal = (apply: any) => {
        setActualApply(apply)
        setOpenFeedbackModal(!openFeedbackModal)
    }

    const [openConfirmModal, setOpenConfirmModal] = useState(false)

    const toggleConfirmModal = (apply: any) => {
        setActualApply(apply)
        setOpenConfirmModal(!openConfirmModal)
    }

    const toggleApplyModal = (apply: any) => {
        setActualApply(apply)
        setOpenApplyModal(!openApplyModal)
    }

    const changeStatus = async (status: string, feedback?: string) => {
        setLoading(true)

        let response
        if (feedback) {
            response = await ApplyService.changeStatus(actualApply.id, status, feedback)
        }
        else {
            response = await ApplyService.changeStatus(actualApply.id, status)
        }

        if (response.status !== 200) {
            toast.error(`Error to change the apply status to ${status}`)
        }
        else {
            setUpdate(!update)
            setLoading(false)
        }
    }

    const approve = async (id: string) => {
        setLoading(true)

        const response = await ApplyService.approveUser(id)

        if (response.status !== 200) {
            toast.error("Error to approve")
        }
        else {
            setUpdate(!update)
            setLoading(false)
        }
    }

    const confirm = () => {
        changeStatus("Pending")
        toggleConfirmModal(actualApply)
    }

    const refuseApply = (feedback: string) => {
        changeStatus("Refused", feedback)
        toggleFeedbackModal(actualApply)
    }

    const getProject = async (id: string) => {
        setLoading(true)
        let response = await ProjectService.findByID(id)

        if (response.status === 200) {
            response.data.roles = JSON.parse(response.data.roles)
            response.data.tags = JSON.parse(response.data.tags)
            setProject(response.data)
            console.log(response.data)
            setLoading(false)
        }
        else {
            toast.error("Error to load the project")
        }
    }

    useEffect(() => {
        getProject(location.state.projectId)
    }, [])

    useEffect(() => {
        getProject(location.state.projectId)
    }, [update])

    return (
        <div className="registrations">
            {loading && <Loading />}

            <div className="container">
                <div className="title">
                    <h1>Registrations</h1>
                    <div><img src={"/user.png"} /></div>
                </div>


                <div className="filter-div">
                    <div className="filter-input-div">
                        <input className="input-filter" placeholder="Search by name"></input>
                        <div className="icon-input-filter"><img width={28} src={"/search.png"} /></div>
                    </div>
                    <div className="filter-input-div">
                        <input className="input-filter" placeholder="Filter"></input>
                        <div className="icon-input-filter"><img width={28} src={"/filter.png"} /></div>
                    </div>
                </div>

                <div className="table">
                    <div className="container-table">

                        {

                            project.applies &&
                            project.applies.map((apply: any, index: number) => {
                                return (
                                    <div className="row" key={`${apply.user.name}-${index}`}>
                                        <div className="first-container">
                                            <p className="name-registry grid-8">{apply.user.name}</p>
                                            {
                                                apply.status === "Pending" ?
                                                    <div className="button-container grid-3">
                                                        <Button type="default" size="small" text="Approve" onClick={() => approve(apply.id)} />
                                                        <Button type="cancel" size="small" text="Refuse" onClick={() => toggleFeedbackModal(apply)} />
                                                    </div>
                                                    :
                                                    <div className="pending button-container grid-3">
                                                        <button className={apply.status} onClick={() => toggleConfirmModal(apply)}>{apply.status}</button>
                                                    </div>
                                            }
                                        </div>
                                        <div className="see-profile grid-3">
                                            <button className="button-see-profile" onClick={() => toggleApplyModal(apply)} >See Apply</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>

            {
                openFeedbackModal && <Modal type="warning" closeModal={() => toggleFeedbackModal(actualApply)} content={<FeedbackRegistrantion closeModal={() => toggleFeedbackModal(actualApply)} confirm={(feedback: string) => refuseApply(feedback)} />} />
            }

            {
                openConfirmModal && <Modal type="warning" closeModal={() => toggleConfirmModal(actualApply)} content={<ModalConfirm closeModal={() => toggleConfirmModal(actualApply)} confirm={() => confirm()} />} />
            }

            {
                openApplyModal && <Modal type="warning" size="large" closeModal={() => toggleApplyModal(actualApply)} content={<VisualizeApplication informations={actualApply} closeModal={() => toggleApplyModal(actualApply)} />} />
            }
        </div>
    )
}

export default Registrations;
