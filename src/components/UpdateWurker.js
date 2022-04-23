import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Progress, Row } from 'reactstrap';
import { storage, db } from "../firebase";
import firebase from 'firebase';
import { useNavigate } from 'react-router-dom';

//redux 
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/user';

function UpdateWurker({ wurker }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState(`${wurker?.wurker?.display_name}`);
    const [email, setEmail] = useState(`${wurker?.wurker?.email}`);
    const [skill, setSkill] = useState(`${wurker?.wurker?.skill}`);
    const [rate, setRate] = useState(`${wurker?.wurker?.rate}`);
    const [yearsOfExp, setYearsOfExp] = useState(`${wurker?.wurker?.years_of_exp}`);
    const [highestEdu, setHighestEdu] = useState(`${wurker?.wurker?.highest_edu}`);
    const [certsLicenses, setCertsLicenses] = useState(`${wurker?.wurker?.certs_licenses}`);
    const [availability, setAvailability] = useState(`${wurker?.wurker?.availability}`);
    const [phone, setPhone] = useState(`${wurker?.wurker?.phone}`);
    const [portfolioLink, setPortfolioLink] = useState(`${wurker?.wurker?.portfolio_link}`);
    const [geoPoint, setGeoPoint] = useState([0, 0]);
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [imageFile, setImageFile] = useState(`${wurker?.wurker?.photo_url}`);
    const [tags, setTags] = useState(`${wurker?.wurker?.tags}`);
    const [zipCode, setZipCode] = useState(`${wurker?.wurker?.zip_code}`);
    const [progress, setProgress] = useState(0);

    const [loading, setLoading] = useState(false);


    // redux
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0])
        }
    };

    const handleUpdateWurker = async () => {
        const uploadTask = storage.ref(`wurker-images/${user.uid}`).put(imageFile);
        // progress bar function
        uploadTask.on(
            "state-changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            // storing in db
            () => {
                storage
                    .ref("wurker-images")
                    .child(user.uid)
                    .getDownloadURL()
                    .then(url => {
                        // post image in db
                        db.collection("wurkers")
                            .doc(wurker.id)
                            .update({
                                last_update: firebase.firestore.FieldValue.serverTimestamp(),
                                display_name: name.toLowerCase(),
                                email: email.toLowerCase(),
                                skill: skill.toLowerCase(),
                                rate: Number(rate),
                                years_of_exp: Number(yearsOfExp),
                                highest_edu: highestEdu.toLowerCase(),
                                certs_licenses: certsLicenses.toLowerCase(),
                                availability: availability.toLowerCase(),
                                phone: phone.toLowerCase(),
                                portfolio_link: portfolioLink.toLowerCase(),
                                // references: references.toLowerCase(),
                                photo_url: url,
                                tags: tags,
                                zip_code: Number(zipCode),
                                location_typesense: geoPoint,
                                location: {
                                    latitude: latitude,
                                    longitude: longitude
                                }
                            });
                        setProgress(0);
                        setImageFile(null)
                        setIsModalOpen(false)
                    })
            }
        )
    };

    const isUserLoggedIn = () => {
        if (user) {
            setIsModalOpen(isModalOpen ? false : true)
        } else {
            alert("You must be signed in to create a wurker profile")
        }
    }

    // geolocate, low accuracy, get new location
    const options = {
        timeout: 10000,
        maximumAge: 0
    }

    function success(pos) {
        const crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        setLatitude(crd.latitude)
        console.log(`Longitude: ${crd.longitude}`);
        setLongitude(crd.longitude)
        console.log(`More or less ${crd.accuracy} meters.`);
        setGeoPoint([crd.latitude, crd.longitude])
        // setGeoHash(geofire.geohashForLocation([crd.latitude, crd.longitude]))
        setLoading(false)
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        setLoading(false)
        alert('Timed out before getting location, or an error occured')
    }

    const getPosition = () => {
        setLoading(true)
        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    console.log('geopoint', geoPoint)
    console.log('latitude', latitude)
    console.log('longitude', longitude)

    return (
        <>
            <Button
                color='primary'
                className='createWurker__button'
                outline
                onClick={isUserLoggedIn}
            >
                Update Wurker Profile
            </Button>
            <Modal
                className='createWurker__modal'
                fullscreen="md"
                scrollable
                size="lg"
                isOpen={isModalOpen}
                toggle={() => setIsModalOpen(isModalOpen ? false : true)}
            >
                <ModalHeader toggle={() => setIsModalOpen(false)}>
                    <h3 className='text-secondary m-0'><strong>Update Wurker Profile</strong></h3>
                </ModalHeader>
                <ModalBody className='createWurker pt-0'>
                    <p className='text-center text-danger mt-2 mb-0'>This information will be public to everyone. Leave blank any fields you want to remain private.</p>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Name</p>
                            <Input
                                className='search__input shadow-none'
                                placeholder="Name ..."
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Email</p>

                            <Input
                                className='search__input shadow-none'
                                placeholder="Email ..."
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Skill</p>
                            <Input
                                className='search__input shadow-none'
                                placeholder="Skill or service ..."
                                value={skill}
                                onChange={e => setSkill(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Rate</p>
                            <Input
                                className='search__input shadow-none'
                                placeholder="Rate ..."
                                value={rate}
                                onChange={e => setRate(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Years of Experience</p>
                            <Input
                                className='search__input shadow-none'
                                placeholder="Years of experience ..."
                                value={yearsOfExp}
                                onChange={e => setYearsOfExp(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Highest Education</p>
                            <Input
                                className='search__input shadow-none'
                                placeholder="Highest education ..."
                                value={highestEdu}
                                onChange={e => setHighestEdu(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Certifications/Licenses</p>
                            <Input
                                className='search__input shadow-none'
                                placeholder="Certifications/Licenses ..."
                                value={certsLicenses}
                                onChange={e => setCertsLicenses(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Availability</p>
                            <Input
                                className='search__input shadow-none'
                                placeholder="Availability ex. 24/7, 8-5pm M-F, etc ..."
                                value={availability}
                                onChange={e => setAvailability(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Phone #</p>
                            <Input
                                className='search__input shadow-none'
                                placeholder="Phone # ex. +1-555-555-5555 ..."
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Portfolio Link</p>
                            <Input
                                className='search__input shadow-none'
                                placeholder="Portfolio Link ..."
                                value={portfolioLink}
                                onChange={e => setPortfolioLink(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Add Geolocation</p>
                            <div className='d-flex'>
                                <Input
                                    type='search'
                                    className='search__input shadow-none'
                                    placeholder="Longitude"
                                    value={longitude}
                                />
                                <Input
                                    type='search'
                                    className='search__input shadow-none'
                                    placeholder="Latitude"
                                    value={latitude}
                                />
                            </div>

                            <Button onClick={getPosition}>{loading ? 'Loading ...' : 'Get Location'}</Button>
                        </Col>
                        <Col className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Upload Profile Image</p>
                            <Input
                                className='search__input shadow-none'
                                placeholder="Portfolio Link ..."
                                onChange={handleChange}
                                type="file"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Tags for Search</p>
                            <Input
                                className='search__input shadow-none'
                                placeholder="Tags ... ex. developer, react, ..."
                                value={tags}
                                onChange={e => setTags(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Zip Code</p>
                            <Input
                                className='search__input shadow-none'
                                placeholder="Zipcode"
                                value={zipCode}
                                onChange={e => setZipCode(e.target.value)}
                            />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter className='d-inline py-1 text-center'>
                    <Progress value={progress} className='mx-auto mb-0' /><br />
                    <Button
                        outline
                        color='primary'
                        onClick={handleUpdateWurker}
                        className='make-round p-2 px-4 mt-0'
                    >
                        Update Wurker
                    </Button>
                    <Button outline className='make-round p-2 mt-0' onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default UpdateWurker