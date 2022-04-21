import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Progress, Row } from 'reactstrap';
import { storage, db } from "../firebase";
import firebase from 'firebase';

//redux 
import { useDispatch, useSelector } from 'react-redux';

function UpdateUser() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [progress, setProgress] = useState(0);

    // redux
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0])
        }
    };

    const handleUpdateUser = () => {
        const uploadTask = storage.ref(`user-images/${user.uid}`).put(imageFile);
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
                    .ref("user-images")
                    .child(user.uid)
                    .getDownloadURL()
                    .then(url => {
                        // post image in db
                        db
                            .collection("users")
                            .doc(user.uid)
                            .set({
                                last_updated: firebase.firestore.FieldValue.serverTimestamp(),
                                display_name: name.toLowerCase(),
                                email: email.toLowerCase(),
                                phone: phone.toLowerCase(),
                                photo_url: url
                            },
                                {
                                    merge: true
                                }
                            );
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

    return (
        <>
            <Button
                color='primary'
                className='createWurker__button'
                outline
                onClick={isUserLoggedIn}
            >
                Update User Profile
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
                    <h3 className='text-secondary m-0'><strong>Update User Profile</strong></h3>
                </ModalHeader>
                <ModalBody className='createWurker pt-0'>
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
                                placeholder="Phone # ex. +1-555-555-5555 ..."
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
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
                </ModalBody>
                <ModalFooter className='d-inline py-1 text-center'>
                    <Progress value={progress} className='mx-auto mb-0' /><br />
                    <Button
                        outline
                        color='primary'
                        onClick={handleUpdateUser}
                        className='make-round p-2 px-4 mt-0'
                    >
                        Update User
                    </Button>
                    <Button outline className='make-round p-2 mt-0' onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default UpdateUser