import React, { useState } from 'react';
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import firebase from 'firebase';
//redux 
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';


function PerformEvalModal({ id }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // redux
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    // performance
    const [communication, setCommunication] = useState(5);
    const [reliable, setReliable] = useState(5);
    const [teamPlayer, setTeamPlayer] = useState(5);
    const [problemSolver, setProblemSolver] = useState(5);
    const [responsible, setResponsible] = useState(5);
    const [adaptable, setAdaptable] = useState(5);
    const [timeManagement, setTimeManagement] = useState(5);
    const [selfStarter, setSelfStarter] = useState(5);
    const [willingToLearn, setWillingToLearn] = useState(5);
    const [excellent, setExcellent] = useState(5);
    // character
    const [honest, setHonest] = useState(5);
    const [culturallyCompetent, setCulturallyCompetent] = useState(5);
    const [professional, setProfessional] = useState(5);
    const [creative, setCreative] = useState(5);
    const [passionate, setPassionate] = useState(5);
    const [curious, setCurious] = useState(5);
    const [friendly, setFriendly] = useState(5);
    const [motivated, setMotivated] = useState(5);
    const [safe, setSafe] = useState(5);
    const [leader, setLeader] = useState(5);


    const handleSubmitEval = () => {
        db
            .collection("reviews")
            .doc(id)
            .collection("review")
            .doc(user.uid)
            .set({
                created: firebase.firestore.FieldValue.serverTimestamp(),
                communication: Number(communication),
                reliable: Number(reliable),
                team_player: Number(teamPlayer),
                problem_solver: Number(problemSolver),
                responsible: Number(responsible),
                adaptable: Number(adaptable),
                time_management: Number(timeManagement),
                self_starter: Number(selfStarter),
                willing_to_learn: Number(willingToLearn),
                excellent: Number(excellent),
                honest: Number(honest),
                culturally_competent: Number(culturallyCompetent),
                professional: Number(professional),
                creative: Number(creative),
                passionate: Number(passionate),
                curious: Number(curious),
                friendly: Number(friendly),
                motivated: Number(motivated),
                safe: Number(safe),
                leader: Number(leader)
            })
        setIsModalOpen(isModalOpen ? false : true)
    }

    return (
        <>
            <Button
                color='primary'
                className='createWurker__button'
                outline
                onClick={() => setIsModalOpen(isModalOpen ? false : true)}
            >
                Review
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
                    <h3 className='text-secondary m-0'><strong>Review</strong></h3>
                </ModalHeader>
                <ModalBody className='createWurker pt-0 pb-5'>
                    <p className='text-center text-danger mt-2 mb-0'>Score from 1 - 10 where 1 is least like the wurker, and 10 is most like the wurker.</p>
                    <hr />
                    <h3 className='text-center'>Performance</h3>
                    <hr />
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto border">
                            <p className='mt-1 mb-0'>Communication {communication}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Name ..."
                                value={communication}
                                onChange={e => setCommunication(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto border">
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
                        <Col md={6} className="text-center mt-0 mx-auto border">
                            <p className='mt-1 mb-0'>Team Player {teamPlayer}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Name ..."
                                value={teamPlayer}
                                onChange={e => setTeamPlayer(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto border">
                            <p className='mt-1 mb-0'>Problem Solver {problemSolver}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Email ..."
                                value={problemSolver}
                                onChange={e => setProblemSolver(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto border">
                            <p className='mt-1 mb-0'>Responsible {responsible}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Name ..."
                                value={responsible}
                                onChange={e => setResponsible(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto border">
                            <p className='mt-1 mb-0'>Adaptable {adaptable}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Email ..."
                                value={adaptable}
                                onChange={e => setAdaptable(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto border">
                            <p className='mt-1 mb-0'>Time Management {timeManagement}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Name ..."
                                value={timeManagement}
                                onChange={e => setTimeManagement(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto border">
                            <p className='mt-1 mb-0'>Self Starter {selfStarter}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Email ..."
                                value={selfStarter}
                                onChange={e => setSelfStarter(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto border">
                            <p className='mt-1 mb-0'>Willing to learn {willingToLearn}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Name ..."
                                value={willingToLearn}
                                onChange={e => setWillingToLearn(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto border">
                            <p className='mt-1 mb-0'>Excellent {excellent}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Email ..."
                                value={excellent}
                                onChange={e => setExcellent(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <hr />
                    <h3 className='text-center'>Character</h3>
                    <hr />
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto border">
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
                        <Col className="text-center mt-0 mx-auto border">
                            <p className='mt-1 mb-0'>Culturally Competent {culturallyCompetent}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Email ..."
                                value={culturallyCompetent}
                                onChange={e => setCulturallyCompetent(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto border">
                            <p className='mt-1 mb-0'>Professional {professional}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Name ..."
                                value={professional}
                                onChange={e => setProfessional(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto border">
                            <p className='mt-1 mb-0'>Creative {creative}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Email ..."
                                value={creative}
                                onChange={e => setCreative(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto border">
                            <p className='mt-1 mb-0'>Passionate {passionate}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Name ..."
                                value={passionate}
                                onChange={e => setPassionate(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto border">
                            <p className='mt-1 mb-0'>Curious {curious}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Email ..."
                                value={curious}
                                onChange={e => setCurious(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto border">
                            <p className='mt-1 mb-0'>Friendly {friendly}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Name ..."
                                value={friendly}
                                onChange={e => setFriendly(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto border">
                            <p className='mt-1 mb-0'>Motivated {motivated}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Email ..."
                                value={motivated}
                                onChange={e => setMotivated(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="text-center mt-0 mx-auto border">
                            <p className='mt-1 mb-0'>Safe {safe}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Name ..."
                                value={safe}
                                onChange={e => setSafe(e.target.value)}
                            />
                        </Col>
                        <Col className="text-center mt-0 mx-auto border">
                            <p className='mt-1 mb-0'>Leader {leader}</p>
                            <Input
                                type='range'
                                min='1'
                                max='10'
                                className='search__input shadow-none'
                                placeholder="Email ..."
                                value={leader}
                                onChange={e => setLeader(e.target.value)}
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