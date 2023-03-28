import "./registrations-styles.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/modal/modal";
import FeedbackRegistrantion from "./components/feedbackRegistrantion/feedbackRegistrantion";
import Button from "../../components/button/button";
import ModalConfirm from "./components/modalConfirm/modalConfirm";


let Registrations = () => {
    const [openFeedbackModal, setOpenFeedbackModal] = useState(false)
    const [actualApply, setActualApply] = useState(-1)

    const toggleFeedbackModal = (index: number) => {
        setActualApply(index)
        setOpenFeedbackModal(!openFeedbackModal)
    }

    const [openConfirmModal, setOpenConfirmModal] = useState(false)

    const toggleConfirmModal = (index: number) => {
        setActualApply(index)
        setOpenConfirmModal(!openConfirmModal)
    }

    const [data, setData] = useState([
        {
            name: "Felipe",
            status: "Pending"
        },
        {
            name: "Pedro",
            status: "Approved"
        },
        {
            name: "Rafaela",
            status: "Refused"
        }
    ])

    const changeStatus = (index: number, status: string) => {
        let newData = [...data]
        newData[index].status = status
        setData(newData)
    }

    const confirm = () => {
        let newData = [...data]
        newData[actualApply].status = "Pending"
        setData(newData)
        toggleConfirmModal(actualApply)
    }

    const refuseApply = () => {
        let newData = [...data]
        newData[actualApply].status = "Refused"
        setData(newData)
        toggleFeedbackModal(actualApply)
    }

    return (
        <div className="registrations">
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
                            data.map((apply: any, index: number) => {
                                return (
                                    <div className="row" key={`${apply.name}-${index}`}>
                                        <div className="first-container">
                                            <p className="name-registry grid-8">{apply.name}</p>
                                            {
                                                apply.status === "Pending" ?
                                                    <div className="button-container grid-3">
                                                        <Button type="default" size="small" text="Approve" onClick={() => changeStatus(index, "Approved")} />
                                                        <Button type="cancel" size="small" text="Refuse" onClick={() => toggleFeedbackModal(index)} />
                                                    </div>
                                                    :
                                                    <div className="button-container grid-3">
                                                        <button className={apply.status} onClick={() => toggleConfirmModal(index)}>{apply.status}</button>
                                                    </div>
                                            }
                                        </div>
                                        <div className="see-profile grid-3">
                                            <Link to="/profile">
                                                <button className="button-see-profile">See Profile</button>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>

            {
                openFeedbackModal && <Modal type="warning" closeModal={() => toggleFeedbackModal(actualApply)} content={<FeedbackRegistrantion closeModal={() => toggleFeedbackModal(actualApply)} confirm={() => refuseApply()} />} />
            }

            {
                openConfirmModal && <Modal type="warning" closeModal={() => toggleConfirmModal(actualApply)} content={<ModalConfirm closeModal={() => toggleConfirmModal(actualApply)} confirm={() => confirm()} />} />
            }
        </div>
    )
}

export default Registrations;
