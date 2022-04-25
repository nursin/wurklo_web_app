import React from 'react'
import { Col } from 'reactstrap'

function ProfileInfo({ name, skill, rate, imageUrl, availability, phone, email, portfolioLink, profile }) {

    return (
        <>
            <Col md={12} lg={3}>
                {/* the below code goes with the input over the image below */}
                {/* <div className={"profileInfo__image " + (profile ? "" : "profileInfo__imageOpacity")}> */}
                <div className={"profileInfo__image"}>
                    <img src={imageUrl} alt={name} />
                    {/* the below input is spread over the image, will make this work later */}
                    {/* {profile ? null : <input type="file" className='profileInfo__imageFilePicker' />} */}
                </div>
            </Col>
            <Col md={12} lg={9} className='profileInfo__info mx-auto mt-4 mt-lg-0 py-3 p-md-3 bg-white'>
                <h3>{name?.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}</h3>
                <p>{skill?.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}</p>
                {rate && <p>Rate: ${rate}/hr</p>}
                {availability && <p>Available {availability?.toUpperCase()}</p>}
                {phone && <p>P# {phone}</p>}
                {email && <p>E# {email}</p>}
                {portfolioLink && <p>Portfolio {portfolioLink}</p>}
            </Col>
            <Col md={12} className="profileInfo__performanceEval mx-auto mx-md-2 mt-4 p-3 pb-5 text-center bg-white">
                <p className='p-0 m-0'>Coming in Version 1.1.0</p>
                <h2>Review</h2>
                <div className='d-flex justify-content-around'>
                    <h5>Performance</h5>
                    <h5>Character</h5>
                </div>
                <div className='profileInfo__imageContainer d-flex justify-content-around'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/wurklo-web-app.appspot.com/o/black_background_hammer.gif?alt=media&token=1c4d6232-79c8-441c-978a-a11d9be8f204" className="ms-0 ms-md-3" alt={name} />
                    <img src="https://firebasestorage.googleapis.com/v0/b/wurklo-web-app.appspot.com/o/black_background_hammer.gif?alt=media&token=1c4d6232-79c8-441c-978a-a11d9be8f204" className="ms-0 ms-md-3" alt={name} />
                </div>
            </Col>
        </>
    )
}

export default ProfileInfo