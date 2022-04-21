import React, { useState } from 'react';
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Progress } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faApple, faMicrosoft, faYahoo, faGithub } from "@fortawesome/free-brands-svg-icons";
import logo from '../images/VectorEPS_ByTailorBrands2.svg'
import { auth, googleAuthProvider, appleAuthProvider, microsoftAuthProvider, yahooAuthProvider, githubAuthProvider } from '../firebase';

// redux shit
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../redux/slices/user';

function JoinNowModal() {
    const [isJoinNowOpen, setIsJoinNowOpen] = useState(false);

    // redux shit
    // const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const joinNowWithGoogle = () => {
        auth.signInWithPopup(googleAuthProvider)
            .then((payload) => {
                dispatch(createUser(payload));
            })
            .catch((error) => alert(error.message));
    }

    const joinNowWithApple = () => {
        auth.signInWithPopup(appleAuthProvider)
            .then((payload) => {
                dispatch(createUser(payload));
            })
            .catch((error) => alert(error.message));
    }

    const joinNowWithMicrosoft = () => {
        auth.signInWithPopup(microsoftAuthProvider)
            .then((payload) => {
                dispatch(createUser(payload));
            })
            .catch((error) => alert(error.message));
    }

    const joinNowWithYahoo = () => {
        auth.signInWithPopup(yahooAuthProvider)
            .then((payload) => {
                dispatch(createUser(payload));
            })
            .catch((error) => alert(error.message));
    }

    const joinNowWithGithub = () => {
        auth.signInWithPopup(githubAuthProvider)
            .then((payload) => {
                dispatch(createUser(payload));
            })
            .catch((error) => alert(error.message));
    }

    return (
        <>
            <Button color='secondary' outline className='joinNow__button me-3 border-0 shadow-none make-round'
                onClick={() => setIsJoinNowOpen(isJoinNowOpen ? false : true)}
            >Join Now</Button>
            <Modal
                className='createWurker__modal'
                size="sm"
                isOpen={isJoinNowOpen}
                toggle={() => setIsJoinNowOpen(isJoinNowOpen ? false : true)}
            >
                <ModalHeader toggle={() => setIsJoinNowOpen(false)}>
                    <h3 className='text-secondary m-0'><strong>Join Now</strong></h3>
                </ModalHeader>
                <ModalBody className='d-flex flex-column mx-auto pt-4 text-center'>
                    <img src={logo} className="loginModal__wurkloLogo mx-auto" alt="Wurklo logo" />
                    <p className='loginModal__logoText'>Wurklo</p>
                    <Button
                        outline
                        color='danger'
                        className='googleSignin__button make-round shadow-none p-2 px-4 mt-0'
                        onClick={joinNowWithGoogle}
                    >
                        Join Now with Google
                        <FontAwesomeIcon icon={faGoogle} className="fs-5 ms-2" />
                    </Button>
                    <Button
                        outline
                        color='secondary'
                        className='appleSignin__button make-round shadow-none p-2 px-4 mt-3'
                        onClick={joinNowWithApple}
                    >
                        Join Now with Apple
                        <FontAwesomeIcon icon={faApple} className="fs-5 ms-2" />
                    </Button>
                    <Button
                        outline
                        color='primary'
                        className='microsoftSignin__button make-round shadow-none p-2 px-4 mt-3'
                        onClick={joinNowWithMicrosoft}
                    >
                        Join Now with Microsoft
                        <FontAwesomeIcon icon={faMicrosoft} className="fs-5 ms-2" />
                    </Button>
                    <Button
                        outline
                        color='danger'
                        className='yahooSignin__button make-round shadow-none p-2 px-4 mt-3'
                        onClick={joinNowWithYahoo}
                    >
                        Join Now with Yahoo
                        <FontAwesomeIcon icon={faYahoo} className="fs-5 ms-2" />
                    </Button>
                    <Button
                        outline
                        color='dark'
                        className='githubSignin__button make-round shadow-none p-2 px-4 my-3'
                        onClick={joinNowWithGithub}
                    >
                        Join Now with Github
                        <FontAwesomeIcon icon={faGithub} className="fs-5 ms-2" />
                    </Button>
                </ModalBody>
            </Modal>
        </>
    )
}

export default JoinNowModal