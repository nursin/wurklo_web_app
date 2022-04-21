import React, { useState } from 'react';
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Progress } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faApple, faMicrosoft, faYahoo, faGithub } from "@fortawesome/free-brands-svg-icons";
import logo from '../images/VectorEPS_ByTailorBrands2.svg'
import { auth, googleAuthProvider, appleAuthProvider, microsoftAuthProvider, yahooAuthProvider, githubAuthProvider } from '../firebase';

// redux shit
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserOrCreateAndSet } from '../redux/slices/user';

function LoginModal() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const dispatch = useDispatch();

    const signInWithGoogle = () => {
        auth.signInWithPopup(googleAuthProvider)
            .then((payload) => {
                dispatch(setUserOrCreateAndSet(payload))
            })
            .catch((error) => alert(error.message));
    }

    const signInWithApple = () => {
        auth.signInWithPopup(appleAuthProvider)
            .then((payload) => {
                dispatch(setUserOrCreateAndSet(payload))
            })
            .catch((error) => alert(error.message));
    }

    const signInWithMicrosoft = () => {
        auth.signInWithPopup(microsoftAuthProvider)
            .then((payload) => {
                dispatch(setUserOrCreateAndSet(payload))
            })
            .catch((error) => alert(error.message));
    }

    const signInWithYahoo = () => {
        auth.signInWithPopup(yahooAuthProvider)
            .then((payload) => {
                dispatch(setUserOrCreateAndSet(payload))
            })
            .catch((error) => alert(error.message));
    }

    const signInWithGithub = () => {
        auth.signInWithPopup(githubAuthProvider)
            .then((payload) => {
                dispatch(setUserOrCreateAndSet(payload))
            })
            .catch((error) => alert(error.message));
    }

    return (
        <>
            <Button outline className='loginModal__button shadow-none make-round'
                onClick={() => setIsLoginModalOpen(isLoginModalOpen ? false : true)}
            >Sign in</Button>
            <Modal
                className='createWurker__modal'
                size="sm"
                isOpen={isLoginModalOpen}
                toggle={() => setIsLoginModalOpen(isLoginModalOpen ? false : true)}
            >
                <ModalHeader toggle={() => setIsLoginModalOpen(false)}>
                    <h3 className='text-secondary m-0'><strong>Sign in</strong></h3>
                </ModalHeader>
                <ModalBody className='loginModal__body d-flex flex-column mx-auto pt-4 text-center'>
                    <img src={logo} className="loginModal__wurkloLogo mx-auto" alt="Wurklo logo" />
                    <p className='loginModal__logoText'>Wurklo</p>
                    <Button
                        outline
                        color='danger'
                        className='googleSignin__button make-round shadow-none p-2 px-4 mt-0'
                        onClick={signInWithGoogle}
                    >
                        Sign in with Google
                        <FontAwesomeIcon icon={faGoogle} className="fs-5 ms-2" />
                    </Button>
                    <Button
                        outline
                        color='secondary'
                        className='appleSignin__button make-round shadow-none p-2 px-4 mt-3'
                        onClick={signInWithApple}
                    >
                        Sign in with Apple
                        <FontAwesomeIcon icon={faApple} className="fs-5 ms-2" />
                    </Button>
                    <Button
                        outline
                        color='primary'
                        className='microsoftSignin__button make-round shadow-none p-2 px-4 mt-3'
                        onClick={signInWithMicrosoft}
                    >
                        Sign in with Microsoft
                        <FontAwesomeIcon icon={faMicrosoft} className="fs-5 ms-2" />
                    </Button>
                    <Button
                        outline
                        color='danger'
                        className='yahooSignin__button make-round shadow-none p-2 px-4 mt-3'
                        onClick={signInWithYahoo}
                    >
                        Sign in with Yahoo
                        <FontAwesomeIcon icon={faYahoo} className="fs-5 ms-2" />
                    </Button>
                    <Button
                        outline
                        color='dark'
                        className='githubSignin__button make-round shadow-none p-2 px-4 my-3'
                        onClick={signInWithGithub}
                    >
                        Sign in with Github
                        <FontAwesomeIcon icon={faGithub} className="fs-5 ms-2" />
                    </Button>
                </ModalBody>
            </Modal>
        </>
    )
}

export default LoginModal