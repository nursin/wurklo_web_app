import React, { useState } from 'react'
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Progress, Row } from 'reactstrap';

function PerformEvalModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [honest, setHonest] = useState(5);
    const [reliable, setReliable] = useState(5);

    const handleSubmitEval = () => {
        console.log('eval done')
    }

    return (
        <>
            <Button
                color='primary'
                className='createWurker__button'
                outline
                onClick={() => setIsModalOpen(isModalOpen ? false : true)}
            >
                Performance Evaluation
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
                    <h3 className='text-secondary m-0'><strong>Performance Evaluation</strong></h3>
                </ModalHeader>
                <ModalBody className='createWurker pt-0'>
                    <p className='text-center text-danger mt-2 mb-0'>Score from 1 - 10 where 1 is least like the wurker, and 10 is most like the wurker.</p>
                    <hr />
                    <h3 className='text-center'>Performance</h3>
                    <hr />
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Communication {honest}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Name ..."
                                value={honest}
                                onChange={e => setHonest(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Reliable {reliable}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Email ..."
                                value={reliable}
                                onChange={e => setReliable(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Team Player {honest}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Name ..."
                                value={honest}
                                onChange={e => setHonest(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Problem Solver {reliable}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Email ..."
                                value={reliable}
                                onChange={e => setReliable(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Responsible {honest}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Name ..."
                                value={honest}
                                onChange={e => setHonest(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Adaptable {reliable}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Email ..."
                                value={reliable}
                                onChange={e => setReliable(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Time Management {honest}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Name ..."
                                value={honest}
                                onChange={e => setHonest(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Self Starter {reliable}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Email ..."
                                value={reliable}
                                onChange={e => setReliable(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Willing to learn {honest}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Name ..."
                                value={honest}
                                onChange={e => setHonest(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Excellent {reliable}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Email ..."
                                value={reliable}
                                onChange={e => setReliable(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <hr />
                    <h3 className='text-center'>Character</h3>
                    <hr />
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Honest {honest}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Name ..."
                                value={honest}
                                onChange={e => setHonest(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Culturally Competent {reliable}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Email ..."
                                value={reliable}
                                onChange={e => setReliable(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Professional {honest}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Name ..."
                                value={honest}
                                onChange={e => setHonest(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Creative {reliable}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Email ..."
                                value={reliable}
                                onChange={e => setReliable(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Passionate {honest}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Name ..."
                                value={honest}
                                onChange={e => setHonest(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Curious {reliable}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Email ..."
                                value={reliable}
                                onChange={e => setReliable(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Friendliness {honest}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Name ..."
                                value={honest}
                                onChange={e => setHonest(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Motivated {reliable}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Email ..."
                                value={reliable}
                                onChange={e => setReliable(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Safe {honest}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Name ..."
                                value={honest}
                                onChange={e => setHonest(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto">
                            <p className='mt-1 mb-0'>Leader {reliable}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Email ..."
                                value={reliable}
                                onChange={e => setReliable(e.target.value)}
                            />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter className='d-inline py-1 text-center'>
                    <Button
                        outline
                        color='primary'
                        onClick={handleSubmitEval}
                        className='make-round p-2 px-4 mt-0'
                    >
                        Submit Evaluation
                    </Button>
                    <Button outline className='make-round p-2 mt-0' onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default PerformEvalModal