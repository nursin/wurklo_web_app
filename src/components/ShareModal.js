import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Progress, Row } from 'reactstrap';

function ShareModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // redux
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    return (
        <>
            <Button
                color='primary'
                className='createWurker__button shadow-none'
                outline
                onClick={() => setIsModalOpen(isModalOpen ? false : true)}
            >
                Share
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
                    <h3 className='text-secondary m-0'><strong>Share Your Profile</strong></h3>
                </ModalHeader>
                <ModalBody className='createWurker pt-0'>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">

                        </Col>
                        <Col>

                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">

                        </Col>
                        <Col>

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