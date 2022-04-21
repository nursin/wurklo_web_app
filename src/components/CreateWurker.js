import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Progress, Row } from 'reactstrap';
import { storage, db } from "../firebase";
import firebase from 'firebase';
import { useNavigate } from 'react-router-dom';

//redux 
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/user';
import JoinNowModal from './JoinNowModal';

function CreateWurker() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [skill, setSkill] = useState('');
    const [rate, setRate] = useState('');
    const [yearsOfExp, setYearsOfExp] = useState('');
    const [highestEdu, setHighestEdu] = useState('');
    const [certsLicenses, setCertsLicenses] = useState('');
    const [availability, setAvailability] = useState('');
    const [phone, setPhone] = useState('');
    const [portfolioLink, setPortfolioLink] = useState('');
    const [references, setReferences] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [tags, setTags] = useState(null);
    const [progress, setProgress] = useState(0);

    // redux
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0])
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
                                displayName: name.toLowerCase(),
                                email: email.toLowerCase(),
                                skill: skill.toLowerCase(),
                                rate: rate.toLowerCase(),
                                yearsOfExp: yearsOfExp.toLowerCase(),
                                highestEdu: highestEdu.toLowerCase(),
                                certsLicenses: certsLicenses.toLowerCase(),
                                availability: availability.toLowerCase(),
                                phone: phone.toLowerCase(),
                                portfolioLink: portfolioLink.toLowerCase(),
                                references: references.toLowerCase(),
                                photoURL: url,
                                tags: tags
                            },
                                {
                                    merge: true
                                });
                        setProgress(0);
                        setName('')
                        setEmail('')
                        setSkill('')
                        setRate('')
                        setYearsOfExp('')
                        setHighestEdu('')
                        setCertsLicenses('')
                        setAvailability('')
                        setPhone('')
                        setPortfolioLink('')
                        setReferences('')
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
                    <p className='text-danger'>This information will be public to everyone. Leave blank any fields you want to remain private.</p>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <Input
                                className='search__input shadow-none mt-4'
                                placeholder="Name ..."
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <Input
                                className='search__input shadow-none mt-4'
                                placeholder="Email ..."
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <Input
                                className='search__input shadow-none mt-4'
                                placeholder="Skill or service ..."
                                value={skill}
                                onChange={e => setSkill(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <Input
                                className='search__input shadow-none mt-4'
                                placeholder="Rate ..."
                                value={rate}
                                onChange={e => setRate(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <Input
                                className='search__input shadow-none mt-4'
                                placeholder="Years of experience ..."
                                value={yearsOfExp}
                                onChange={e => setYearsOfExp(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <Input
                                className='search__input shadow-none mt-4'
                                placeholder="Highest education ..."
                                value={highestEdu}
                                onChange={e => setHighestEdu(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <Input
                                className='search__input shadow-none mt-4'
                                placeholder="Certifications/Licenses ..."
                                value={certsLicenses}
                                onChange={e => setCertsLicenses(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <Input
                                className='search__input shadow-none mt-4'
                                placeholder="Availability ex. 24/7, 8-5pm M-F, etc ..."
                                value={availability}
                                onChange={e => setAvailability(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <Input
                                type='phone'
                                className='search__input shadow-none mt-4'
                                placeholder="Phone # ex. +1-555-555-5555 ..."
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <Input
                                className='search__input shadow-none mt-4'
                                placeholder="Portfolio Link ..."
                                value={portfolioLink}
                                onChange={e => setPortfolioLink(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <Input
                                className='search__input shadow-none mt-4'
                                placeholder="References ..."
                                value={references}
                                onChange={e => setReferences(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <Input
                                className='search__input shadow-none mt-4'
                                placeholder="Portfolio Link ..."
                                onChange={handleChange}
                                type="file"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className="text-center mt-0 mx-auto">
                            <Input
                                className='search__input shadow-none mt-4'
                                placeholder="Tags ... ex. developer, react, ..."
                                value={tags}
                                onChange={e => setTags(e.target.value)}
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