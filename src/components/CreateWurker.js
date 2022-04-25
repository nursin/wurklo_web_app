import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Progress, Row } from 'reactstrap';
import { storage, db } from "../firebase";
import firebase from 'firebase';
import { useNavigate } from 'react-router-dom';

//redux 
import { useDispatch, useSelector } from 'react-redux';

function CreateWurker() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [skill, setSkill] = useState('');
    const [rate, setRate] = useState(0);
    const [yearsOfExp, setYearsOfExp] = useState(0);
    const [highestEdu, setHighestEdu] = useState('none');
    const [certsLicenses, setCertsLicenses] = useState('');
    const [availability, setAvailability] = useState('');
    const [phone, setPhone] = useState('');
    const [portfolioLink, setPortfolioLink] = useState('');
    const [geoPoint, setGeoPoint] = useState([0, 0]);
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [imageFile, setImageFile] = useState(null);
    const [tags, setTags] = useState('');
    const [zipCode, setZipCode] = useState(0);
    const [progress, setProgress] = useState(0);

    const [loading, setLoading] = useState(false);

    // redux
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.files[0]) {
            console.log(e.target.files[0].size)
            if (e.target.files[0].size > 2500000) {
                alert(`Image file size must be less than 2.5 MB. Your file size is ${(e.target.files[0].size / 1000000).toFixed(2)} MB. Recommend resizing image.`)
                setImageFile()
            } else {
                setImageFile(e.target.files[0])
            }
        }
    };

    const handleCreateWurker = () => {
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
                        db
                            .collection("wurkers")
                            .doc(user.uid)
                            .set({
                                created: firebase.firestore.FieldValue.serverTimestamp(),
                                authUid: user.uid,
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
                                photo_url: url,
                                tags: tags,
                                zip_code: Number(zipCode),
                                location_typesense: geoPoint,
                                location: {
                                    latitude: latitude,
                                    longitude: longitude
                                }
                            },
                                {
                                    merge: true
                                });
                        setProgress(0);
                        setName('')
                        setEmail('')
                        setSkill('')
                        setRate(0)
                        setYearsOfExp(0)
                        setHighestEdu('')
                        setCertsLicenses('')
                        setAvailability('')
                        setPhone('')
                        setPortfolioLink('')
                        setTags('')
                        setGeoPoint([0, 0])
                        setLatitude(0)
                        setLongitude(0)
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
            alert("Sing in to create a wurker")
        }

    }

    // geolocate, low accuracy, get new location
    const options = {
        timeout: 10000,
        maximumAge: 0
    }

    function success(pos) {
        const crd = pos.coords;
        setLatitude(crd.latitude)
        setLongitude(crd.longitude)
        setGeoPoint([crd.latitude, crd.longitude])
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

    return (
        <>
            <Button
                color='primary'
                className='createWurker__button'
                outline
                onClick={isUserLoggedIn}
            >
                Create Wurker Profile
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
                    <h3 className='text-secondary m-0'><strong>Create Wurker Profile</strong></h3>
                </ModalHeader>
                <ModalBody className='createWurker pt-0'>
                    <p className='text-danger mb-0 mt-2 text-center'>This information will be public to everyone. Leave blank any fields you want to remain private.</p>
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
                                type='email'
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
                                type='number'
                                className='search__input shadow-none'
                                placeholder="Rate per hour ..."
                                value={rate}
                                onChange={e => setRate(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Years of Experience</p>
                            <Input
                                type='number'
                                className='search__input shadow-none'
                                placeholder="Years of experience ..."
                                value={yearsOfExp}
                                onChange={e => setYearsOfExp(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Highest Education</p>
                            <Input
                                type="select"
                                className='search__input shadow-none'
                                placeholder="Highest education ..."
                                value={highestEdu}
                                onChange={e => setHighestEdu(e.target.value)}
                            >
                                <option>None</option>
                                <option>Self Taught</option>
                                <option>GED</option>
                                <option>High School</option>
                                <option>Trade School</option>
                                <option>Associates Degree</option>
                                <option>Bachelors Degree</option>
                                <option>Masters Degree</option>
                                <option>PHD</option>
                            </Input>
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
                                type='phone'
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
                                placeholder="Portfolio Link ... ex. wurklo.com"
                                value={portfolioLink}
                                onChange={e => setPortfolioLink(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <div className='d-flex justify-content-center mt-3 my-2'>
                                <p className='mt-1 mb-0 me-2'>Add Geolocation</p>
                                <Button className='p-0 px-1' onClick={getPosition}>{loading ? 'Loading ...' : 'Get Location'}</Button>
                            </div>
                            <div className='d-flex'>
                                <Input
                                    className='search__input shadow-none'
                                    placeholder="Longitude"
                                    value={longitude}
                                />
                                <Input
                                    className='search__input shadow-none'
                                    placeholder="Latitude"
                                    value={latitude}
                                />
                            </div>

                        </Col>
                        <Col className="text-center mt-0 mx-auto">
                            <p className='mt-4 mb-0'>Upload Profile Image</p>
                            <Input
                                className='search__input shadow-none'
                                onChange={handleChange}
                                type="file"
                                accept='image/jpg,image/jpeg,image/png,image/gif'
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
                                type='number'
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
                        onClick={handleCreateWurker}
                        className='make-round p-2 px-4 mt-0'
                    >
                        Create Wurker
                    </Button>
                    <Button outline className='make-round p-2 mt-0' onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default CreateWurker