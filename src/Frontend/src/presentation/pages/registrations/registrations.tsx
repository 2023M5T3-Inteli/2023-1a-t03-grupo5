import "./registrations-styles.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/modal/modal";
import FeedbackRegistrantion from "../feedbackRegistrantion/feedbackRegistrantion";
import Button from "../../components/button/button";


let Registrations = () => {
    const [openFeedbackModal, setOpenFeedbackModal] = useState(false)

    const toggleFeedbackModal = () => {
        setOpenFeedbackModal(!openFeedbackModal)
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

    return (
        <div className="bodyRegistrations">
            <div className="containerRegistrations">
                <div className="containerRegistrationsTitle">
                    <h1 className="title">Registrations</h1>
                    <div><img src={"/user.png"} /></div>
                </div>


                <div className="filterDiv">
                    <div className="filterInputDiv">
                        <input className="inputFilter" placeholder="Search by name"></input>
                        <div className="iconInputFilter"><img width={28} src={"/search.png"} /></div>
                    </div>
                    <div className="filterInputDiv">
                        <input className="inputFilter" placeholder="Filter"></input>
                        <div className="iconInputFilter"><img width={28} src={"/filter.png"} /></div>
                    </div>
                </div>

                <div className="registrationsTable">
                    <div className="container">

                        {
                            data.map((apply: any, index: number) => {
                                return (
                                    <div className="containerTable">
                                        <div className="firstContainer">
                                            <p className="nameRegistry grid-8">{apply.name}</p>
                                            {
                                                apply.status === "Pending" ?
                                                    <div className="button-container grid-4">
                                                        <Button type="default" size="small" text="Approve" />
                                                        <Button type="cancel" size="small" text="Refuse" onClick={() => toggleFeedbackModal()} />
                                                    </div>
                                                    :
                                                    <div className="button-container grid-4">
                                                        <button className={apply.status} onClick={() => toggleFeedbackModal()}>{apply.status}</button>
                                                    </div>
                                            }
                                        </div>
                                        <div className="seeProfile">
                                            <button className="buttonSeeProfile">See Profile</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>

            {
                openFeedbackModal && <Modal type="warning" closeModal={() => toggleFeedbackModal()} content={<FeedbackRegistrantion closeModal={() => toggleFeedbackModal()} />} />
            }
        </div>
    )
}

export default Registrations;
