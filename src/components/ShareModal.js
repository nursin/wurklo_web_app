import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FacebookMessengerShareButton, TwitterShareButton, EmailShareButton, FacebookShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, EmailIcon } from 'react-share';
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Progress, Row } from 'reactstrap';
import LinkIcon from '@mui/icons-material/Link';

function ShareModal({ myProfile, uid }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const link = (`https://app.wurklo.com/profile/${uid}`)

    return (
        <>
            <Button
                color='primary'
                className='createWurker__button shadow-none'
                outline
                onClick={() => setIsModalOpen(isModalOpen ? false : true)}
            >
                {myProfile ? 'Share my profile' : 'Share'}
            </Button>
            <Modal
                className='createWurker__modal'
                scrollable
                size="sm"
                isOpen={isModalOpen}
                toggle={() => setIsModalOpen(isModalOpen ? false : true)}
            >
                <ModalHeader toggle={() => setIsModalOpen(false)}>
                    <h3 className='text-secondary m-0'><strong>{myProfile ? 'Share my profile' : 'Share this profile'}
                    </strong></h3>
                </ModalHeader>
                <ModalBody className='createWurker text-center'>
                    <Row>
                        <Col>
                            <FacebookShareButton
                                url={`https://app.wurklo.com/profile/${uid}`}
                                quote='Hire at app.Wurklo.com'
                                hashtag='#wurklo'
                            >
                                <FacebookIcon logoFillColor="white" round />
                            </FacebookShareButton>
                        </Col>
                        <Col>
                            <TwitterShareButton
                                url={link}
                                quote='Hire at app.Wurklo.com'
                                hashtag='#wurklo'
                            >
                                <TwitterIcon logoFillColor="white" round />
                            </TwitterShareButton>
                        </Col>
                        <Col>
                            <EmailShareButton
                                url={link}
                                quote='Hire at app.Wurklo.com'
                            >
                                <EmailIcon logoFillColor="white" round />
                            </EmailShareButton>
                        </Col>
                        <Col>
                            <Button
                                className='make-round p-3 my-1 shadow-none'
                                onClick={() => {
                                    navigator.clipboard.writeText(link)
                                    // alert('Link copied to clipboard')
                                }}
                            >
                                <LinkIcon />
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter className='d-inline py-1 text-center'>
                    {/* <Button
                        outline
                        color='primary'
                        onClick={handleUpdateUser}
                        className='make-round p-2 px-4 mt-0'
                    >
                        Update User
                    </Button> */}
                    <Button outline className='make-round p-2 mt-0' onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ShareModal