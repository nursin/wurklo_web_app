import React from 'react'
import { Col } from 'reactstrap'
import { useNavigate } from "react-router-dom";

function WurkerCard({ id, displayName, skill, photoURL }) {
    const navigate = useNavigate();

    const openProfile = () => {
        navigate(`/profile/${id}`)
    }

    return (
        <Col className='mb-4 d-flex justify-content-center'>
            <div className='wurkerCard' onClick={openProfile}>
                <img src={photoURL} className="" alt="Profile Pic" />
                <div className='wurkerCard__wurkerInfo'>
                    <h5 className='wurkerCard__text text-white'>{displayName?.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}</h5>
                    <p className='wurkerCard__text text-white'>{skill?.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}</p>
                </div>
            </div>
        </Col>
    )
}

export default WurkerCard