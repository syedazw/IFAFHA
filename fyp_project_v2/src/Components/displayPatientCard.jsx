import React from "react";
import profile from "../images/profile.jpeg"
import {useNavigate} from 'react-router-dom'

export default function DisplayPatientCard(props) {
    console.log("props",props);

    // -----------------  Object Of navigate ------------------
    const navigate = useNavigate();
    let critical = false
    return (
        <>
            <div className="row">
                <div className="col-md-6 card-width me-4">
                    <div className="card mb-3" style={{ color: "white", backgroundColor: "#041342" }}>
                        <div className="row g-0">
                            <div className="d-flex justify-content-center">
                                <img src={profile} className="rounded-circle px-3 pt-3 mx-auto" alt="..." style={{ height: "192px", width: "200px" }} />
                            </div>
                            <div className="d-flex justify-content-center">
                                <p className="fw-bold">{props.fullname}</p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div className="btn btn-group">
                                    <button className="btn text-dark bg-light">Status</button>
                                    <button className={critical ? "btn btn-danger" : "btn btn-success"}>{critical ? "Critical" : "Normal"}</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <dl><dt className="px-3 pb-0 fw-light">D.O.B</dt><dd className="px-3 pb-0 fw-bold">{props.dob
                                    }</dd></dl>
                                    <dl><dt className="px-3 pb-0 fw-light">Age</dt><dd className="px-3 pb-0 fw-bold">{props.age}</dd></dl>
                                    <dl><dt className="px-3 pb-0 fw-light">Weight</dt><dd className="px-3 pb-0 fw-bold">{props.weight} KG</dd></dl>
                                    <dl><dt className="px-3 pb-0 fw-light">Height</dt><dd className="px-3 pb-0 fw-bold">{props.height}</dd></dl>
                                    <dl><dt className="px-3 pb-0 fw-light">Care Taker</dt><dd className="px-3 pb-0 fw-bold">{props.careTaker}</dd></dl>
                                    <dl><dt className="px-3 pb-0 fw-light">Assistant</dt><dd className="px-3 pb-0 fw-bold">{props.assistant}</dd></dl>
                                </div>
                                <div className="col-6">
                                    <dl><dt className="pl-1 pb-0 fw-light">Home Address</dt><dd className="pl-1 pb-0 fw-bold">{props.homeAddress}</dd></dl>
                                    <dl><dt className="pl-1 pb-0 fw-light">Caretaker Mobile</dt><dd className="pl-1 pb-0 fw-bold">{props.careTakerMobile}</dd></dl>
                                    <dl><dt className="pl-1 pb-0 fw-light">Home Mobile</dt><dd className="pl-1 pb-0 fw-bold">{props.homeMobile}</dd></dl>
                                    <dl><dt className="pl-1 pb-0 fw-light">Patient Mobile</dt><dd className="pl-1 pb-0 fw-bold">{props.patientMobile}</dd></dl>
                                    <dl><dt className="pl-1 pb-0 fw-light">Workphone</dt><dd className="pl-1 pb-0 fw-bold">{props.workPhone
}</dd></dl>
                                    <dl><dt className="pl-1 pb-0 fw-light">Email</dt><dd className="pl-1 pb-0 fw-bold">{props.email}</dd></dl>
                                </div>
                            </div>
                        </div>
                        <button className="nav-link btn btn-width align-self-center mb-3 p-1" type="submit" onClick={(e) => navigate(`/patientprofile/${props.id}`)} style={{ color: "white", backgroundColor: "#24a3ac" }}>VIEW</button>
                        {/* <Link to="/patientprofile" onClick={(e) => navigate(`/patient/view/${props.id}`)} className="nav-link btn btn-width align-self-center m-3 p-1" style={{ color: "white", backgroundColor: "#24a3ac", borderRadius: 6 }}>View Profile</Link>
                        <Outlet /> */}
                    </div>
                </div>
            </div>
        </>
    )
};