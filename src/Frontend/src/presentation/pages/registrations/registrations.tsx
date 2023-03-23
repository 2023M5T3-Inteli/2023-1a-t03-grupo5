import "./registrations-styles.scss";
import React from "react";
import { Link } from "react-router-dom";

let Registrations = () => {
    return (
        <div className="bodyRegistrations">
            <div className="containerRegistrations">
                <div className="containerRegistrationsTitle">
                    <h1 className="title">Registrations</h1> 
                    <div><img src = {"/user.png"}/></div>
                </div>
            

                    <div className="filterDiv">
                        <div className="filterInputDiv">
                            <input className="inputFilter" placeholder="Search by name"></input>
                            <div className="iconInputFilter"><img width={28} src={"/search.png"}/></div>
                        </div>
                        <div className="filterInputDiv">
                            <input className="inputFilter" placeholder="Filter"></input>
                            <div className="iconInputFilter"><img width={28} src={"/filter.png"}/></div>
                        </div>                    
                    </div>

                    <div className="registrationsTable">
                        <div className="container">
                            <div className="containerTable">
                                <div className="firstContainer">
                                    <p className="nameRegistry">1. Felipe Saladys</p>
                                    <button className="Approve">Approve</button>
                                    <button className="Refuse">Refuse</button>
                                    </div>
                                    <div className="seeProfile">
                                                <button className="buttonSeeProfile">See Profile</button>
                                            </div>
                            </div>
                        </div>
                        

                    </div>

            </div>
        </div>
    )
}

export default Registrations;
