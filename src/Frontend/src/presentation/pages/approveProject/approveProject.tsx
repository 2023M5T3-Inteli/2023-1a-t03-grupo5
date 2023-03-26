import React from "react"
import { useState, useEffect } from "react"
import "./approveProject.scss"
import { Link } from "react-router-dom"
import Briefcase from "/public/briefcase.png"
import BadgeTag from "/public/award.png"
// import Users from "/public/users.png"
import ellipse from "/public/Ellipse2.png"
import Plus from "/public/plus.png"
import Button from '../../components/button/button'

const ApproveProject = () => {

    const [projectTagsRoles, setProjectTagsRoles] = useState({
        rolesProject: ["Developer", "Scrum Master"]
    })

    return (
        <div id="approve_project">
            <div className="container">
                <div className="grid-7 left-side">

                    <h1>Project Title</h1>

                    <div className="description-project">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus vel ipsum id convallis. Morbi a est in dolor rhoncus varius. Suspendisse potenti. Nullam convallis ullamcorper aliquam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus vel ipsum id convallis. Morbi a est in dolor rhoncus varius. Suspendisse potenti. Nullam convallis ullamcorper aliquam</p>
                    </div>

                    <div className="roles">
                        <p>Roles:</p>
                        {
                            projectTagsRoles.rolesProject.map((role: string) => {
                                return (
                                    <div className="tag-roles">
                                        <p>{role}</p>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="dates grid-4">
                        <div className="date">
                            <p>Start date</p>
                            {/* <p>XX/XX/XXXX</p> */}
                        </div>
                        <div className="date">
                            <p>End date</p>
                            {/* <p>XX/XX/XXXX</p> */}
                        </div>
                        <div className="date">
                            <p>Expiration date</p>
                            {/* <p>XX/XX/XXXX</p> */}
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
                    <img className="close-image" src={Plus} alt="" />
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